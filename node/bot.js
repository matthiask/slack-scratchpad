var Botkit = require('botkit');
var controller = Botkit.slackbot();

controller.spawn({
  token: process.env.SLACK_BOT_TOKEN,
}).startRTM(function (err, bot, payload) {
  if (!err) return;

  console.log(err);
  throw new Error('Unable to connect to Slack');
});

controller.hears(
  ['hey'],
  ['ambient'],
  function (bot, message) {
    bot.api.users.info(
      {user: message.user},
      function(error, response) {
        console.log(response.user);
        bot.reply(message, '@' + response.user.name + ' hey!');
      }
    );
    // console.log(info);
    // bot.reply(message, 'Hey ' + message.user);
  }
);

controller.hears(
  ['.*'],
  ['direct_message', 'direct_mention'],
  function (bot, message) {
    console.log(message);
    if (/how.*you/im.test(message.text)) {
      bot.reply(message, 'Well enough, thank you very much!');
    } else {
      bot.reply(message, 'I\'m sorry, I did not understand.');
    }
  }
);
