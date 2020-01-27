
exports.up = function(knex) {
    return knex.schema.createTable('games', function(tbl) {
        tbl.integer('gameid').notNullable();
        tbl.integer('r1').notNullable();
        tbl.integer('r2').notNullable();
        tbl.integer('r3').notNullable();
        tbl.integer('r4').notNullable();
        tbl.integer('r5').notNullable();
        tbl.integer('b1').notNullable();
        tbl.integer('b2').notNullable();
        tbl.integer('b3').notNullable();
        tbl.integer('b4').notNullable();
        tbl.integer('b5').notNullable();
        tbl.boolean('result').notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('games');
};
