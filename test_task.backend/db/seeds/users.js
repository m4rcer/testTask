export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('table_name').del()
  await knex('table_name').insert([
    {id: 1, username: "admin", email: "admin@email.com", password: "12345678"},
  ]);
};
