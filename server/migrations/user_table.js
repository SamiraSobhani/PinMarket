exports.up = (knex) => {
    return knex.schema.createTable("user", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("avatar");
    });
    };

    exports.down = (knex) => {
      return knex.schema.dropTable("user");
    };