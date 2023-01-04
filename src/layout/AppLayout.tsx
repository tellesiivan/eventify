import React from "react";

import { Box, Grid, GridItem } from "@chakra-ui/react";
import { ShareDrawer } from "@simplimods/components";
import { Breadcrumps, LeftContentNavigation } from "@simplimods/layout";
import {
  ManageUserIsMobileDrawerOpen,
  setManageUserIsMobileDrawerOpen,
  useAppDispatch,
  useAppSelector,
} from "@simplimods/redux";
import { ThemeColorModeComponents } from "@simplimods/theme";
import { IsMobileView } from "@simplimods/utils";
import { useNavigate } from "react-router-dom";

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
  breadcrumbs?: {
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
 * @param breadcrumbs An array that will require to pass a label and a link for each item
 * @interface AppLayoutProps
 */
export const AppLayout = ({
  children,
  leftContent,
  layoutType = LayoutType.One_ROW,
  breadcrumbs,
  username,
}: AppLayoutProps) => {
  const isMobile = IsMobileView();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleUserProfileNavigation = () => navigate(`/${username}`);
  const isNavigationModalOpen = useAppSelector(ManageUserIsMobileDrawerOpen);

  switch (layoutType) {
    case LayoutType.Two_ROW:
      return (
        <React.Fragment>
          <Grid minH="100vh" width="full">
            <GridItem
              position="fixed"
              left={0}
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
              ml={{ base: 0, md: 72 }}
              colSpan={{ base: 5 }}
              height="full"
              position="relative"
              pb={16}
            >
              {breadcrumbs && <Breadcrumps breadcrumps={breadcrumbs} />}
              {children}
              {username !== undefined && (
                <LeftContentNavigation
                  onClickAction={
                    isMobile
                      ? () => dispatch(setManageUserIsMobileDrawerOpen(true))
                      : handleUserProfileNavigation
                  }
                  label={isMobile ? "Dashboard Menu" : "View Public Profile"}
                />
              )}
            </GridItem>
          </Grid>
          {leftContent && isMobile && (
            <ShareDrawer
              size="xs"
              isFullHeight={false}
              placement={"bottom"}
              isOpen={isNavigationModalOpen}
              onClose={() => dispatch(setManageUserIsMobileDrawerOpen(false))}
              title={"Dashboard Menu"}
            >
              {leftContent}
            </ShareDrawer>
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
          {breadcrumbs && <Breadcrumps breadcrumps={breadcrumbs} />}
          {children}
        </Box>
      );
  }
};

export default AppLayout;
