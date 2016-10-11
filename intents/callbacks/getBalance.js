module.exports = function(req, res) {
    var selectedAccount = res.session('selectedAccount');
    var prompt = 'Your balance is ' + selectedAccount.balance.balance + ' ' + selectedAccount.currency;
    console.log('prompt is ' + prompt);
    res.say(prompt).send();
    return true;
};
