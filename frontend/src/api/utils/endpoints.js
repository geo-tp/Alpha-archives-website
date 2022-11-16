export const API_BASE = "api/v1/";

export const API_MODEL_FILES = "files";
export const API_MODEL_TAGS = "tags";
export const API_MODEL_APPLIED_TAGS = "applied-tags";
export const API_MODEL_AUTH = "auth";
export const API_MODEL_USER = "user";

export const API_UPLOAD_STATUS = API_BASE + API_MODEL_FILES + "/upload_status";
export const API_TAGS = API_BASE + API_MODEL_TAGS;
export const API_APPLIED_TAGS = API_BASE + API_MODEL_APPLIED_TAGS;
export const API_FILES = API_BASE + API_MODEL_FILES;
export const API_FILES_UPLOAD = API_BASE + API_MODEL_FILES + "/";
export const API_RANDOM_SCREENSHOT = API_FILES + "/random";
export const API_FILES_BY_TAGS = API_FILES + "/search_by_tags/";
export const API_LOGIN = API_BASE + API_MODEL_AUTH + "/login";
export const API_LOGOUT = API_BASE + API_MODEL_AUTH + "/logout";
export const API_PASSWORD_FORGET =
  API_BASE + API_MODEL_AUTH + "/password-forget";
export const API_INVITATION = API_BASE + API_MODEL_AUTH + "/invitation";
export const API_PASSWORD_UPDATE = API_BASE + API_MODEL_USER + "/password";
export const API_PASSWORD_RESET =
  API_BASE + API_MODEL_AUTH + "/password-reset/";
export const API_PROFILE = API_BASE + API_MODEL_USER + "/profile";
export const API_ACCOUNT_GENERATION =
  API_BASE + API_MODEL_AUTH + "/generate-account";
