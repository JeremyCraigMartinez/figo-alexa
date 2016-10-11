var FigoHelper = require('../../figo/helper');
var FigoHelper = new FigoHelper();
var util = require('../../figo/util');

module.exports = function(req, res, paymentType) {
    console.log('paymentType = ' + paymentType);
    var prompt, reprompt;
    if (!paymentType ||
       (paymentType !== 'paypal' && paymentType !== 'giro')) {
        prompt = 'That is not a payment option.';
        reprompt = 'You can choose between a paypal or giro account.';
        res.say(prompt).reprompt(reprompt).shouldEndSession(false).send();
        return true;
    } else {
        console.log('payment option: ' + paymentType);
        FigoHelper.listAccounts(res.session('figoSession')).then(function(accts) {
            res.session('selectedAccount', util.getAccount(accts, 'type', paymentType));
            var selectedAccount = res.session('selectedAccount');
            var pizzaOrder = res.session('pizzaOrder');

            // check that you have the funds
            if (pizzaOrder && pizzaOrder.cost > selectedAccount.balance.balance) {
                prompt = 'You are too poor to afford this pizza. Your account balance is ' + selectedAccount.balance.balance + ' ' + selectedAccount.currency;
                reprompt = 'Choose a different account.';
                res.say(prompt).reprompt(reprompt).shouldEndSession(false).send();
            } else {
                //console.log(JSON.stringify(accts));
                //console.log(JSON.stringify(selectedAccount));
                res.say('Ok. I\'ll pay with ' + paymentType + ' Your account balance is ' + selectedAccount.balance.balance + ' ' + selectedAccount.currency).send();
            }
        });
        return false;
    }
}
