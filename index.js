// Variables
var {Client, RichEmbed} = require("discord.js");
var client = new Client({ disableEveryone: true });
var fs = require("fs");
var commands = {};
var commandsCheck = [];
client.config = {
    prefix: "m",
    token: "NTYyNzA4MTM0ODI1Njg5MTAw.XK5PGg.hRtpOWykN8zSRSIgphdDkHU7rNw"
};
// CommandHandler Setup
fs.readdir("./commands", async (error, files) => {
    if (error) console.error(error);
    files = files.filter(file => file.endsWith(".js"));
    files.forEach(file => {
        file = require("./commands/" + file);
        commands[file.name] = {
            run: file.run
        };
        commandsCheck.push(file.name);
    });
});

// Events
client.on("ready", async () => {
    client.guilds.forEach(guild => {
        try {
            var role = guild.roles.find(role => role.name == "RainbowRole .")
        } catch (error) {
            return;
        }
        var shit = setInterval(() => {
            if (role) {
                role.edit({
                    color: "RANDOM"
                });
                return [];
            }
            clearInterval(shit);
        }, 8000);
    });
})
.on("message", async (message) => {
    if (message.author.bot) return;
    if (!message.channel.type == "text") return;
    var args = message.content.slice(client.config.prefix.length).split(" ");
    var command = args[0];
    if (command) {
        command = commands[command];
        if (commandsCheck.includes(message.content.slice(client.config.prefix.length).split(" ")[0])) {
            command.run(client, message);
        }
    }
});

// Client Login
client.login(client.config.token);
