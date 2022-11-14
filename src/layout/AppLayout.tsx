import { Box, Grid, GridItem, useColorModeValue } from "@chakra-ui/react";

export enum LayoutType {
  One_ROW = "1ROW",
  Two_ROW = "2ROW",
  Three_ROW = "3ROW",
}

interface AppLayoutProps {
  children: React.ReactNode;
  leftContent?: React.ReactNode;
  layoutType?: LayoutType;
}

export const AppLayout = ({
  children,
  leftContent,
  layoutType = LayoutType.One_ROW,
}: AppLayoutProps) => {
  const bg = useColorModeValue("primary.100", "secondary.200");

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
            gap={4}
          >
            <GridItem
              minWidth={72}
              rounded="xl"
              display={{ base: "none", md: "block" }}
              rowSpan={4}
              colSpan={1}
              p={{
                base: 2,
                md: 4,
              }}
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
          {children}
        </Box>
      );
  }
};

export default AppLayout;
