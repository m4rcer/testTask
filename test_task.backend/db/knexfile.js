import path from "path";

export default {

  development: {
    client: 'sqlite3',
    connection: {
      filename: path.join(path.resolve('./db/db.sqlite3'))
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    useNullAsDefault: true
  }

};