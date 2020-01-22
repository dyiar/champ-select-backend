
exports.up = function(knex) {
    return knex.schema.createTable('games', function(tbl) {
        tbl.integer('gameid').notNullable();
        tbl.integer('player').notNullable();
        tbl.integer('a1').notNullable();
        tbl.integer('a2').notNullable();
        tbl.integer('a3').notNullable();
        tbl.integer('a4').notNullable();
        tbl.integer('o1').notNullable();
        tbl.integer('o2').notNullable();
        tbl.integer('o3').notNullable();
        tbl.integer('o4').notNullable();
        tbl.integer('o5').notNullable();
        tbl.boolean('result').notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('games');
};
