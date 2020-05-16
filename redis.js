const redis = require('redis');
const client = redis.createClient();
const fs = require("fs");
const ps = require("ps-node")


client.on('connect', function () {
    console.log('Redis client connected');
});
client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

function writeFileJson(data) {
    fs.writeFile('./pid.json', data, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })
}

function readFile(pid) {
    fs.readFile('./pid.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            throw err
        }

        ps.lookup({pid: JSON.parse(jsonString).pid}, function (err, resultList) {
            if (err) {
                throw new Error(err);
            }
            if (resultList.length === 0) {
                console.log(`generator exchange process pid ${pid}`)
                writeFileJson(JSON.stringify({pid: pid}));
            }
        });
    })
}


function processSet(process_pid) {
    writeFileJson(JSON.stringify(process_pid));
}

function generatorMessage() {
    setInterval(() => client.set('my test key', message(100)), 500)
}

function listener() {
    client.get('my test key', function (error, result) {
        if (error) {
            console.log(error);
            throw error;
        }
        console.log('GET result ->' + result);
    });
}

function generatorProcess(pid) {
    setInterval(() => fs.readFile('./pid.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            throw err
        }

        if (!JSON.parse(jsonString).pid) {
            processSet({pid: pid});
            generatorMessage();
        } else {
            listener();
        }
    }), 500);
}

function message(maxLength) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let charactersLength = characters.length;
    for (let i = 0; i < maxLength; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

module.exports = {
    generatorProcess,
    readFile
}