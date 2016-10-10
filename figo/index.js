/*
 * Figo related skills
 */

//var FigoHelper = require('./helper');
var FigoHelper = {}; //new FigoHelper();

module.exports = function(app) {
    app.intent('getAccounts', {
            "utterances":["open bank-a-pizza"]
        }, function(req, res) {
            FigoHelper.access().then(function(err) {
                res.say('Bank-a-pizza here, what would you like?').send();
            });
            return false;
        }
    );
};
