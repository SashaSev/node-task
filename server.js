const cp = require("child_process");

 cp.fork("process1.js");
cp.fork("process2.js");
cp.fork("process2.js");


