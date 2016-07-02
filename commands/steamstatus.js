
function run(err, message, api) {
    setTimeout(function () {
        api.sendMessage('Sorry, I can\'t figure it out yet.', message.threadID);
    }, 5000);
}

exports.run = run;