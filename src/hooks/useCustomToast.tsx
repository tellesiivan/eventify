import React from "react";
import type { UseToastOptions } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { CustomToastCard } from "@simplimods/components";
import { ThemeColorModeComponents } from "@simplimods/theme";

interface DefaultToastSettings {
  position?:
    | "top"
    | "top-right"
    | "top-left"
    | "bottom"
    | "bottom-right"
    | "bottom-left";
}

/**
 * A custom toast hook that returns a specific toast variant option, handling styling and functionality
 * @return errorToast | successToast | neutralToast
 * @param position : Defaults to "bottom-right"
 * @description Each toast item requires a {{ Title }} + {{ Description }} is Optional
 */
export const useCustomToast = ({
  position = "bottom-right",
}: DefaultToastSettings) => {
  const toast = useToast();

  // Bg color + color declaration
  const neutralBg = ThemeColorModeComponents("accentThemeBgDos");

  const commonToastSettings: UseToastOptions = {
    duration: 5000,
    isClosable: true,
    position,
  };

  const errorToast = (title: string, description?: string) => {
    return toast({
      render: () => (
        <CustomToastCard
          title={title}
          description={description}
          type={"error"}
        />
      ),
      ...commonToastSettings,
    });
  };

  const successToast = (title: string, description?: string) => {
    return toast({
      render: () => (
        <CustomToastCard
          title={title}
          description={description}
          type={"success"}
        />
      ),
      ...commonToastSettings,
    });
  };

  const neutralToast = (title: string, description?: string) => {
    return toast({
      render: () => (
        <CustomToastCard
          title={title}
          description={description}
          type={"neutral"}
        />
      ),
      ...commonToastSettings,
    });
  };

  return { neutralToast, successToast, errorToast };
};
