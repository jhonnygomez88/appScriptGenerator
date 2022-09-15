const { createFile } = require('./util/file');
const { getAttributes } = require('./util/oracle');
const { getFullScript } = require('./util/selenium');
const args = process.argv.slice(2);

//const OWNER = 'HEALTHQA';
//const TABLE = 'INSTRUCTOR_BOARD_XREF';
//const DC_OPT = 0;
//const FILE_DIR = './';

const OWNER = args[0];
const TABLE = args[1];
const DC_OPT = Number(args[2]);
const FILE_DIR = args[3];

const TABLE_NAME = `${TABLE} - ${DC_OPT == 0?'BDU':'JAX'}`;
const FILENAME = `${FILE_DIR}${TABLE_NAME}.side`;

const result = getAttributes(OWNER, TABLE);
result.then((res)=>{
    const COLUMNS = res;
    const resp = getFullScript(TABLE,TABLE_NAME,DC_OPT,COLUMNS);
    const rString = JSON.stringify(resp, null, 3);
    createFile(FILENAME,rString);
    process.exit();
}).catch((error)=>{
    console.error(error);
    process.exit();
});