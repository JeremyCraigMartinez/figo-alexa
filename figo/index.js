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

FigoHelper.access();

module.exports = function(app) {
    app.intent('howMuchIsNewPhone', {
            'utterances':['{|Let\'s do a bit of online shopping} What is the price of the new Samsung Galaxy Note']
        }, function(req, res) {
            var prompt = 'The Samsung Galaxy Note 7 cost ' + samsungCost + ' euro';
            it = samsungCost;
            res.say(prompt).shouldEndSession(false).send();
        }
    );

    /*app.intent('getBalance', {
            'slots':{'ACCOUNT':'LITERAL'},
            'utterances':['{what is|what\'s} my {|paypal|giro|ACCOUNT} balance']
        }, function(req, res) {
            var account = req.slot('ACCOUNT');
            var reprompt = 'Which account do you mean, paypal or giro';
            if (!account || (account !== 'paypal' || account !== 'giro')) {
                res.say('I\'m sorry').reprompt(reprompt).shouldEndSession(false).send();
                return true;
            }
            var prompt = 'Your ' + account + ' account balance is ' + balance;
            res.say(prompt).shouldEndSession(false).send();
        }
    );*/

    app.intent('setAccount', {
            'slots':{'PAYMENT':'LITERAL'},
            'utterances':['{|Woah|okay} what is my {paypal|giro|PAYMENT} account balance {|then}']
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
                    selectedAccount = util.getAccount(accts, 'type', paymentType);
                    console.log(JSON.stringify(accts));
                    console.log(JSON.stringify(selectedAccount));
                    res.say('ok, I\'ll pay with ' + paymentType + '. Your account balance is ' + selectedAccount.balance.balance + ' ' + selectedAccount.currency).shouldEndSession(false).send();
                });
                return false;
            }
        }
    );

    /*app.intent('setAccount', {
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
                //console.log('payment option: ' + paymentType);
                FigoHelper.listAccounts().then(function(accts) {
                    selectedAccount = util.getAccount(accts, 'type', paymentType);
                    balance = selectedAccount.balance.balance;

                    // subtract some of the balance to make dialog work for bank loan suggestion
                    balance = Math.ceil(balance - 1900);

                    // check that you have the funds
                    if (app.locals.pizzaCost && app.locals.pizzaCost > balance) {
                        prompt = 'You are too poor to afford this pizza.';
                        reprompt = 'Choose a different account.';
                        res.say(prompt).reprompt(reprompt).shouldEndSession(false).send();
                    } else {
                        //console.log(JSON.stringify(accts));
                        //console.log(JSON.stringify(selectedAccount));
                        balance = balance - 11;
                        res.say('Ok. I\'ll pay with ' + paymentType + '. Your balance is ' + balance + ' ' + selectedAccount.currency).shouldEndSession(false).send();
                    }
                });
                return false;
            }
        }
    );*/

    app.intent('standingOrders', {
            'utterances':['Do I have any upcoming payments scheduled']
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
                        ];
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
                    res.say(prompt).shouldEndSession(false).send();
                });
            }
            return false;
        }
    );

    app.intent('canIAffordIt', {
            'utterances':['Can I afford the samsung phone']
        }, function(req, res) {
            var prompt;
            var so = standingOrders[0];
            if (balance - so.orderAmount - samsungCost > 0) {
                prompt = 'Yes, after your purchase and payment to ' + so.payeeAcct.holderName + ' you will have ' + (balance - so.orderAmount - samsungCost) + ' in your account.';
            } else {
                prompt = 'No, you will overdraw your account after your upcoming payments due.';
            }
            res.say(prompt).shouldEndSession(false).send();
        }
    );

    app.intent('summary', {
            'utterances':['{|umm} {|that can\'t be right} give me a summary {|of everything|of everything so far}']
        }, function(req, res) {
            var prompt = 'The Samsung Galaxy Note costs ' + samsungCost + ' Euro and your Balance is ' + balance + ' Euro. You have  outgoing payments planed of ' + standingOrders[0].orderAmount + ' Euro which all together would leave you with ' + (balance-samsungCost-standingOrders[0].orderAmount) + ' and your next paycheck should come on the ' + paycheckDate + 'th.';
            res.say(prompt).shouldEndSession(false).send();
        }
    );

    app.intent('nextPaycheck', {
            'utterances':['{|and} when {is|will|can I expect} my next paycheck {come|coming}']
        }, function(req, res) {
            var prompt = 'Based on recent account history, your paycheck should come on the ';
            FigoHelper.transactions().then(function(transactions) {
                paycheckDate = util.predictPaycheck(transactions);
                prompt += paycheckDate + 'th.';
                res.say(prompt).shouldEndSession(false).send();
            });
            return false;
        }
    );

    app.intent('loan', {
            'utterances':['{|ok|so} ask {|my} bank for {|a} loan']
        }, function(req, res) {
            var prompt = 'You can fund a loan of 200 euro for 1 euro a day until October ' + paycheckDate;
            res.say(prompt).shouldEndSession(false).send();
        }
    );

    app.intent('confirmLoan', {
            'utterances':['{|alright|ok|so} confirm {|the} loan']
        }, function(req, res) {
            var prompt = 'Loan of 200 EUR confirmed. Expected fee for the loan is ' + (paycheckDate-11) + ' Euro';
            res.say(prompt).shouldEndSession(false).send();
        }
    );

    app.intent('buyPhone', {
            'utterances':['Buy the Galaxy Note 7']
        }, function(req, res) {
            var prompt = 'Purchase confirmed. Based on the purchase we strongly recommend a fire extinguisher.';
            res.say(prompt).shouldEndSession(false).send();
        }
    );

    app.intent('finishDialog', {
            'utterances':['{|so} thanks for the info. Buy']
        }, function(req, res) {
            var prompt = 'Ebenso. Bis bald, Digga';
            res.say(prompt).send();
        }
    );
};
