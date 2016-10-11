module.exports = function(req, res, pizzaType) {
    console.log('here ' + pizzaType);
    var reprompt = 'Tell me which pizza you want once more, you mumbling bastard.';
    if (!pizzaType) {
        var prompt = 'Tell me what pizza you want.';
        res.say(prompt).reprompt(reprompt).shouldEndSession(false);
        return false;
    } else {
        // faking getting pizza
        if (pizzaType === 'diabolo' || pizzaType === 'margherita' || pizzaType === 'salami') {
            res.say('Ok, you\'ll get your ' + pizzaType + '. How do you want to pay?');
            res.shouldEndSession(false);
        } else {
            var unknownPizzaPrompt = 'I do not know this pizza.';
            res.say(unknownPizzaPrompt).reprompt(reprompt).shouldEndSession(false);
            res.shouldEndSession(false);
        }
    }
}
