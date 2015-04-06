/*jshint node:true*/
'use strict';

// This is a stripped down version of the app.js file found here: https://github.com/johnpapa/pluralsight-gulp/tree/master/src/server. It just serves static pages. Which pages it serves, depends on whether the NODE_ENV variable is set to 'dev' or 'build'.
var express = require('express');
var app = express();
var compress = require('compression');
var favicon = require('serve-favicon');
var port = process.env.PORT || 8000;
var environment = process.env.NODE_ENV;

// gzip html, js and fonts. We have to set the threshold to 0 in order for the compression middleware to compress assets below 1024Kb.
app.use(compress({threshold: 0}));
// Serve a favicon.
app.use(favicon(__dirname + '/favicon.ico'));

// Serve from different folders based on the environment variable.
switch (environment) {
    case 'build':
        console.log('** BUILD **');
        // Serve and cache the build folder.
        app.use(express.static('./build/', {maxAge: '7 days'}));
        app.use('/*', express.static('./build/index.html'));
        break;
    default:
        console.log('** DEV **');
        app.use(express.static('./src/'));
        app.use(express.static('./'));
        app.use(express.static('./tmp'));
        app.use('/*', express.static('./src/index.html'));
        break;
}

// Start the server listening on the given port.
app.listen(port, function() {
    console.log('Express server listening on port ' + port);
    console.log('__dirname = ' + __dirname +
                '\nprocess.cwd = ' + process.cwd());
});