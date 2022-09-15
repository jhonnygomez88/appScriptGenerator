const path = require('path');
require('dotenv').config(path);
const knexOracle = require("../db");

const getTables = async (owner) =>{
    const sql = `SELECT table_name FROM all_tables where owner = '${owner}'`
    try {
        let result = await knexOracle.raw(sql);
        return result.map(r => r.TABLE_NAME);
      } catch (error) {
        console.error(
          JSON.stringify({
            type: "FAILED",
            error: error.message,
            stack: error.stack,
          })
        );
        knexOracle.shouldReconnect(error);
        process.exit(1);
      } 
}

const getAttributes = async (owner, table) =>{

    const sql = `SELECT column_name FROM all_tab_cols where table_name = '${table}' AND  owner = '${owner}' and virtual_column = 'NO'`
    try {
        let result = await knexOracle.raw(sql);
        return result.map(r => r.COLUMN_NAME);
      } catch (error) {
        console.error(
          JSON.stringify({
            type: "FAILED",
            error: error.message,
            stack: error.stack,
          })
        );
        //knexOracle.shouldReconnect(error);
        process.exit(1);
      } 
}

module.exports = { getAttributes, getTables };