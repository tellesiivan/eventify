export const SvgrIconListInApp = {
  PersonOutline: "User",
  HelpOutline: "QuestionMark",
  EditOutline: "EditPencil",
  IconCalendarOutline: "CalendarOutline",
  AntDesignCarOutline: "CarOutline",
  UniconsLinkAddOutline: "LinkAddOutline",
  HeroiconsCurrencySignOutline: "CurrencySignOutline",
} as const;

export type SvgrIconList =
  typeof SvgrIconListInApp[keyof typeof SvgrIconListInApp];

export type IconSize = 4 | 5 | 6 | 8 | 10;
