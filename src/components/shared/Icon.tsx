import { Icon as ChakraIcon } from "@chakra-ui/react";
import React from "react";
import {
  CarOutline,
  EditOutline,
  HelpOutline,
  IconCalendarOutline,
  LinkAddOutline,
  User,
} from "../../assets";

import { SvgrIconList } from "../../types";

interface IconProps {
  iconName: SvgrIconList;
}

export const Icon = ({ iconName }: IconProps) => {
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
      default:
        return HelpOutline;
    }
  };

  return <ChakraIcon as={IconSelection(iconName)} />;
};

export default Icon;
