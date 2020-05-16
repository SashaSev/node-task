

const {generatorProcess,readFile} = require("./redis");

setInterval(() => readFile(process.pid),500);
generatorProcess(process.pid);