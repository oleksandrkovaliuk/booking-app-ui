import { ApiTags } from "./enums";

export const ApiUrls = {
  getUser: "/user/get",
  auth_oauth_user: "auth/oauthUser",
  auth_acces_user: "auth/accessUser",
  check_auth_type: "/auth/checkAuthType",

  getUserListings: "/listings/get/users",
  getCurrentListing: "/listings/get/current",
  getListingsCategories: "/listings/categories",
  getListingsTypeOfPlace: "/listings/typeofplace",
  getVerifiedListingByParams: "/listings/verified/by/params",

  requestListingSearch: "/listings/request/search",
  requestUpdateListing: "/listings/request/update",
  requestDeleteListing: "/listings/listing/delete",
  requestCreateListing: "/listings/listing/create",
  requestUpdateCalendar: "/listings/calendar/update",
  requestDeleteUserListingImages: "/listings/images/delete",
  requestAvailableCategories: "/listings/request/available/categories",
  requestDeleteIndividualListingImage: "/listings/images/delete/individual",

  uploadListingImages: "/listings/images/upload",
};

export const ApiTagsTypes = [
  ApiTags.LISTING_CATEGORIES,
  ApiTags.LISTING_TYPE_OF_PLACE,
  ApiTags.USER,
  ApiTags.CURRENT_USER,
  ApiTags.CURRENT_LISTING,
  ApiTags.VERIFIED_LISTINGS,
  ApiTags.LISTING,
  ApiTags.USER_LISTINGS,
  ApiTags.VERIFIED_LISTINGS_BY_PARAMS,
];
