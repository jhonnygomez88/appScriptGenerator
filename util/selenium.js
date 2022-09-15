const getActionOpenPag = ()=>{
    return {
        command: "open",
        target: "/db-policy",
        targets: [],
        value: ""
      }
}

const getActionTableHeaders = (table, tableName, dcOp)=>{
    return [
        {
        command: "click",
        target: "css=.eui-floating-action-button > .material-icons",
        targets: [
          ["css=.eui-floating-action-button > .material-icons", "css:finder"],
          ["xpath=//div[@id='root']/div[2]/div/button/i", "xpath:idRelative"],
          ["xpath=//div[2]/div/button/i", "xpath:position"],
          ["xpath=//i[contains(.,'add')]", "xpath:innerText"]
        ],
        value: ""
      },{
        command: "type",
        target: "name=name",
        targets: [
          ["name=name", "name"],
          ["css=.focused > input", "css:finder"],
          ["xpath=//input[@name='name']", "xpath:attributes"],
          ["xpath=//div[@id='modal-container']/div/div/div[2]/div/div/form/div/div/div/input", "xpath:idRelative"],
          ["xpath=//form/div/div/div/input", "xpath:position"]
        ],
        value: tableName
      },{
        command: "type",
        target: "name=table",
        targets: [
          ["name=table", "table"],
          ["css=.focused > input", "css:finder"],
          ["xpath=//input[@name='table']", "xpath:attributes"],
          ["xpath=//div[@id='modal-container']/div/div/div[2]/div/div/form/div/div/div/input", "xpath:idRelative"],
          ["xpath=//form/div/div/div/input", "xpath:position"]
        ],
        value: table
      },
      {
        command: "click",
        target: "xpath=//div[@id='modal-container']/div/div/div[2]/div/div/form/div[2]/div/div/div",
        targets: [
          ["css=.css-1pahdxg-control > .css-1hwfws3", "css:finder"],
          ["xpath=//div[@id='modal-container']/div/div/div[2]/div/div/form/div[2]/div/div/div", "xpath:idRelative"],
          ["xpath=//form/div[2]/div/div/div", "xpath:position"]
        ],
        value: ""
      }, {
        command: "click",
        target: "id=react-select-2-option-"+dcOp,
        targets: [
          ["id=react-select-2-option-"+dcOp, "id"],
          ["css=#react-select-2-option-"+dcOp, "css:finder"],
          ["xpath=//div[@id='react-select-2-option-"+dcOp+"']", "xpath:attributes"],
          ["xpath=//div[@id='modal-container']/div/div/div[2]/div/div/form/div[2]/div/div[2]/div/div", "xpath:idRelative"],
          ["xpath=//div[2]/div/div[2]/div/div", "xpath:position"]
        ],
        value: ""
      }, {
        command: "click",
        target: "xpath=//div[@id='modal-container']/div/div/div[2]/div/div/form/div[3]/div/div/div",
        targets: [
          ["css=.css-1pahdxg-control > .css-1hwfws3", "css:finder"],
          ["xpath=//div[@id='modal-container']/div/div/div[2]/div/div/form/div[3]/div/div/div", "xpath:idRelative"],
          ["xpath=//div[3]/div/div/div", "xpath:position"]
        ],
        value: ""
      }, {
        command: "click",
        target: "id=react-select-3-option-0",
        targets: [
          ["id=react-select-3-option-0", "id"],
          ["css=#react-select-3-option-0", "css:finder"],
          ["xpath=//div[@id='react-select-3-option-0']", "xpath:attributes"],
          ["xpath=//div[@id='modal-container']/div/div/div[2]/div/div/form/div[3]/div/div[2]/div/div", "xpath:idRelative"],
          ["xpath=//div[3]/div/div[2]/div/div", "xpath:position"]
        ],
        value: ""
      }
    ];
}

const getActionValues = (index, column, end)=>{
    let res = [
        {
            command: "type",
            target: "name=resources["+index+"].value",
            targets: [
                ["name=resources["+index+"].value", "name"],
                ["css=.focused > input", "css:finder"],
                ["xpath=//input[@name='resources["+index+"].value']", "xpath:attributes"],
                ["xpath=//div[@id='modal-container']/div/div/div[2]/div/div/form/div[9]/div/div/div/div/input", "xpath:idRelative"],
                ["xpath=//div[9]/div/div/div/div/input", "xpath:position"]
            ],
            value: column
        }
    ];

    if(index!=end-1){
        res.push({
            command: "click",
            target: "css=.eui-icon-button:nth-child(2)",
            targets: [
                ["css=.eui-icon-button:nth-child(2)", "css:finder"],
                ["xpath=//div[@id='modal-container']/div/div/div[2]/div/div/form/div[5]/button", "xpath:idRelative"],
                ["xpath=//div[5]/button", "xpath:position"],
                ["xpath=//button[contains(.,'add_circle')]", "xpath:innerText"]
            ],
            value: ""
        });
    }
    return res;
}

const getCommands = (table, tableName, dcOp, columns)=>{
    let commands = [getActionOpenPag()];
    commands = [...commands,...getActionTableHeaders(table,tableName,dcOp)];
    commands = [...commands,...[].concat.apply([],columns.map((col,index, array)=>{
        return getActionValues(index,col, array.length);
    }))];
    return commands;
}

const getFullScript = (table, tableName,dcOp, columns)=>{
    return {
        id: "e4e2307b-554b-4028-8ea0-504366f0f289",
        version: "2.0",
        name: "Record Test",
        url: "https://query.cebroker.com",
        tests: [{
            id: "dcba283a-9408-4e4f-a649-8e457e1b3830",
            name: "test1",
            commands: getCommands(table, tableName, dcOp, columns)
        }],
        suites: [{
            id: "3ab9230d-7dd1-48a9-add5-41a9255a2de5",
            name: "Default Suite",
            persistSession: false,
            parallel: false,
            timeout: 300,
            tests: ["dcba283a-9408-4e4f-a649-8e457e1b3830"]
        }],
        urls: ["https://query.cebroker.com/"],
        plugins: []
    } 
}

module.exports = {getFullScript};