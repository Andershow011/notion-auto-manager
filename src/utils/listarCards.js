const notion = require("./notionClient");
const config = require("./config");

async function listar() {

    const response = await notion.dataSources.query({
        data_source_id: config.datasourceId
    });

    console.log("Total de cards:", response.results.length);

    response.results.forEach((pagina, indice) => {

        console.log("----------------------");
        console.log("Card", indice + 1);

        console.log(
            JSON.stringify(pagina.properties, null, 2)
        );

    });

}

listar();