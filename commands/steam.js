var http = require('http');
var cheerio = require('cheerio');
var request = require('request');
var steamLibrary = "http://api.steampowered.com/ISteamApps/GetAppList/v0001/";
var steamPrefixURL = "http://store.steampowered.com/app/";

function getAppDetailsURL(id, curr) {
    if (!curr) curr = "NO";
    return "http://store.steampowered.com/api/appdetails/?cc=" + curr + "&l=english&v=1&appids=" + id;
}

function run(err, message, api) {
    var args = message.body.split(' ');
    if (args.length == 1)
        return;
    api.sendTypingIndicator(message.threadID, function (err) {
        if (err) console.log(err);
    });

    if (!isNaN(parseInt(args[1]))) {
        var game = parseInt(args[1]);
        var currency;
        if (args.length >= 3)
            currency = args[2];

        var req = http.get(getAppDetailsURL(game, currency), function (res) {
            var bodyChunks = [];
            res.on('data', function (chunk) {
                bodyChunks.push(chunk);
            }).on('end', function () {
                var body = Buffer.concat(bodyChunks);
                try {
                    var details = JSON.parse(body);
                    var isFree = details[game].data.is_free;

                    if (isFree) {

                        var msg = {
                            body: details[game].data.name + ' is free!',
                            url: steamPrefixURL + '' + game + '/'
                        }

                        api.sendMessage(msg, message.threadID);

                        return;
                    }

                    var price = details[game].data.price_overview;
                    var isDiscount = price.discount_percent != 0;

                    var msg = {
                        body: '',
                        url: steamPrefixURL + '' + game + '/'
                    }

                    if (isDiscount) {
                        msg.body = details[game].data.name + " is on sale for " + parseFloat(price.final / 100) + " " + price.currency + " (-" + price.discount_percent + "%" + ")";
                    } else {
                        msg.body = details[game].data.name + " currently costs " + parseFloat(price.final / 100) + " " + price.currency;
                    }

                    api.sendMessage(msg, message.threadID);
                } catch (e) {
                    console.log(e);
                    api.sendMessage('Invalid SteamID', message.threadID);
                }
            })
        });

    } else {
        request('http://store.steampowered.com/search/?term=' + message.body.replace(args[0], ''), function (error, response, body) {
            var $ = cheerio.load(body);

            if ($('div#search_result_container p').last().text() == "No results were returned for that query.") {
                api.sendMessage('No game found :\'(', message.threadID);
            } else {
                var firstAppID = $('div#search_result_container div a').first().attr('data-ds-appid');
                message.body = args[0] + ' ' + firstAppID;
                run(err, message, api);
            }
        });

    }
}

exports.run = run;