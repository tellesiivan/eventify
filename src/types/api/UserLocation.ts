export type UserLocationPreferences = {
  showCityAndState: boolean;
  persistLocationInApp: boolean;
};

export interface UserLocation {
  lat: number | null;
  long: number | null;
  zipcode: string | null;
  city?: string;
  state?: string;
  country?: string;
}
