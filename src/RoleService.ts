import { Guild, GuildMember } from "discord.js";
import { APIInteractionGuildMember } from 'discord-api-types/v9';
import Role from "./Role";
import member from "./structures/roles/member";


export default class RoleService {
    static list: Role[] = [
        member
    ];

    static getOwned(member: GuildMember | APIInteractionGuildMember, guild?: Guild) {
        let listedRolesNames = RoleService.list.map(r => r.name);

        let memberRoles;
        if (member instanceof GuildMember) {
            memberRoles = Array.from(member.roles.cache).map(role => role[1]);
        } else {
            memberRoles = member.roles.map(name => guild.roles.cache.find(r => r.id === name));
        }

        let ownedRolesNames = memberRoles
            .filter(role => listedRolesNames.includes(role.name))
            .map(role => role.name);

        return RoleService.list.filter(role => ownedRolesNames.includes(role.name));
    }

    static async getWeight(member: GuildMember | APIInteractionGuildMember, guild?: Guild) {
        let owned = RoleService.getOwned(member, guild);
        return owned.sort((a, b) => b.weight - a.weight)[0].weight;
    }

    static async hasPermission(member: GuildMember | APIInteractionGuildMember, id: string, guild?: Guild) {
        if (member instanceof GuildMember) {
            if (member.permissions.has('ADMINISTRATOR')) return true;
        } else {
            let memberInterface = await guild.members.fetch(member.user.id);
            if (memberInterface.permissions.has('ADMINISTRATOR')) return true;
        }
        
        let ownedRoles = RoleService.getOwned(member, guild);
        console.log(ownedRoles);
        return ownedRoles.some(role => role.hasPermission(id));
    }
}