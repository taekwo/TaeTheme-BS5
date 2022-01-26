/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var StaticServer = require('static-server');
var server = new StaticServer({
    rootPath: './dist', // required, the root of the server file tree
    port: 1337 // required, the port to listen
});

server.start(function () {
    console.log('Server listening to', server.port);
});