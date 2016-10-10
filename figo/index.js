/*
 * Figo related skills
 */

var FigoHelper = require('./helper');
var FigoHelper = new FigoHelper();

var util = require('./util');

// selected account for pizza payment
var accounts = null;
var selectedAccount = null;

FigoHelper.access();

module.exports = function(app) {
    app.intent('openBankapizza', {
            "utterances":["{open bank-a-pizza|refresh account access}"]
        }, function(req, res) {
            FigoHelper.access().then(function(err) {
                res.say('Bank-a-pizza here, what would you like?').shouldEndSession(false).send();
            });
        }
    );

    app.intent('setAccount', {
            'slots':{'PAYMENT':'LITERAL'},
            'utterances':['{pay with} {paypal|giro|PAYMENT}']
        }, function(req, res) {
            var paymentType = req.slot('PAYMENT');
            var reprompt = 'you can choose between a paypal or giro account';
            if (!paymentType ||
               (paymentType !== 'paypal' && paymentType !== 'giro')) {
                var prompt = 'That is not a payment option';
                res.say(prompt).reprompt(reprompt).shouldEndSession(false).send();
                return true;
            } else {
                console.log('payment option: ' + paymentType);
                FigoHelper.listAccounts().then(function(accts) {
                    accounts = accts
                    selectedAccount = util.getAccount(accts, 'type', paymentType);
                    console.log(JSON.stringify(accts));
                    console.log(JSON.stringify(selectedAccount));
                    res.say('ok, I\'ll pay with ' + paymentType + '. Your account balance is ' + selectedAccount.balance + ' in ' + selectedAccount.currency).shouldEndSession(false).send();
                });
            }
        }
    );

    app.intent('getBalance', {
            'utterances':['{what is|what\'s} my balance?']
        }, function(req, res) {
            var prompt = 'Your balance is ' + selectedAccount.balance.balance;
            res.say(prompt).send();
        }
    );
};
