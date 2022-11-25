import React from "react";

import { Box, Grid, GridItem } from "@chakra-ui/react";
import ThemeColorModeComponents from "../theme/ThemeColorModeComponents";
import Breadcrumps from "./Breadcrumps";

export enum LayoutType {
  One_ROW = "1ROW",
  Two_ROW = "2ROW",
  Three_ROW = "3ROW",
}

interface AppLayoutProps {
  children: React.ReactNode;
  leftContent?: React.ReactNode;
  layoutType?: LayoutType;
  breadcrumps?: {
    label: string;
    link: string;
  }[];
}

export const AppLayout = ({
  children,
  leftContent,
  layoutType = LayoutType.One_ROW,
  breadcrumps,
}: AppLayoutProps) => {
  switch (layoutType) {
    case LayoutType.Two_ROW:
      return (
        <Box>
          <Grid
            minH="100vh"
            width="full"
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(5, 1fr)"
          >
            <GridItem
              borderRight="1px"
              borderColor={ThemeColorModeComponents("borderColor")}
              minWidth={72}
              display={{ base: "none", md: "block" }}
              rowSpan={4}
              colSpan={1}
              height="full"
            >
              {leftContent}
            </GridItem>
            <GridItem rowSpan={4} colSpan={{ base: 5, md: 4 }} height="full">
              {breadcrumps && <Breadcrumps breadcrumps={breadcrumps} />}

              {children}
            </GridItem>
          </Grid>
        </Box>
      );

    default:
      return (
        <Box
          p={{
            base: 2,
            md: 4,
          }}
        >
          {breadcrumps && <Breadcrumps breadcrumps={breadcrumps} />}
          {children}
        </Box>
      );
  }
};

export default AppLayout;
