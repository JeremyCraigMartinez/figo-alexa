/*
 * Figo related skills
 */

var FigoHelper = require('./helper');
var FigoHelper = new FigoHelper();

var util = require('./util');

// selected account for pizza payment
var selectedAccount = null;

FigoHelper.access()

module.exports = function(app) {
    app.intent('openBankapizza', {
            "utterances":["open bank-a-pizza"]
        }, function(req, res) {
            FigoHelper.access().then(function(err) {
                res.say('Bank-a-pizza here, what would you like?').send();
            });
        }
    );

    app.intent('setAccount', {
            "slots":{"PAYMENT":"LITERAL"},
            "utterances":["{pay with} {paypal|giro|credit card|PAYMENT}"]
        }, function(req, res) {
            var paymentType = req.slot('PAYMENT');
            var reprompt = 'you can choose between paypal, giro, and credit card';
            if (!paymentType ||
               (paymentType !== 'paypal' && paymentType !== 'giro' && paymentType !== 'credit card')) {
                var prompt = 'That is not a payment option';
                res.say(prompt).reprompt(reprompt).shouldEndSession(false).send();
                return true;
            } else {
                console.log('payment option: ' + paymentType);
                FigoHelper.listAccounts().then(function(accounts) {
                    selectedAccount = util.getAccount(accounts, 'type', paymentType);
                    console.log(JSON.stringify(selectedAccount));
                    res.say('ok').shouldEndSession(false).send();
                });
                return false;
            }
        }
    );
};
