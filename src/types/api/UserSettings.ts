export type UserContactInformation = {
    email: string,
    phoneNumber: string,
}

export interface UserSettings {
    accountType: 'user' | 'business' | 'service',
    accountVerified:boolean,
    canCreateEvents:boolean,
    hasPin:boolean;
    initialTheme:"dark" | "light",
    isBusiness:boolean;
}