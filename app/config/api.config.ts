export const API_URL = `${process.env.APP_URL}/api`;

export const getAuthUrl = (string: string) => `/auth${string}`;
export const getChannelsUrl = (string: string) => `/channels${string}`;
