const { Client, GatewayIntentBits, Partials } = require('discord.js');
require('dotenv').config();  // Charge les variables depuis .env

// Crée le client Discord
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages
    ],
    partials: [Partials.Channel]
});

// ID du rôle à surveiller
const ROLE_ID = '1361030506925265083';  // Remplace par ton ID si besoin

client.once('ready', () => {
    console.log(`✅ Connecté en tant que ${client.user.tag}`);
});

client.on('guildMemberUpdate', async (oldMember, newMember) => {
    const hadRole = oldMember.roles.cache.has(ROLE_ID);
    const hasRole = newMember.roles.cache.has(ROLE_ID);

    if (!hadRole && hasRole) {
        try {
            await newMember.send(
                `Yo ${newMember.user.username} 💪 Bienvenue dans le GRIND !\nIci, on aide les gars à transformer leur physique.\nRéserve ton appel coaching ici : https://calendly.com/fabienchv/chad-ultime-beta-test 🚀`
            );
            console.log(`💬 Message envoyé à ${newMember.user.tag}`);
        } catch (error) {
            console.error(`❌ Impossible d'envoyer un DM à ${newMember.user.tag}:`, error);
        }
    }
});

// Démarre le bot avec le token d'environnement
client.login(process.env.TOKEN);
