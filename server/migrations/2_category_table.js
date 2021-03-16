exports.up = (knex) => {
    return knex.schema.createTable("category", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();

    });
    };

    exports.down = (knex) => {
      return knex.schema.dropTable("category");
    };