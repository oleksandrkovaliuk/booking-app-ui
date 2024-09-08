import { ApiTags } from "./enums";

export const ApiUrls = {
  getUser: "/user/get",
  auth_acces_user: "/auth/accessUser",
  auth_oauth_user: "auth/oauthUser",
  check_auth_type: "/auth/checkAuthType",

  getListings: "/listings/listings",
  getUserListings: "/listings/get/users",
  getCurrentListing: "/listings/get/current",
  getVerifiedListings: "/listings/verified",
  getListingsCategories: "/listings/categories",
  getListingsTypeOfPlace: "/listings/typeofplace",

  requestListingSearch: "/listings/request/search",
  requestUpdateListing: "/listings/request/update",
  requestDeleteListing: "/listings/listing/delete",
  requestCreateListing: "/listings/listing/create",
  requestUpdateCalendar: "/listings/calendar/update",
  requestDeleteUserListingImages: "/listings/images/delete",
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
];
