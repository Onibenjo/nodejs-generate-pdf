//Required package
var pdf = require("pdf-creator-node");
var fs = require('fs');

// Read HTML Template
var html = fs.readFileSync('src/template/pdf.html', 'utf8');

var users = [
    {
        name:"Shyam",
        age:"26"
    },
    {
        name:"Navjot",
        age:"26"
    },
    {
        name:"Vitthal",
        age:"26"
    }
]
var document = {
    html: html,
    data: {
        users: users
    },
    path: "./outputs/output.pdf"
};

pdf.create(document, options = null)
    .then(res => {
        console.log(res)
    })
    .catch(error => {
        console.error(error)
    });