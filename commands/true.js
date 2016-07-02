function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

String.prototype.contains = function (it) {
    return this.indexOf(it) != -1;
};


var alt = ['True', 'False'];
function run(err, message, api) {
    if (message.body.toLowerCase().contains('øystein') && message.body.toLowerCase().contains('gei')) {
        api.sendMessage('True', message.threadID);
    } else if (message.body.toLowerCase().contains('jonas') && message.body.toLowerCase().contains('gei')) {
        api.sendMessage('False', message.threadID);
    } else {
        api.sendMessage('' + alt[getRandomInt(0, alt.length - 1)], message.threadID);
    }
}

exports.run = run;