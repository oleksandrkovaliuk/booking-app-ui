import { ApiTags } from "./enums";

export const ApiUrlsListings = {
  getUserListings: "/listings/get/users",
  getCurrentListing: "/listings/get/current",
  getListingsCategories: "/listings/categories",
  getListingsTypeOfPlace: "/listings/typeofplace",
  getVerifiedListingByParams: "/listings/searched/by/params",
  getFullListOfListingCategories: "/listings/categories/all",

  requestUpdateListing: "/listings/request/update",
  requestDeleteListing: "/listings/listing/delete",
  requestCreateListing: "/listings/listing/create",
  requestUpdateCalendar: "/listings/calendar/update",
  requestSetRangeOfDisabledDates:
    "/listings/calendar/set/range/of/disabledDates",
  requestDeleteUserListingImages: "/listings/images/delete",
  requestAvailableCategories: "/listings/request/available/categories",
  requestDeleteIndividualListingImage: "/listings/images/delete/individual",

  uploadListingImages: "/listings/images/upload",
};

export const ApiUrlsAuth = {
  getUser: "/user/get",
  auth_oauth_user: "auth/oauthUser",
  auth_acces_user: "auth/accessUser",
  check_auth_type: "/auth/checkAuthType",

  update_tokens_blacklist: "/auth/update/tokens/blacklist",
};

export const ApiUrlsUser = {
  updateUserReservations: "/user/update/reservations",
  updateAllUserNotifications: "/user/update/all/notifications",
  updateUserSearchRegionHistory: "/user/update/search/region/history",

  getUserNotifications: "/user/extract/notifications",
  getUserSearchRegionHistory: "/user/get/search/region/history",
};

export const ApiUrlsPayment = {
  getClientSecret: "/payment/get/clientSecret",
};

export const ApiUrlsChats = {
  getUsersChats: "/chats/get/users",
  getCurrentChat: "/chats/get/current",
};

export const ApiTagsTypes = [
  ApiTags.USER,
  ApiTags.CURRENT_USER,
  ApiTags.USER_LISTINGS,
  ApiTags.FULL_CATEGORIES_LIST,

  ApiTags.USER_SEARCH_REGION_HISTORY,

  ApiTags.LISTING,
  ApiTags.CURRENT_LISTING,
  ApiTags.VERIFIED_LISTINGS,
  ApiTags.LISTING_CATEGORIES,
  ApiTags.LISTING_TYPE_OF_PLACE,
  ApiTags.VERIFIED_LISTINGS_BY_PARAMS,

  ApiTags.USER_CHATS,
  ApiTags.CURRENT_CHAT,
  ApiTags.USER_NOTIFICATIONS,
];
