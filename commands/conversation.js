
function run(err, message, api) {
    api.sendMessage('Conversation ID: ' + message.threadID, message.threadID);
}

exports.run = run;