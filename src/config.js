require("dotenv").config();

module.exports = {
    token: process.env.NOTION_TOKEN,
    databaseId: process.env.NOTION_DATABASE_ID,
    datasourceId: process.env.NOTION_DATASOURCE_ID
};