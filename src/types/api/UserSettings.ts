export type UserContactInformation = {
  email: string | null;
  phoneNumber: string | null;
};

export interface UserSettings {
  accountType: "user" | "business" | "service" | null;
  accountVerified: boolean;
  canCreateEvents: boolean;
  hasPin: boolean;
  isBusiness: boolean;
}

export interface UserSettingsWithIdRefGraph extends UserSettings {
  internalId: string | null;
}
