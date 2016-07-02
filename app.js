var login = require("facebook-chat-api");
var express = require("express");
var app = express();


app.set('port', 80); //Default port is 80

login({ email: process.env.email, password: process.env.password }, function callback(err, api) {
    if (err) return console.error(err);

    app.get('*', function (req, res) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
        res.writeHead(200, { 'Content-Type': 'text/plain' });

        var msg = {}

        if (req.query.body) msg.body = req.query.body;
        if (req.query.url) msg.url = req.query.url;

        if (req.query.ids) {
            var ids = req.query.ids.split(',');

            for (var id in ids) {
                api.sendMessage(msg, ids[id]);
            }
        }


        res.end("OK");
    });

    api.listen(function callback(err, message) {
        runCommand(err, message, api);
        //api.sendMessage(message.body, message.threadID);
    });
});

app.listen(app.get('port'), function () {
    console.log('Pølsefest Bot is listening on port ' + app.get('port'));
});

function runCommand(err, message, api) {
    var isCommand = false;
    try {
        isCommand = message.body[0] == "!" || message.body[0] == "/";
    } catch (e) { }
    if (!isCommand) return;
    api.markAsRead(message.threadID, function (err) {
        if (err) console.log(err);
    });
    var _comm = message.body.split(' ')[0];
    var command = _comm.substring(1, _comm.length);
    try {
        var mod = requireUncached('./commands/' + command);
        mod.run(err, message, api);
    } catch(e) {
        console.log('Command not found: ' + command);
    }
}

function requireUncached(module) {
    delete require.cache[require.resolve(module)]
    return require(module)
}