import React, { useEffect } from "react";

import { Box, Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import { Modal } from "@simplimods/components";
import { Breadcrumps, LeftContentNavigation } from "@simplimods/layout";
import { ThemeColorModeComponents } from "@simplimods/theme";
import { IsMobileView } from "@simplimods/utils";
import { useLocation, useNavigate } from "react-router-dom";

export enum LayoutType {
  One_ROW = "1ROW",
  Two_ROW = "2ROW",
  Three_ROW = "3ROW",
}

interface AppLayoutProps {
  children: React.ReactNode;
  leftContent?: React.ReactNode;
  layoutType?: LayoutType;
  username?: string;
  breadcrumps?: {
    label: string;
    link: string;
  }[];
}

/**
 * Standard Layout, with optional LayoutTypes
 * @variation One_ROW : The children passed will be the entire section, full width
 * @variation Two_ROW : Will take children and use that component on the right section, while other section will be leftContent component: Think side nav dashboard
 * @variation Three_ROW : Will take two side components (leftContent | rightContent) => and the children wrapped will be displayed center
 * @param LayoutTypes Layout variation
 * @param breadcrumps An array that will required to pass a label and a link for each item
 * @interface AppLayoutProps
 */
export const AppLayout = ({
  children,
  leftContent,
  layoutType = LayoutType.One_ROW,
  breadcrumps,
  username,
}: AppLayoutProps) => {
  const isMobile = !!IsMobileView();
  const navigate = useNavigate();
  const modalHanler = useDisclosure();
  const location = useLocation();
  const { hash: UrLHash } = location;

  const handleUserProfileNavigation = () => navigate(`/${username}`);

  useEffect(() => {
    modalHanler.onClose();
  }, [location, modalHanler]);

  switch (layoutType) {
    case LayoutType.Two_ROW:
      return (
        <React.Fragment>
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
            <GridItem
              rowSpan={4}
              colSpan={{ base: 5, md: 4 }}
              height="full"
              position="relative"
            >
              {breadcrumps && <Breadcrumps breadcrumps={breadcrumps} />}
              {children}
              {username !== undefined && (
                <LeftContentNavigation
                  onClickAction={
                    isMobile
                      ? () => modalHanler.onOpen()
                      : handleUserProfileNavigation
                  }
                  label={isMobile ? "Dashboard Menu" : "View Public Profile"}
                />
              )}
            </GridItem>
          </Grid>
          {leftContent && (
            <Modal
              size="sm"
              isOpen={modalHanler.isOpen}
              onClose={modalHanler.onClose}
              title={"Dashboard Menu"}
            >
              {leftContent}
            </Modal>
          )}
        </React.Fragment>
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
