/*
 * Pizza related skills
 */

module.exports = function(app) {
    app.intent('pizza_intent', {
            "slots":{"PIZZA":"LITERAL"},
            "utterances":["{ Get me|I want to order|How about getting} a {diablo|margherita|salami|PIZZA} pizza"]
        }, function(req, res) {
            //get the slot
            var pizzaType = req.slot('PIZZA');
            var reprompt = 'Tell me which pizza you want once more, you mumbling bastard.';
            if (!pizzaType) {
                var prompt = 'Tell me what pizza you want.';
                res.say(prompt).reprompt(reprompt).shouldEndSession(false);
                return true;
            } else {
                // faking getting pizza
                if (pizzaType === 'diablo' || pizzaType === 'margherita' || pizzaType === 'salami') {
                    app.locals.pizzaCost = 11;
                    res.say('Ok, I will use you giro account. Your ' + pizzaType + ' pizza is on the way.').shouldEndSession(false);
                } else {
                    var unknownPizzaPrompt = 'I do not know this pizza.';
                    res.say(unknownPizzaPrompt).reprompt(reprompt).shouldEndSession(false);
                    res.shouldEndSession(false);
                }
            }
        }
    );

    app.intent('enoughForPizza', {
            'utterances':['{|ok|so} do {|you think} we have enough {for|to order} a pizza']
        }, function(req, res) {
            var prompt = 'Honestly, you just took out a loan, can you really afford a pizza right now';
            res.say(prompt).shouldEndSession(false).send();
        }
    );
};
