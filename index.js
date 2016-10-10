var alexa = require('alexa-app');

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;

// Define an alexa-app
var app = new alexa.app('pizza');
app.launch(function(req,res) {
    res.say("Yay, let's eat some pizza, figo boy");
});

app.intent('pizza_intent', {
        "slots":{"PIZZA":"LITERAL"},
        "utterances":["{Get me|I want to order} {diabolo|margarita|PIZZA} "]
    }, function(req, res) {
        //get the slot
        var pizzaType = req.slot('PIZZA');
        var reprompt = 'Tell me which pizza you want once more, you mumbling bastard.';
        if (!pizzaType) {
            var prompt = 'Tell me pizza you want.';
            res.say(prompt).reprompt(reprompt).shouldEndSession(false);
            return true;
        } else {
            // faking getting pizza
            if (pizzaType === 'diabolo' || pizzaType === 'margarita') {
                res.say('Ok, you\'ll get your ' + pizzaType + '.');
            } else {
                var unknownPizzaPrompt = 'I do not know this pizza.';
                res.say(unknownPizzaPrompt).reprompt(reprompt).shouldEndSession(false);
                res.shouldEndSession(false);
            }
        }
    }
);

//hack to support custom utterances in utterance expansion string
var utterancesMethod = app.utterances;
app.utterances = function() {
    return utterancesMethod().replace(/\{\-\|/g, '{');
};

// Connect the alexa-app to AWS Lambda
exports.handler = app.lambda();
module.exports = app;