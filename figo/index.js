/*
 * Figo related skills
 */

var FigoHelper = require('./helper');
var FigoHelper = new FigoHelper();

var util = require('./util');

// selected account for pizza payment
var accounts = null;
var selectedAccount = null;
var standingOrders;

// general variables
var samsungCost = 720;
// used to refer to the most recent/relevant item
var it;

FigoHelper.access();

module.exports = function(app) {
    app.intent('openBankapizza', {
            "utterances":["{open bank-a-pizza|refresh account access}"]
        }, function(req, res) {
            FigoHelper.access().then(function(err) {
                res.say('Bank-a-pizza here, what would you like?').shouldEndSession(false).send();
            });
            return false;
        }
    );

    app.intent('setAccount', {
            'slots':{'PAYMENT':'LITERAL'},
            'utterances':['{pay with|use} {paypal|giro|PAYMENT} {account}']
        }, function(req, res) {
            var prompt, reprompt;
            var paymentType = req.slot('PAYMENT');
            if (!paymentType ||
               (paymentType !== 'paypal' && paymentType !== 'giro')) {
                prompt = 'That is not a payment option.';
                reprompt = 'You can choose between a paypal or giro account.';
                res.say(prompt).reprompt(reprompt).shouldEndSession(false).send();
                return true;
            } else {
                console.log('payment option: ' + paymentType);
                FigoHelper.listAccounts().then(function(accts) {
                    selectedAccount = util.getAccount(accts, 'type', paymentType);
                    // check that you have the funds
                    if (app.locals.pizzaOrder && app.locals.pizzaOrder.cost > selectedAccount.balance.balance) {
                        prompt = 'You are too poor to afford this pizza. Your account balance is ' + selectedAccount.balance.balance + ' ' + selectedAccount.currency;
                        reprompt = 'Choose a different account.';
                        res.say(prompt).reprompt(reprompt).shouldEndSession(false).send();
                    } else {
                        console.log(JSON.stringify(accts));
                        console.log(JSON.stringify(selectedAccount));
                        res.say('ok').send();
                    }
                });
                return false;
            }
        }
    );

    app.intent('getBalance', {
            'utterances':['{what is|what\'s} my balance']
        }, function(req, res) {
            var prompt = 'Your balance is ' + selectedAccount.balance.balance;
            res.say(prompt).send();
            return true;
        }
    );

    app.intent('howMuchIsNewPhone', {
            'utterances':['How much is the new Samsung Galaxy Note 7?']
        }, function(req, res) {
            var prompt = 'The Samsung Galaxy Note 7 cost ' + samsungCost + ' euro';
            it = samsungCost;
            res.say(prompt).send();
        }
    );

    app.intent('standingOrders', {
            'utterances':['Do I have any upcoming costs?']
        }, function(req, res) {
            if (!standingOrders) {
                FigoHelper.standingOrders().then(function(_standingOrders) {
                    console.log(JSON.stringify(_standingOrders));

                    // if there are no standingOrders, just create one for rent
                    if (_standingOrders.length === 0) {
                        standingOrders = [
                            {
                                'orderAcct': {
                                    'iban': 'DE54123456780123456700',
                                    'bic': 'DEUTDEDBHAM'
                                },
                                'orderID': '1',
                                'standingOrderDetails': {
                                    'executeFirstTimeOn': '2016-07-01T00:00:00.000Z',
                                    'timeUnit': 'M',
                                    'periodLen': 1,
                                    'execDay': 15
                                },
                                'orderAmount': 600,
                                'orderCurrencyCode': 'EUR',
                                'payeeAcct': {
                                    'holderName': 'Donald Trump',
                                    'iban': 'DE10876543210765432100',
                                    'bic': 'COBADEHD044'
                                },
                                'paymtPurpose': 'monthly rent'
                            }
                        ]
                    } else {
                        standingOrders = _standingOrders;
                    }
                    var so = standingOrders[0], t;
                    t = (so.standingOrderDetails.timeUnit === 'M') ? 'month' : t;
                    t = (so.standingOrderDetails.timeUnit === 'W') ? 'week' : t;
                    t = (so.standingOrderDetails.timeUnit === 'Y') ? 'year' : t;
                    var prompt = 'Yes, you have 1. You owe ' +
                                  so.orderAmount + ' euro to ' +
                                  so.payeeAcct.holderName +
                                  ' on day ' + so.standingOrderDetails.execDay +
                                  ' of each ' + t;
                    res.say(prompt).send();
                });
            }
            return false;
        }
    );

    app.intent('canIAffordIt', {
            'utterances':['Can I afford it?']
        }, function(req, res) {
            var prompt;
            var so = standingOrders[0];
            if (selectedAccount.balance.balance - so.orderAmount - samsungCost > 0) {
                prompt = 'Yes, after your purchase and payment to ' + so.payeeAcct.holderName + ' you will have ' + (selectedAccount.balance.balance - so.orderAmount - samsungCost) + ' in your account.';
            } else {
                prompt = 'No, you will overdraw your account after your upcoming payments due.';
            }
            res.say(prompt).send();
        }
    );

    app.intent('nextPaycheck', {
            'utterances':['{|and} when {is|will} my next paycheck {come|coming}?']
        }, function(req, res) {
            var prompt = 'testing trannys';
            FigoHelper.transactions().then(function(transactions) {
                var date = util.predictPaycheck(transactions);
                res.say(prompt).send();
            })
            return false;
        }
    );

};
