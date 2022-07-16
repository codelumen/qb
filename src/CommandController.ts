import { CacheType, CommandInteraction } from 'discord.js';
import { Controller, Endpoint } from './Controller';
import Embed from './Embed';
import Permission from './Permission';
import ReplyableEvent from './ReplyableEvent';
import RoleService from './RoleService';


@Endpoint
export class CommandController extends Controller<ReplyableEvent<CommandInteraction<CacheType>>> {
    public readonly name: string;
    public readonly perm: Permission;

    public async validation(interaction: ReplyableEvent<CommandInteraction<CacheType>>): Promise<boolean> {
        return interaction.event.commandName === this.name;
    }

    public async permission(interaction: ReplyableEvent<CommandInteraction<CacheType>>): Promise<boolean> {
        if (this.perm) {
            let has = await interaction.hasPermission(this.perm);
            return has;
        }
        return true;
    }

    public async denied(interaction: ReplyableEvent<CommandInteraction<CacheType>>) {
        await interaction.reply(Embed.fail(`Недостаточно прав для использования данной команды. (${this.perm.id})`, null, true));
    }
}