import { Box } from "@chakra-ui/react";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
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
};

export default AppLayout;
