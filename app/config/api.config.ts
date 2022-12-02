export const API_URL = `${process.env.APP_URL}/api/v1`;
export const API_SERVER_URL = `${process.env.APP_SERVER_URL}/api/v1`;

export const getPublishPostApi = (string: string) =>
  `/published_posts${string}`;
export const getPostApi = (string: string) => `/scheduled_posts${string}`;
export const getChannelSlotApi = (string: string) => `/channel_slots${string}`;
export const getChannelApi = (string: string) => `/channels${string}`;
export const getPostTextApi = (string: string) => `/post_texts${string}`;
export const getPartialTextApi = (string: string) => `/partial_texts${string}`;
export const getMediaApi = (string: string) => `/media${string}`;
export const getTagApi = (string: string) => `/tag_ids${string}`;
export const getUserApi = (string: string) => `/users${string}`;
export const getAuthenticateApi = (string: string) => `/auth${string}`;

export const getPictureApi = (string: string) =>
  `${process.env.APP_SERVER_URL}/${string}`;
