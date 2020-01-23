
exports.up = function(knex) {
    return knex.schema.createTable('users', function(tbl) {
        tbl.increments();
        tbl.string('username', 180).notNullable().unique();
        tbl.string('pw', 180).notNullable();
        tbl.string('summonerid', 180).notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};
