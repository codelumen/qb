import EmojiService from '../EmojiService';


export function stateEmoji(indicator: number, reversive?: boolean) {
    if (indicator < 0) indicator = 0;
    if (indicator > 1) indicator = 1;
    if (reversive) indicator = 1 - indicator;
    if (indicator < 0.33) return EmojiService.get('botnegative');
    if (indicator < 0.66) return EmojiService.get('botmoderate');
    return EmojiService.get('botpositive');
}