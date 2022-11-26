import { Icon as ChakraIcon } from "@chakra-ui/react";
import React from "react";
import {
  CarOutline,
  CurrencySignOutline,
  EditOutline,
  HelpOutline,
  IconCalendarOutline,
  LinkAddOutline,
  User,
} from "../../assets";

import { IconSize, SvgrIconList } from "../../types";

interface IconProps {
  iconName: SvgrIconList;
  size?: IconSize;
}

export const Icon = ({ iconName, size }: IconProps) => {
  const IconSelection = (iconName: SvgrIconList): any => {
    switch (iconName) {
      case "User":
        return User;
      case "QuestionMark":
        return HelpOutline;
      case "EditPencil":
        return EditOutline;
      case "CalendarOutline":
        return IconCalendarOutline;
      case "CarOutline":
        return CarOutline;
      case "LinkAddOutline":
        return LinkAddOutline;
      case "CurrencySignOutline":
        return CurrencySignOutline;
      default:
        return HelpOutline;
    }
  };

  return (
    <ChakraIcon as={IconSelection(iconName)} w={size ?? 5} h={size ?? 5} />
  );
};

export default Icon;
