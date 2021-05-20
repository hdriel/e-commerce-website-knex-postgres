exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('user', function (table) {
        table.increments('user_id').primary();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.string('firstname').notNullable();
        table.string('lastname').notNullable();
        table.string('address').notNullable();
        table.boolean('active').notNullable().defaultTo(true);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());

        table.index('email');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('user');
};
