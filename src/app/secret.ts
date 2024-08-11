import dotenv from "dotenv";

// config
dotenv.config();

export const port: string = process.env.SERVER_PORT || "5050";
export const hostname: string = process.env.SERVER_HOST || "127.0.0.1";

export const passwordResetSecret: string = "rereer";
export const passwordResetSecretExpire: string | number = 10 * 3600;

export const passwordResetCookiesMaxAge: number = 1000 * 60 * 5; // 5 min

export const accessTokenSecret: string = "rere";
export const accessTokenExpire: string | number = 103600;

export const accessCookiemaxAge: number = 1000 * 60 * 5; // 5 min

export const nodeEnv = "development";
