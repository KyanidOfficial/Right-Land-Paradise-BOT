require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder, ActivityType } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on('ready', (c) => {
    console.log(` nb${c.user.tag} is online!`);

    client.user.setActivity({
        name: "Waiting for announcements.",
        type: ActivityType.Custom
    });
});

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        interaction.reply('Pong!');

    }  
    if (interaction.commandName === 'embed') {
        const title = interaction.options.get('title')?.value;
        const color = interaction.options.get('color')?.value;
        const description = interaction.options.get('description')?.value;
        const image = interaction.options.get('image')?.value;
        const embed = new EmbedBuilder()
        .setTitle(`${title}`)
        .setDescription(`${description}`)
        .setColor(`${color}`)
        .setAuthor(
            {
                name: 'RLP - Admin Team',
                iconURL: 'https://cdn.discordapp.com/attachments/964538619354284052/1197192634595287081/favicon.png?ex=65ba5f86&is=65a7ea86&hm=72c2f8a889eb9739f655ff923e3e7f1e421e5f6fa8a3a706d291b29676fb3842&',
            }
        )


        interaction.reply({ embeds: [embed] });
    }
});

client.login(process.env.TOKEN);