module.export = function(req, res) {
    var prompt = 'You can fund a loan of 200 euro for 1 euro a day until October ' + res.session('paycheckDate');
    res.say(prompt).send();
};
