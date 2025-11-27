import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import { fileURLToPath, pathToFileURL } from "url";
import configObj from "../../config/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = configObj[env];

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// Async loader because import() requires async function
async function loadModels() {
  const files = fs.readdirSync(__dirname).filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.endsWith(".js")
    );
  });

  for (const file of files) {
    const modelPath = path.join(__dirname, file);

    // ❗ Convert Windows path → file:// URL
    const modelURL = pathToFileURL(modelPath).href;

    const modelModule = await import(modelURL);
    const model = modelModule.default(sequelize, Sequelize.DataTypes);

    db[model.name] = model;
  }

  // Apply associations
  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
}

await loadModels();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
