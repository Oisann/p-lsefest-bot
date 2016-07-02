function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var names = ['👻', '💀', '🙏', '😱', '😭', '👼'];
function run(err, message, api) {
    api.sendTypingIndicator(message.threadID, function (err) {
        if(err) console.log(err);
    });
    setTimeout(function () {
        api.sendMessage('' + names[getRandomInt(0, names.length-1)], message.threadID);
    }, 1000 * getRandomInt(1, 5))
}

exports.run = run;