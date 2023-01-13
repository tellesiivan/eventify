import { baseApiSlice } from "@simplimods/redux/api/baseApi";
import {
  BaseApiRoutes,
  UserLocation,
  UserLocationSearchResult,
  userProfile,
  UserPublicProfile,
} from "@simplimods/types";
import { doc, updateDoc } from "firebase/firestore";

export const locationApi = baseApiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUserLocationByZipcode: build.query<
      UserLocation,
      { baseApiRoute: BaseApiRoutes; country: "us"; zipcode: number }
    >({
      query: ({ baseApiRoute, country, zipcode }) => ({
        url: `${baseApiRoute}${country}/${zipcode}`,
      }),
      transformResponse: (data: Required<UserLocationSearchResult>) => ({
        zipcode: data["post code"],
        country: data.country,
        city: data.places[0]["place name"],
        lat: data.places[0].latitude,
        long: data.places[0].longitude,
        state: data.places[0].state,
        stateAbbreviation: data.places[0]["state abbreviation"],
      }),

      providesTags: ["Location", "Membergraph"],
    }),
    updateUserLocation: build.mutation<
      string,
      {
        userUid: string;
        locationData: UserLocation;
        existingData: UserPublicProfile;
      }
    >({
      async queryFn({ userUid, locationData, existingData }): Promise<any> {
        let data: string = "";
        const userProfileRef = doc(
          userProfile,
          `/${userUid}/profile/${userUid}`
        );

        try {
          await updateDoc(userProfileRef, {
            public: {
              ...existingData,
              location: locationData,
            },
          });
          data = "success";

          return {
            data,
          };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["Location", "Membergraph"],
    }),
  }),
  overrideExisting: false,
});
export const {
  useGetUserLocationByZipcodeQuery,
  useLazyGetUserLocationByZipcodeQuery,
  useUpdateUserLocationMutation,
} = locationApi;
