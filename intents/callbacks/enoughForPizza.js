module.exports = function(req, res) {
    var prompt = 'Honestly, you just took out a loan, can you really afford a pizza right now';
    res.say(prompt).send();
};
