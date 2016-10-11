var intents = require('./intents');
var FigoHelper = require('../figo/helper');
var FigoHelper = new FigoHelper();

var register = function register(app) {
    intents.forEach(function registerIntent(intent) {
        app.intent(intent.name, intent.schema, function onIntent(req, res) {
            // first check if an intent has a registered callback
            var callbackLocation = './callbacks/' + intent.name;
            if (!require.resolve(callbackLocation)) {
                throw new Error('intent ' + intent.name + ' does not have a registered callback.');
            }
            var callback = require(callbackLocation);
            var slots = [];
            if (intent.needsFigoSession) {
                res.session('figoSession', FigoHelper.setupNewSession());
            }
            // retrieve slots if available
            if (intent.schema.slots) {
                var slotNames = Object.keys(intent.schema.slots);
                slotNames.forEach(function getSlot(slotName) {
                    slots.push(req.slot(slotName));
                });
            }
            // eventually call a callback with retrieved slots, e.g.
            // callback(req, res, slot1, slot2)
            return callback.apply(app, [req, res].concat(slots));
        });
    });
};

module.exports = {
    register: register,
};
