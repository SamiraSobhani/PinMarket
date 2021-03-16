exports.up = (knex) => {
  return knex.schema.createTable("posters", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.string("description");
    table.string("price").notNullable();
    table.string("pay_type").notNullable().defaultTo("perHours");
    table.date("start_date").notNullable();
    table.date("end_date").notNullable();
    table.decimal("latitude").notNullable();
    table.decimal("longitude").notNullable();
    table
      .integer("category_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("category")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .integer("client_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("user")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .integer("helper_id")
      .unsigned()
      .references("id")
      .inTable("user")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("posters");
};
