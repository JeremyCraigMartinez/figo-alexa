module.exports = function(req, res) {
    var prompt;
    var standingOrders = res.session('standingOrders');
    var so = standingOrders[0] ? standingOrders[0] : {orderAmount: 500};
    var selectedAccount = res.session('selectedAccount');
    if (selectedAccount.balance.balance - so.orderAmount - 700 > 0) {
        prompt = 'Yes, after your purchase and payment to ' + so.payeeAcct.holderName + ' you will have ' + (selectedAccount.balance.balance - so.orderAmount - 700) + ' in your account.';
    } else {
        prompt = 'No, you will overdraw your account after your upcoming payments due.';
    }
    res.say(prompt).send();
};
