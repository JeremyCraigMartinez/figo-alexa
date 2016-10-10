var ntw = require('number-to-words');

var getAccount = function(accounts, key, value) {
    for (var i = 0, len = accounts.length; i < len; i++) {
        if (accounts[i][key].toLowerCase().indexOf(value.toLowerCase()) > -1) {
            return accounts[i];
        }
    }
    return null;
}

var numberToText = function(number) {
    
};

module.exports = {
    getAccount: getAccount,
    numberToText: numberToText,
};
