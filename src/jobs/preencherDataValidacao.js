const notion = require("../notionClient");
const config = require("../config");

async function preencherDatas() {

    console.log("Buscando atividades...");

    const response = await notion.dataSources.query({
        data_source_id: config.datasourceId
    });

    let atualizados = 0;

    for (const pagina of response.results) {

        const status = pagina.properties["Andamento"]?.select?.name;

        const dataValidacao = pagina.properties["Data Validação"]?.date;

        if (status === "Validação Usuario" && dataValidacao == null) {

            const hoje = new Date().toISOString().split("T")[0];

            console.log("Atualizando:",
                pagina.properties["Incidente"].title[0]?.plain_text);

            await notion.pages.update({

                page_id: pagina.id,

                properties: {

                    "Data Validação": {
                        date: {
                            start: hoje
                        }
                    }

                }

            });

            atualizados++;

        }

    }

    console.log("-----------------------");
    console.log("Total atualizados:", atualizados);

}

preencherDatas().catch(console.error);