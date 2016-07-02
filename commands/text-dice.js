function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function run(err, message, api) {
    api.sendTypingIndicator(message.threadID, function (err) {
        if(err) console.log(err);
    });
    setTimeout(function () {
        api.sendMessage('' + getRandomInt(1, 6), message.threadID);
    }, 1000 * getRandomInt(1, 5));
}

exports.run = run;