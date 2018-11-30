const fs = require('fs');
exports.run = async (bot, message, args, ops) => {
    let teste = [];
    fs.readdir("./commands/", (err, files) => {
        if (err) console.error(err);

        let jsfiles = files.filter(f => f.split(".").pop() === "js");
        if (jsfiles.length <= 0) {
            console.log("No commands to load!");
        }
        jsfiles.forEach((f, i) => {
            let props = require(`./${f}`);
            teste.push(props);
        });
        let commands = '';
        for (i in teste) {
            commands += `**${teste[i].help.name}**: ${teste[i].help.usage}\n`;
                        
        }
            message.channel.send({embed: { color: 0x3b88c3, title: 'Help', description: commands }})
    });
    
}
exports.help = {
    name: 'help',
    desc: 'show all commands',
    usage: '?help'
}