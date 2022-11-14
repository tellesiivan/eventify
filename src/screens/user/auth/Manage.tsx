import AppLayout from "../../../layout/AppLayout";

import ManageActions from "../../../components/auth/manage/ManageActions";
import ManagaeUserScreenContent from "../../content/ManageUserScreenContent";

import { LayoutType } from "../../../layout/AppLayout";

type UserProfileProps = {};

const ManagePage = (props: UserProfileProps) => {
  return (
    <AppLayout layoutType={LayoutType.Two_ROW} leftContent={<ManageActions />}>
      <ManagaeUserScreenContent />
    </AppLayout>
  );
};

export default ManagePage;
