var intents = [];

function register(name, schema, needsFigoSession) {
    intents.push({name: name, schema: schema, needsFigoSession: !!needsFigoSession});
}

function registerAll() {
    register('pizzaIntent', {
        "slots":{ "PIZZA": "LITERAL" },
        "utterances":["{ Get me|I want to order|How about getting} {diabolo|margherita|salami|PIZZA} "]
    });

    register('setAccount', {
        'slots':{'PAYMENT':'LITERAL'},
        'utterances':['{pay with|use} {paypal|giro|PAYMENT} {account}']
    }, true);

    register('getBalance', {
        'utterances':['{what is|what\'s} my balance']
    }, true);

    register('howMuchIsNewPhone', {
        'utterances':['How much is the new Samsung Galaxy Note 7']
    }, true);

    register('standingOrders', {
        'utterances':['Do I have any upcoming costs']
    }, true);

    register('canIAffordIt', {
        'utterances':['Can I afford it']
    }, true);

    register('nextPaycheck', {
        'utterances':['{|and} when {is|will} my next paycheck {come|coming}']
    }, true);
}

module.exports = function () {
    registerAll();
    return intents;
}();
