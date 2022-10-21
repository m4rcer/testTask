export function up(knex) {
    return knex.schema
      .createTable('users', function (table) {
        table.increments('id');
        table.string('username', 255).notNullable().unique();
        table.string('email', 255).notNullable();
        table.string('password', 255).notNullable();
        table.timestamps();
      });
};
  
export function down(knex) {
    return knex.schema
      .dropTable('users');
};