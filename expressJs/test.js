const fs = require("fs");
fs.writeFileSync("f2.txt","this is file 2");
var text = fs.readFileSync("text.txt", 'utf-8');
console.log(text);