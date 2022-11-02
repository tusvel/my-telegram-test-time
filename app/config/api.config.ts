export const API_URL = `${process.env.APP_URL}/api`;
export const API_SERVER_URL = `${process.env.APP_SERVER_URL}/api`;

export const getAuthUrl = (string: string) => `/auth${string}`;
export const getChannelsUrl = (string: string) => `/channels${string}`;
export const getTextsUrl = (string: string) => `/texts${string}`;
export const getMediasUrl = (string: string) => `/media${string}`;
