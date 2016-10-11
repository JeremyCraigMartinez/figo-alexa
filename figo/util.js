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
        // assume paycheck is above 1000 euro
        if (trs[i].amount > 1000) {
            var h = _.sortedIndex(trsRecorded, trs[i].amount);
            var l = h - 1;
            var amount, booking_date;

            if ((trs[i].amount + 100) >= trsRecorded[h]) {
                amount = trsRecorded[h];
                booking_date = JSON.stringify(trs[i].booking_date);
            } else if ((trs[i].amount - 100) <= trsRecorded[l]) {
                amount = trsRecorded[l];
                booking_date = JSON.stringify(trs[i].booking_date);
            } else {
                amount = trs[i].amount;
                booking_date = JSON.stringify(trs[i].booking_date);
                sortedPush(trsRecorded, amount);
                trsByValue[amount] = [];
            }
            trsByValue[amount].push(booking_date.split('-')[2].substring(0,2));
        }
    }

    var max = 0, key = null;
    var keys = Object.keys(trsByValue);
    var len = keys.length;
    for (var i = 0; i < len; i++) {
        if (trsByValue[keys[i]].length > max) {
            max = trsByValue[keys[i]].length;
            key = keys[i];
        }
    }

    var dates = trsByValue[key];
    var total = 0;
    for (var i = 0, len = dates.length; i < len; i++) {
        total += parseInt(dates[i]);
    }

    return Math.ceil(total / dates.length);
};

module.exports = {
    getAccount: getAccount,
    predictPaycheck: predictPaycheck,
};
