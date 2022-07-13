import { config } from './config';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import commands from './src/structures/commands';
import fs from 'node:fs';
import { Log } from './src/utils/Log';


const rest = new REST({ version: '9' }).setToken(config.apiToken);
const deployLog = new Log('Deploy');

(async () => {
    try {
        deployLog.info('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(config.clientId, config.guildId),
            { body: commands.map(command => command.toJSON()) },
        );

        deployLog.success('Successfully reloaded application (/) commands.');
    } catch (error) {
        deployLog.error(error);
    }
})();
    