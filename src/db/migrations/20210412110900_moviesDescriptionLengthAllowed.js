exports.up = function (knex) {
  knex.schema.table("movies", function (table) {
    table.dropColumn("description");
    table.string("description", 500);
  });
};

exports.down = function (knex) {
  knex.schema.table("movies", function (table) {
    table.dropColumn("description");
  });
};
