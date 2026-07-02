require("dotenv").config();

const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

async function listar() {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
    });

    console.log(`Encontrados ${response.results.length} registros.\n`);

    response.results.forEach((pagina, index) => {
      console.log(`Registro ${index + 1}`);

      console.log(pagina.properties);

      console.log("--------------------------------");
    });

  } catch (error) {
    console.error(error.body || error);
  }
}

listar();