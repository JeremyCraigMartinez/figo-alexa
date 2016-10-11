/*
 * Figo related skills
 */

var FigoHelper = require('./helper');
var FigoHelper = new FigoHelper();

var util = require('./util');

// selected account for pizza payment
var accounts;
var selectedAccount;
var standingOrders;
var paycheckDate;
var balance;

// general variables
var samsungCost = 720;
// used to refer to the most recent/relevant item
var it;

FigoHelper.access()

module.exports = function(app) {
    app.intent('openBankapizza', {
            'utterances':['open bank-a-pizza']
        }, function(req, res) {
            FigoHelper.access().then(function(err) {
                res.say('Bank-a-pizza here, what would you like?').send();
            });
        }
    );

    app.intent('setAccount', {
            'slots':{'PAYMENT':'LITERAL'},
            'utterances':['{pay with} {paypal|giro|PAYMENT}']
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
                    accounts = accts
                    selectedAccount = util.getAccount(accts, 'type', paymentType);
                    balance = selectedAccount.balance.balance

                    // subtract some of the balance to make dialog work for bank loan suggestion
                    balance = Math.ceil(balance - 1900);

                    // check that you have the funds
                    if (app.locals.pizzaOrder && app.locals.pizzaOrder.cost > balance) {
                        prompt = 'You are too poor to afford this pizza.';
                        reprompt = 'Choose a different account.';
                        res.say(prompt).reprompt(reprompt).shouldEndSession(false).send();
                    } else {
                        console.log(JSON.stringify(accts));
                        console.log(JSON.stringify(selectedAccount));
                        res.say('ok, your balance is ' + balance + ' euro').send();
                    }
                });
                return false;
            }
        }
    );

    app.intent('getBalance', {
            'utterances':['{what is|what\'s} my balance?']
        }, function(req, res) {
            var prompt = 'Your balance is ' + balance;
            res.say(prompt).send();
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
                    var prompt = 'Yes, you have 1. You owe a tremendous ' +
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
            if (balance - so.orderAmount - samsungCost > 0) {
                prompt = 'Yes, after your purchase and payment to ' + so.payeeAcct.holderName + ' you will have ' + (balance - so.orderAmount - samsungCost) + ' in your account.';
            } else {
                prompt = 'No, you will overdraw your account after your upcoming payments due.';
            }
            res.say(prompt).send();
        }
    );

    app.intent('nextPaycheck', {
            'utterances':['{|and} when {is|will} my next paycheck {come|coming}?']
        }, function(req, res) {
            var prompt = 'Based on recent account history, your paycheck should come on the ';
            FigoHelper.transactions().then(function(transactions) {
                paycheckDate = util.predictPaycheck(transactions);
                prompt += paycheckDate + 'th.';
                res.say(prompt).send();
            })
            return false;
        }
    );

    app.intent('summary', {
            'utterances':['{|so} {|can you} give me a summary {|of everything|of everything so far}?']
        }, function(req, res) {
            var prompt = 'The Samsung Galaxy Note costs ' + samsungCost + ' Euro and your Balance is ' + balance + ' Euro. You have  outgoing payments planed of ' + standingOrders[0].orderAmount + ' Euro which all together would leave you with ' + (balance-samsungCost-standingOrders[0].orderAmount) + ' and your next paycheck should come on the ' + paycheckDate + 'th.';
            res.say(prompt).send();
        }
    );

};
