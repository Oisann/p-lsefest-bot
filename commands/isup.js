var cheerio = require('cheerio');
var request = require('request');

String.prototype.between = function (prefix, suffix) {
    s = this;
    var i = s.indexOf(prefix);
    if (i >= 0) {
        s = s.substring(i + prefix.length);
    }
    else {
        return '';
    }
    if (suffix) {
        i = s.indexOf(suffix);
        if (i >= 0) {
            s = s.substring(0, i);
        }
        else {
            return '';
        }
    }
    return s;
}

function run(err, message, api) {
    var args = message.body.split(' ');
    if (args.length == 1)
        return;
    api.sendTypingIndicator(message.threadID, function (err) {
        if (err) console.log(err);
    });

    request('http://www.isup.me/' + args[1], function (error, response, body) {
        if (error) {
            console.log(error);
            return;
        }
        var $ = cheerio.load(body);
        var rawData = $('#container').text();
        var isup = rawData.indexOf('just you.') != -1;
        api.sendMessage(isup ? 'It\'s just you. ' + args[1] + ' is up.' : 'It\'s not just you! ' + args[1] + ' looks down from here.', message.threadID);
    });
}

exports.run = run;