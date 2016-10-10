/*
 * Pizza related skills
 */

module.exports = function(app) {
    app.intent('pizza_intent', {
            "slots":{"PIZZA":"LITERAL"},
            "utterances":["Hey, { Get me|I want to order|How about getting} {diabolo|margherita|salami|PIZZA} "]
        }, function(req, res) {
            //get the slot
            var pizzaType = req.slot('PIZZA');
            var reprompt = 'Tell me which pizza you want once more, you mumbling bastard.';
            if (!pizzaType) {
                var prompt = 'Tell me what pizza you want.';
                res.say(prompt).reprompt(reprompt).shouldEndSession(false);
                return false;
            } else {
                // faking getting pizza
                if (pizzaType === 'diabolo' || pizzaType === 'margherita' || pizzaType === 'salami') {
                    res.say('Ok, you\'ll get your ' + pizzaType + '.');
                    res.shouldEndSession(false);
                } else {
                    var unknownPizzaPrompt = 'I do not know this pizza.';
                    res.say(unknownPizzaPrompt).reprompt(reprompt).shouldEndSession(false);
                    res.shouldEndSession(false);
                }
            }
        }
    );
};
