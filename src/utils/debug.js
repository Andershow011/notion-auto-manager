require("dotenv").config();

const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

console.log("Métodos databases:");
console.log(Object.keys(notion.databases));

console.log("");

console.log("Métodos dataSources:");
console.log(Object.keys(notion.dataSources));