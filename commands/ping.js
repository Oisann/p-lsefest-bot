
function run(err, message, api) {
    api.sendMessage('Pong', message.threadID);
}

exports.run = run;