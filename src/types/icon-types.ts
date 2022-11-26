export const SvgrIconListInApp = {
  PersonOutline: "User",
  HelpOutline: "QuestionMark",
  EditOutline: "EditPencil",
  IconCalendarOutline: "CalendarOutline",
  AntDesignCarOutline: "CarOutline",
  UniconsLinkAddOutline: "LinkAddOutline",
} as const;

export type SvgrIconList =
  typeof SvgrIconListInApp[keyof typeof SvgrIconListInApp];

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
