/**
 * Knex configuration file.
 *
 * You will not need to make changes to this file.
 */

require("dotenv").config();
const path = require("path");

const {
  DATABASE_URL = "postgres://beokkrgj:yMZXvi0rfa1cq8THeKaT8p3Y61CaTsOS@kashin.db.elephantsql.com/beokkrgj",
  DATABASE_URL_DEVELOPMENT = "postgres://kmnopzll:6LYSNgTQuoEPE0yGO9-AGMQCRFdJzXgS@kashin.db.elephantsql.com/kmnopzll",
  DATABASE_URL_TEST = "postgres://dmvfiwin:cM2Z6PrvugmUzW4ipQE59ejP_FkpJxGP@kashin.db.elephantsql.com/dmvfiwin",
  DATABASE_URL_PREVIEW = "postgres://vbfclpjg:QDzqlLOo-CpBodiiNZvrcIoCejPFDw2m@kashin.db.elephantsql.com/vbfclpjg",
  DEBUG,
} = process.env;

module.exports = {
  development: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_DEVELOPMENT,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  test: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_TEST,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  preview: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_PREVIEW,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  production: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
};
