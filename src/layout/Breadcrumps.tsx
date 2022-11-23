import React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useColorModeValue,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

interface BreadcrumpsProps {
  breadcrumps: {
    label: string;
    link: string;
  }[];
}

export const Breadcrumps = ({ breadcrumps }: BreadcrumpsProps) => {
  const routeLocation = useLocation();
  const inActiveTextColor = useColorModeValue("secondary.50", "secondary.50");
  const activeTextColor = useColorModeValue("secondary.600", "primary.400");

  const getTextColor = (route: string) =>
    routeLocation.pathname === route ? activeTextColor : inActiveTextColor;

  return (
    <Breadcrumb mt={1} mb={3}>
      {breadcrumps.map((breadcrumps) => (
        <BreadcrumbItem
          fontSize="sm"
          textColor={getTextColor(breadcrumps.link)}
          isCurrentPage={routeLocation.pathname === breadcrumps.link}
        >
          <BreadcrumbLink href={breadcrumps.link}>
            {breadcrumps.label}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

export default Breadcrumps;
