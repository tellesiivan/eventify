import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SettingsAndPreferences} from "@simplimods/types";
import {RootState, settingsApi} from "@simplimods/redux";

// types
const initialState: SettingsAndPreferences = {
  settings: {
    accountType: null,
    hasPin: false,
    accountVerified: false,
    isBusiness: false,
    canCreateEvents: false,
    internalId: null,
    defaultToMobileLinkView: false,
  },
};

export const settingsAndPreferencesSlice = createSlice({
  name: "settingsAndPreferences",
  initialState,
  reducers: {
    updateSettingsAccountType: (
      state,
      action: PayloadAction<"user" | "business" | "service">
    ) => {
      state.settings.accountType = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      settingsApi.endpoints.getUserSettings.matchFulfilled,
      (state, action) => {
        state.settings = action.payload;
      }
    );
  },
});

export const { updateSettingsAccountType } =
  settingsAndPreferencesSlice.actions;

// selectors = /** ===== settings =====  */
export const selectSettingsAccountType = (state: RootState) =>
  state.settingsAndPreferences.settings.accountType;

export default settingsAndPreferencesSlice.reducer;
