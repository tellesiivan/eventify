import { CombinedProfileCategories } from "@simplimods/types";

export interface MemberProfileCategoryInterestTag {
  name: CombinedProfileCategories;
  status: "active" | "inactive";
}
