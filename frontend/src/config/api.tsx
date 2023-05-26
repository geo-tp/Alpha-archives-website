// export const API_URL = "https://archive.thealphaproject.eu/api/v1";
export const API_URL = "http://localhost:8000/api/v1";

export const FILE_ROUTE = "/files/";
export const AUTH_ROUTE = "/auth/";
export const USER_ROUTE = "/user/";
export const TAG_ROUTE = "/tags/";
export const APPLIED_TAG_ROUTE = "/applied-tags/";

export const RANDOM_SCREENSHOT_ROUTE = FILE_ROUTE + "random/";
export const UPLOAD_STATUS_ROUTE = FILE_ROUTE + "upload_status/";
export const LOGIN_ROUTE = AUTH_ROUTE + "login";
export const LOGOUT_ROUTE = AUTH_ROUTE + "logout";
export const UPDATE_PASSWORD = USER_ROUTE + "password";
export const USER_PROFILE = USER_ROUTE + "profile";
export const GENERATE_ACCOUNT = AUTH_ROUTE + "generate-account";
export const SEARCH_BY_TAGS = FILE_ROUTE + "search_by_tags/";
