// const appError = require('../utils/appError');

const knex = require('../database/knex');

class NotesController {
  async Create(request, response) {
    const { title, description, tags, links } = request.body;
    const { user_id } = request.params;

    const [note_id] = await knex('notes').insert({
      title,
      description,
      user_id
    });

    const linksInsert = links.map(link => {
      return {
        note_id,
        url: link
      };
    });

    await knex('links').insert(linksInsert);

    const tagsInsert = tags.map(name => {
      return {
        note_id,
        name,
        user_id
      };
    });

    await knex('tags').insert(tagsInsert);

    response.json();
  }

  async Show(request, response) {
    const { id } = request.params;

    const note = await knex('notes').where({ id }).first();

    const tags = await knex('tags').where({ note_id: id }).orderBy('name');

    const links = await knex('tags').where({ note_id: id });
    // ver por que eu não consigo orderBy como nas tags

    return response.json({
      ...note,
      tags,
      links
    });
  }
}

module.exports = NotesController;
