/*
 * Pizza related skills
 */

module.exports = function(app) {
    app.intent('pizza', {
            "slots":{"PIZZA":"LITERAL"},
            "utterances":["{Get me|I want to order} {diabolo|margarita|PIZZA} "]
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
};
