var alexa = require('alexa-app');
var figo = require('./figo');
var pizza = require('./pizza');

// get access token
//FigoHelper.access();

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;

var greetings = [
    'Moin Digga. What\'s up?',
];

// Define an alexa-app
var app = new alexa.app('bankapizza');
app.launch(function(req,res) {
    var greetingId =Math.floor(Math.random() * greetings.length);
    res.say(greetings[greetingId]);
    res.shouldEndSession(false);
});

app.error = function(exception, request, response) {
    console.log('exception: ' + JSON.stringify({name: exception.name, message: exception.message, stack: exception.stack}));
    //console.log('request: ' + JSON.stringify(request));
    //console.log('response: ' + JSON.stringify(response));
    response.say("Sorry, something bad happened, but you are fine, I've logged it.");
};

app.locals = {};

pizza(app);
figo(app);

//hack to support custom utterances in utterance expansion string
var utterancesMethod = app.utterances;
app.utterances = function() {
    return utterancesMethod().replace(/\{\-\|/g, '{');
};

// Connect the alexa-app to AWS Lambda
exports.handler = app.lambda();
module.exports = app;
