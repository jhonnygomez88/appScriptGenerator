const { createFile } = require('./util/file');
const { getAttributes } = require('./util/oracle');
const { getFullScript } = require('./util/selenium');
const args = process.argv.slice(2);

//const OWNER = 'HEALTHQA';
//const TABLE = 'INSTRUCTOR_BOARD_XREF';
//const DC_OPT = JAX;
//const FILE_DIR = './';

const OWNER = args[0].toUpperCase();
const TABLE = args[1].toUpperCase();
const DC_OPT = args[2].toUpperCase();
const FILE_DIR = args[3];

const result = getAttributes(OWNER, TABLE);

result.then((res)=>{
    console.debug(`[${res.length}] attributes detected for [${OWNER}.${TABLE}]`);
    let TABLE_NAME;
    let FILENAME = `${FILE_DIR}${TABLE_NAME}.side`;
    switch (DC_OPT) {
        case "BDU":
            TABLE_NAME = `${TABLE} - BDU`;
            FILENAME = `${FILE_DIR}${TABLE_NAME}.side`;
            generateSideFile(TABLE,TABLE_NAME,0,res,FILENAME);
            console.log(`"${TABLE_NAME}.side" generated!`);
            break;
        case "JAX":
            TABLE_NAME = `${TABLE} - JAX`;
            FILENAME = `${FILE_DIR}${TABLE_NAME}.side`;
            generateSideFile(TABLE,TABLE_NAME,1,res,FILENAME);
            console.log(`"${TABLE_NAME}.side" generated!`);
            break;
        default:
            TABLE_NAME = `${TABLE} - BDU`;
            FILENAME = `${FILE_DIR}${TABLE_NAME}.side`;
            generateSideFile(TABLE,TABLE_NAME,0,res,FILENAME);
            console.log(`"${TABLE_NAME}.side" generated!`);

            TABLE_NAME = `${TABLE} - JAX`;
            FILENAME = `${FILE_DIR}${TABLE_NAME}.side`;
            generateSideFile(TABLE,TABLE_NAME,1,res,FILENAME);
            console.log(`"${TABLE_NAME}.side" generated!`);
            break;
    }    
    process.exit();
}).catch((error)=>{
    console.error(error);
    process.exit();
});

const generateSideFile = (TABLE,TABLE_NAME,DC_OPT,COLUMNS,FILENAME)=>{
    const resp = getFullScript(TABLE,TABLE_NAME,DC_OPT,COLUMNS);
    const rString = JSON.stringify(resp, null, 3);
    createFile(FILENAME,rString);
}