import { Guild, GuildMember, User } from "discord.js";
import { APIInteractionGuildMember } from 'discord-api-types/v9';
import Permission from "./Permission";
import RoleService from './RoleService';


export interface IEvent<T> {
    readonly event: T,
    readonly member: GuildMember | APIInteractionGuildMember,
    readonly guild: Guild,
    readonly when: number
}


export default class Event<T> implements IEvent<T> {
    public readonly event: T;
    public readonly member: GuildMember | APIInteractionGuildMember;
    public readonly guild: Guild;
    /**
     * Unix timestamp about when the message arrived to the application.
     */
    public readonly when: number;


    public async fetchMember(user: User) {
        try {
            let member = await this.guild.members.fetch(user);
            return member;
        } catch(e) {
            return null;
        }
    }

    public async hasPermission(permission: Permission) {
        let has = await RoleService.hasPermission(this.member, permission, this.guild);
        return has;
    }

    public async getWeight() {
        let weight = await RoleService.getWeight(this.member, this.guild);
        return weight;
    }

    constructor({ event, member, guild, when }: IEvent<T>) {
        this.event = event;
        this.member = member;
        this.guild = guild;
        this.when = when;
    }
}