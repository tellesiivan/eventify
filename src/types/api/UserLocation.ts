export type UserLocationPreferences = {
  showCityAndState: boolean;
  persistLocationInApp: boolean;
};

export interface UserLocationSearchResult {
  country: string;
  "country abbreviation": string;
  "post code": string;
  places: UserLocationByZipcode[];
}

export interface UserLocationByZipcode {
  latitude: string;
  longitude: string;
  "place name": string;
  state: string;
  "state abbreviation": string;
}

export interface UserLocation {
  lat: string | null;
  long: string | null;
  zipcode: string | null;
  city?: string;
  state?: string;
  country?: string;
  stateAbbreviation?: string;
}
