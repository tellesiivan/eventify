import React from "react";

import { Box, Grid, GridItem, useColorModeValue } from "@chakra-ui/react";
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
  const bg = useColorModeValue("primary.500", "secondary.600");

  switch (layoutType) {
    case LayoutType.Two_ROW:
      return (
        <Box
          mt={2}
          p={{
            base: 2,
            md: 4,
          }}
        >
          <Grid
            minH="100vh"
            width="full"
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(5, 1fr)"
            gap={2}
          >
            <GridItem
              minWidth={72}
              rounded="xl"
              display={{ base: "none", md: "block" }}
              rowSpan={4}
              m={0}
              colSpan={1}
              bg={bg}
              height="full"
            >
              {leftContent}
            </GridItem>
            <GridItem
              rowSpan={4}
              colSpan={{ base: 5, md: 4 }}
              bg={bg}
              height="full"
              p={{
                base: 2,
                md: 4,
              }}
              rounded="xl"
            >
              {breadcrumps && <Breadcrumps breadcrumps={breadcrumps} />}

              {children}
            </GridItem>
          </Grid>
        </Box>
      );

    default:
      return (
        <Box
          mt={2}
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
