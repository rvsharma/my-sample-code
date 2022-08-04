const ENV = process.env.REACT_APP_ENVIRONMENT;

const VER = process.env.REACT_APP_API_VERSION;

export const LOGIN_ENDPOINT = `/mch-admin-${ENV}/${VER}/login`;

// Content

export const FETCH_CONTENT_DATA = `/mch-admin-${ENV}/${VER}/fetch`;
export const CREATE_CONTENT_DATA = `/mch-admin-${ENV}/${VER}/create`;
export const UPDATE_CONTENT_DATA = `/mch-admin-${ENV}/${VER}/update`;
export const DELETE_CONTENT_DATA = `/mch-admin-${ENV}/${VER}/delete`;
export const FETCH_CONTENT_DATA_COUNT = `/mch-admin-${ENV}/${VER}/count`;

// config filters
export const FETCH_CONFIG_FILTERS = `/mch-admin-${ENV}/${VER}/config-filters`;

// Users
// export const FETCH_USERS_DATA_COUNT = `/mch-admin-${ENV}/${VER}/fetch-users`;
export const FETCH_USERS_DATA = `/mch-admin-${ENV}/${VER}/fetch-users`;
export const UPDATE_USER_DATA = `/mch-admin-${ENV}/${VER}/update-users`;
export const USER_FORGOT_PASSWORD = `/mch-admin-${ENV}/${VER}/forgot-password`;
export const USER_MFA_FACTOR_RESET = `/mch-admin-${ENV}/${VER}/user-mfa-factor-reset`;
export const USER_RECOVER_USERNAME = `/mch-admin-${ENV}/${VER}/recover-username`;
// Config

export const FETCH_CONFIG = `/mch-admin-${ENV}/${VER}/fetch-configs`;
export const FETCH_CONFIG_DATA_COUNT = `/mch-admin-${ENV}/${VER}/fetch-configs`;
export const FETCH_MEMBER_CONFIG_DATA_COUNT = `/mch-admin-${ENV}/${VER}/count`;
export const FETCH_CONFIG_DETAIL = `/mch-admin-${ENV}/${VER}/fetch-config-data`;
export const CREATE_CONFIG = `/mch-admin-${ENV}/${VER}/CreateConfig`;
export const UPDATE_CONFIG = `/mch-admin-${ENV}/${VER}/update-config`;
export const PROMOTE_CONFIG = `/mch-admin-${ENV}/${VER}/promote-configs`;
export const AFFECTED_COUNT = `/mch-admin-${ENV}/${VER}/affected-count`;
export const LIST_ERROR_ALERTS = `/mch-admin-${ENV}/${VER}/list-error-alerts`;
export const RESOLVE_ERROR_ALERTS = `/mch-admin-${ENV}/${VER}/resolve-error-alerts`;
