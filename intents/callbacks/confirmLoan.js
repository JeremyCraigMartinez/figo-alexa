module.export = function(req, res) {
    var paycheckDate = res.session('paycheckDate');
    var prompt = 'Loan of 200 EUR confirmed. Expected fee for the loan is ' + (paycheckDate-11) + ' Euro';
    res.say(prompt).send();
};
