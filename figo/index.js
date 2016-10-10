'use strict';

// figo sdk
var Promise = require('bluebird');
var figo = require('figo');
var access = require('./access');

var access_token, refresh_token, scope;

var connection = Promise.promisifyAll(new figo.Connection(access.id, access.secret));
var session;

function FigoHelper() {}

FigoHelper.prototype.access = function() {
    return connection.credential_loginAsync(access.email, access.password, null, null, null, null).then(function(data) {
        access_token = data.access_token;
        refresh_token = data.refresh_token;
        scope = data.scope;
        session = Promise.promisifyAll(new figo.Session(access_token));
        return null;
    });
}

FigoHelper.prototype.listAccounts = function() {
    return session.get_accountsAsync().then(function(accounts) {
        return accounts;
    });
};

module.exports = FigoHelper;
