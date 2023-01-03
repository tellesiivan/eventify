export enum SocialMediaApps {
    INSTAGRAM = 'Instagram',
    FACEBOOK = 'Facebook',
    TWITTER = 'Twitter',
    TIKTOK = 'Tiktok',
    Web = 'Website',

}

export interface SocialMediaLinks {
    url: string;
    username?: string;
    type: SocialMediaApps
}