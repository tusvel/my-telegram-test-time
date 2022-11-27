export const API_URL = `${process.env.APP_URL}/api/v1`;
export const API_SERVER_URL = `${process.env.APP_SERVER_URL}/api/v1`;

export const getPublishPostApi = (string: string) => `/publish_post${string}`;
export const getPostApi = (string: string) => `/post${string}`;
export const getChannelSlotApi = (string: string) => `/channel_slot${string}`;
export const getChannelApi = (string: string) => `/channels${string}`;
export const getPostTextApi = (string: string) => `/post_text${string}`;
export const getMediaApi = (string: string) => `/media${string}`;
export const getTagApi = (string: string) => `/tags${string}`;
export const getUserApi = (string: string) => `/users${string}`;
export const getAuthenticateApi = (string: string) => `/auth${string}`;
