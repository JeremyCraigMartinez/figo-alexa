var getAccount = function(accounts, key, value) {
    for (var i = 0, len = accounts.length; i < len; i++) {
        if (accounts[i][key].toLowerCase() === value.toLowerCase()) {
            return accounts[i];
        }
    }
    return null;
}

module.exports = {
    getAccount: getAccount,
};
