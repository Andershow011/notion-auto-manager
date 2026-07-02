require("dotenv").config();

const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

async function listar() {
  try {
    const response = await notion.dataSources.list({
      database_id: process.env.NOTION_DATABASE_ID,
    });

    console.log(JSON.stringify(response, null, 2));
  } catch (error) {
    console.error(error.body || error);
  }
}

listar();