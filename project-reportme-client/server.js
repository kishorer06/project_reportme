var express = require('express')
var app = express()

app.use(express.static(_dirname+'/dist'));
app.listen(process.env.port || 3000);
