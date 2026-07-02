const { Client } = require("@notionhq/client");
const config = require("./config");

const notion = new Client({
    auth: config.token
});

module.exports = notion;