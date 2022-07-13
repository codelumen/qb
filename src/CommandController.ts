import { CacheType, CommandInteraction } from 'discord.js';
import { Controller, Endpoint } from './Controller';
import Permission from './Permission';
import RoleService from './RoleService';
import { failMessage } from './utils/messageWrapper';


@Endpoint
export class CommandController extends Controller<CommandInteraction<CacheType>> {
    public name: string;
    public perm: Permission;

    public async validation(interaction: CommandInteraction<CacheType>): Promise<boolean> {
        return interaction.commandName === this.name;
    }

    public async permission(interaction: CommandInteraction<CacheType>): Promise<boolean> {
        let has = await RoleService.hasPermission(interaction.member, this.perm.id, interaction.guild);
        return has;
    }

    public async denied(interaction: CommandInteraction<CacheType>) {
        await interaction.reply(failMessage(`Недостаточно прав для использования данной команды. (${this.perm.id})`, null, true));
    }
}