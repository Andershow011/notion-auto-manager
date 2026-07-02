require("dotenv").config();

const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

async function descobrir() {
  try {
    const database = await notion.databases.retrieve({
      database_id: process.env.NOTION_DATABASE_ID,
    });

    console.log(JSON.stringify(database, null, 2));
  } catch (err) {
    console.error(err.body || err);
  }
}

descobrir();