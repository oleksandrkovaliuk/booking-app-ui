export const apiUrls = {
  getUser: "/user/get",
  auth_acces_user: "/auth/accessUser",
  auth_oauth_user: "/auth/oauthUser",
  check_auth_type: "/auth/checkAuthType",

  getListings: "/listings/listings",
  getUserListings: "/listings/get/user",
  getCurrentListing: "/listings/get/current",
  getVerifiedListings: "/listings/verified",
  getListingsCategories: "/listings/categories",
  getListingsTypeOfPlace: "/listings/typeofplace",
  requestToDeleteListing: "/listings/deleteListing",
};

export const ApiTagsTypes = [
  "LISTING_CATEGORIES",
  "LISTING_TYPE_OF_PLACE",
  "USER",
  "CURRENT_USER",
  "VERIFIED_LISTINGS",
  "LISTING",
  "USER_LISTINGS",
];
