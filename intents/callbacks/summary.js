module.exports = function(req, res) {
    var samsungCost = 700;
    var balance = res.session('balance');
    var standingOrders = res.session('standingOrders');

    var prompt = 'The Samsung Galaxy Note costs ' + samsungCost + ' Euro and your Balance is ' + balance + ' Euro. You have  outgoing payments planed of ' + standingOrders[0].orderAmount + ' Euro which all together would leave you with ' + (balance-samsungCost-standingOrders[0].orderAmount) + ' and your next paycheck should come on the ' + paycheckDate + 'th.';
    res.say(prompt).send();
}
