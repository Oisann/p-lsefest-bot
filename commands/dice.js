var fs = require('fs');

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function run(err, message, api) {
    api.sendTypingIndicator(message.threadID, function (err) {
        if(err) console.log(err);
    });

    var num = getRandomInt(1, 6);
    var pic = getRandomInt(0, 3);

    console.log('Threw the dice and got', num);

    var msg = {
        attachment: fs.createReadStream('./commands/dice/' + num + '/' + pic + '.gif')
    }

    setTimeout(function () {
        api.sendMessage(msg, message.threadID);
    }, 1000 * getRandomInt(0, 2) + 1);
}

exports.run = run;