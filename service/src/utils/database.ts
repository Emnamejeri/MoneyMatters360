import { Sequelize } from "sequelize";

const sequelize = new Sequelize("user_data", "postgres", "azerty", {
  host: "localhost",
  dialect: "postgres",
  port: 5432,
  logging: false,
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnection();

export default sequelize;
