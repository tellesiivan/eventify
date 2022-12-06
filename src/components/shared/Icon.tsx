import { Icon as ChakraIcon } from "@chakra-ui/react";
import React from "react";

import type { IconProps as ChakraIconProps } from "@chakra-ui/react";
import {
  CarOutline,
  CurrencySignOutline,
  EditOutline,
  HelpOutline,
  IconCalendarOutline,
  LightbulbFilled,
  LightbulbOutline,
  LinkAddOutline,
  User,
} from "@simplimods/assets";
import { IconSize, SvgrIconList } from "@simplimods/types";

interface IconProps extends ChakraIconProps {
  iconName: SvgrIconList;
  size?: IconSize;
}

export const Icon = (props: IconProps) => {
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
      case "LightbulbOutline":
        return LightbulbOutline;
      case "LightbulbFilled":
        return LightbulbFilled;
      default:
        return HelpOutline;
    }
  };

  return (
    <ChakraIcon
      as={IconSelection(props.iconName)}
      w={props.size ?? 5}
      h={props.size ?? 5}
      {...props}
    />
  );
};

export default Icon;
