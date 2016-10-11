var FigoHelper = require('../../figo/helper');
var FigoHelper = new FigoHelper();
var util = require('../../figo/util');

module.exports = function(req, res) {
    var prompt = 'testing trannys';
    FigoHelper.transactions(res.session('figoSession')).then(function(transactions) {
        var date = util.predictPaycheck(transactions);
        res.say(prompt).send();
    })
    return false;
}
