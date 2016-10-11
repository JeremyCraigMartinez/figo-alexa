var FigoHelper = require('../../figo/helper');
var FigoHelper = new FigoHelper();
var util = require('../../figo/util');

module.exports = function(req, res) {
    var prompt = 'Based on recent account history, your paycheck should come on the ';
    FigoHelper.transactions(res.session('figoSession')).then(function(transactions) {
        res.session('paycheckDate', util.predictPaycheck(transactions));
        prompt += res.session('paycheckDate') + 'th.';
        res.say(prompt).send();
    });
   return false;
}
