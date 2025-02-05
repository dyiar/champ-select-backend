
exports.up = function(knex, Promise) {
    return knex.schema.createTable('champions', function(tbl) {
        tbl.integer('id').notNullable();
        tbl.string('name', 180).notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('champions');
};
