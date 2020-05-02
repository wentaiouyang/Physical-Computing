const express = require('express');
const app = express();
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('/dev/cu.usbmodem146401', { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\n' }));

// Read the port data
let Arduino_data = '';

app.get('/', function (req, res) {
    res.send(Arduino_data);
    port.on("open", () => {
        console.log('serial port open');
    });
    parser.on('data', data =>{
        console.log('got word from arduino:', data);
        Arduino_data=data;
        console.log('Arduino data:'+Arduino_data);
    });
});

const server = app.listen(8081, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log("server start at: http://%s:%s", host, port)
});




