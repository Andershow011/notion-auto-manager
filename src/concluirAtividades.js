const notion = require("./notionClient");
const config = require("./config");

// Quantidade de dias para concluir automaticamente
const DIAS_PARA_CONCLUIR = 15;

async function concluirAtividades() {

    console.log("==================================");
    console.log("NOTION AUTO MANAGER");
    console.log("Simulação de Conclusão");
    console.log("==================================\n");

    const response = await notion.dataSources.query({
        data_source_id: config.datasourceId
    });

    console.log(`Total de cards encontrados: ${response.results.length}\n`);

    let concluidas = 0;
    let ignoradas = 0;

    const hoje = new Date();

    for (const pagina of response.results) {

        const titulo =
            pagina.properties["Incidente"]?.title[0]?.plain_text ||
            "(Sem título)";

        const status =
            pagina.properties["Andamento"]?.select?.name;

        const dataValidacao =
            pagina.properties["Data Validação"]?.date?.start;

        // Status diferente
        if (status !== "Validação Usuario") {

            console.log(`⏭ ${titulo}`);
            console.log("   Status:", status);
            console.log("   Ignorado\n");

            ignoradas++;
            continue;
        }

        // Não possui data
        if (!dataValidacao) {

            console.log(`⚠ ${titulo}`);
            console.log("   Sem Data Validação");
            console.log("   Ignorado\n");

            ignoradas++;
            continue;
        }

        const data = new Date(dataValidacao);

        const diferencaDias = Math.floor(
            (hoje - data) / (1000 * 60 * 60 * 24)
        );

        console.log(`📄 ${titulo}`);
        console.log(`   Dias em validação: ${diferencaDias}`);

        if (diferencaDias >= DIAS_PARA_CONCLUIR) {

    await notion.pages.update({
        page_id: pagina.id,
        properties: {
            "Andamento": {
                select: {
                    name: "Concluido"
                }
            }
        }
    });

    console.log("   ✅ CONCLUÍDO\n");
    concluidas++;

} else {

    console.log("   ⏳ Ainda dentro do prazo\n");
    ignoradas++;

}
    }

    console.log("==================================");
    console.log("RESUMO");
    console.log("==================================");
    console.log("Concluidos:", concluidas);
    console.log("Ignorados :", ignoradas);

}

concluirAtividades().catch(console.error);