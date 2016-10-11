var intents = [];

function register(name, schema, needsFigoSession) {
    intents.push({name: name, schema: schema, needsFigoSession: !!needsFigoSession});
}

function registerAll() {
    register('pizzaIntent', {
        "slots":{ "PIZZA": "LITERAL" },
        "utterances":["{ Get me|I want to order|How about getting} {diabolo|margherita|salami|PIZZA} "]
    });

    register('enoughForPizza', {
        'utterances':['{|ok|so} do {|you think} we have enough {for|to order} a pizza']
    });

    register('summary', {
       'utterances':['{|so} {|can you} give me a summary {|of everything|of everything so far}']
    });

    register('loan', {
        'utterances':['{|ok|so} ask {|my} bank for {|a} loan']
    });

    register('confirmLoan', {
        'utterances':['{|alright|ok|so} confirm {|the} loan']
    });

    register('buyPhone', {
        'utterances':['Buy the Galaxy Note']
    });

    register('setAccount', {
        'slots':{'PAYMENT':'LITERAL'},
        'utterances':['{pay with|use} {paypal|giro|PAYMENT} {account}']
    }, true);

    register('getBalance', {
        'utterances':['{what is|what\'s} my balance']
    }, true);

    register('howMuchIsNewPhone', {
        'utterances':['How much is the new Samsung Galaxy Note']
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
