var _ = require('lodash');

var getAccount = function(accounts, key, value) {
    for (var i = 0, len = accounts.length; i < len; i++) {
        if (accounts[i][key].toLowerCase().indexOf(value.toLowerCase()) > -1) {
            return accounts[i];
        }
    }
    return null;
};

function sortedPush(array, value) {
    array.splice(_.sortedIndex(array, value), 0, value);
}
// trs === transactions
var predictPaycheck = function(trs) {
    var trsRecorded = [];
    var trsByValue = {};
    for (var i = 0, len = trs.length; i < len; i++) {
        if (trs[i].amount < 0) {
            continue;
        }
        var h = _.sortedIndex(trsRecorded, trs[i]);
        var l = h - 1;
        var closeEnough;

        if (trs[i] + 100 > h) {
            closeEnough = trs[h];
        } else if (trs[i] - 100 < l) {
            closeEnough = trs[l];
        } else {
            closeEnough = trs[i];
            closeEnough.booking_date = JSON.stringify(closeEnough.booking_date);
            sortedPush(trsRecorded, closeEnough.booking_date);
            trsByValue[closeEnough.amount] = [];
        }

        trsByValue[closeEnough.amount].push(closeEnough.booking_date.split(' ')[2]);
    }
};

module.exports = {
    getAccount: getAccount,
    predictPaycheck: predictPaycheck,
};
