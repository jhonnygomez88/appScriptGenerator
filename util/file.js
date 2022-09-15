const fs = require('fs');

const createFile = (filename, content) =>{
    fs.appendFileSync(filename, content, (err) => {
        if (err) throw err;
        console.log('File Saved!');
      });
};

module.exports = {createFile}