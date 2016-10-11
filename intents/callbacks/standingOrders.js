var FigoHelper = require('../../figo/helper');
var FigoHelper = new FigoHelper();
var util = require('../../figo/util');

module.exports = function(req, res) {
    var standingOrders = res.session('standingOrders');
    if (!standingOrders) {
        FigoHelper.standingOrders(res.session('figoSession')).then(function(_standingOrders) {
            console.log(JSON.stringify(_standingOrders));

            // if there are no standingOrders, just create one for rent
            if (_standingOrders.length === 0) {
                res.session('standingOrders', [
                    {
                        'orderAcct': {
                            'iban': 'DE54123456780123456700',
                            'bic': 'DEUTDEDBHAM'
                        },
                        'orderID': '1',
                        'standingOrderDetails': {
                            'executeFirstTimeOn': '2016-07-01T00:00:00.000Z',
                            'timeUnit': 'M',
                            'periodLen': 1,
                            'execDay': 15
                        },
                        'orderAmount': 600,
                        'orderCurrencyCode': 'EUR',
                        'payeeAcct': {
                            'holderName': 'Donald Trump',
                            'iban': 'DE10876543210765432100',
                            'bic': 'COBADEHD044'
                        },
                        'paymtPurpose': 'monthly rent'
                    }
                ]);
            } else {
                res.session('standingOrders', _standingOrders);
            }
            var so = res.session('standingOrders')[0], t;
            t = (so.standingOrderDetails.timeUnit === 'M') ? 'month' : t;
            t = (so.standingOrderDetails.timeUnit === 'W') ? 'week' : t;
            t = (so.standingOrderDetails.timeUnit === 'Y') ? 'year' : t;
            var prompt = 'Yes, you have 1. You owe a tremendous ' +
                          so.orderAmount + ' euro to ' +
                          so.payeeAcct.holderName +
                          ' on day ' + so.standingOrderDetails.execDay +
                          ' of each ' + t;
            res.say(prompt).send();
        });
    }
    return false;
};
