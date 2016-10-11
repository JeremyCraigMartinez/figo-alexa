module.exports = function(req, res) {
    var prompt = 'Purchase confirmed. Based on the purchase we strongly recommend a fire extinguisher.';
    res.say(prompt).send();
};
