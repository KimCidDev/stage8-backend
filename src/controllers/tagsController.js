const knex = require('knex');

class TagsController {
  async Index(request, response) {
    const user_id = request.params;

    const tags = await knex('tags').where({ user_id });

    return response.json(tags);
  }
}

module.exports = TagsController;
