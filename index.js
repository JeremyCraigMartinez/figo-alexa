var alexa = require('alexa-app');
var figo = require('./figo');
var pizza = require('./pizza');

// get access token
//FigoHelper.access();

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;

// Define an alexa-app
var app = new alexa.app('bankapizza');
app.launch(function(req,res) {});

pizza(app);
figo(app);

//hack to support custom utterances in utterance expansion string
var utterancesMethod = app.utterances;
app.utterances = function() {
    return utterancesMethod().replace(/\{\-\|/g, '{');
};

module.exports = app;
