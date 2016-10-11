'use strict';

// figo sdk
var Promise = require('bluebird');
var figo = require('figo');
var access = require('./access');

var access_token, refresh_token, scope;

var connection = Promise.promisifyAll(new figo.Connection(access.id, access.secret));
var session;

function FigoHelper() {}

FigoHelper.prototype.listAccounts = function() {
    var basePromise = null;
    if (!session) {
        basePromise = connection.credential_loginAsync(access.email, access.password, null, null, null, null).then(function(data) {
            access_token = data.access_token;
            refresh_token = data.refresh_token;
            scope = data.scope;
            session = Promise.promisifyAll(new figo.Session(access_token));
            return session;
        });
    } else {
        basePromise = Promise.resolve(session);
    }
    return basePromise.then(function (session) {
        return session.get_accountsAsync();
    }).then(function(accounts) {
        //console.log(accounts);
        //console.log(JSON.stringify(accounts));
        return accounts;
    });
};

FigoHelper.prototype.standingOrders = function() {
    var basePromise = null;
    if (!session) {
        basePromise = connection.credential_loginAsync(access.email, access.password, null, null, null, null).then(function(data) {
            access_token = data.access_token;
            refresh_token = data.refresh_token;
            scope = data.scope;
            session = Promise.promisifyAll(new figo.Session(access_token));
            return session;
        });
    } else {
        basePromise = Promise.resolve(session);
    }
    return basePromise.then(function (session) {
        return session.get_standing_ordersAsync(null).then(function(standingOrders) {
            return standingOrders;
        });
    })
};

FigoHelper.prototype.transactions = function() {
    var basePromise = null;
    if (!session) {
        basePromise = connection.credential_loginAsync(access.email, access.password, null, null, null, null).then(function(data) {
            access_token = data.access_token;
            refresh_token = data.refresh_token;
            scope = data.scope;
            session = Promise.promisifyAll(new figo.Session(access_token));
            return session;
        });
    } else {
        basePromise = Promise.resolve(session);
    }
    return basePromise.then(function (session) {
        return session.get_transactionsAsync(null).then(function(transactions) {
            return transactions;
        });
    })
};

module.exports = FigoHelper;
