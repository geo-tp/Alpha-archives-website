import Cookie from "js-cookie";
import { AuthType } from "../types";

export class CookieManager {
  EXPIRATION_DEFAULT_TIME = 30; //days

  static deleteAuthData = (): void => {
    Cookie.remove("token");
    Cookie.remove("admin");
    Cookie.remove("staff");
    Cookie.remove("expiration");
  };

  static retrieveAuthData = (): AuthType | null => {
    const token = Cookie.get("token");
    const isAdmin = Cookie.get("admin");
    const isStaff = Cookie.get("staff");
    let expiration = Cookie.get("expiration");
    if (!token) {
      return null;
    }

    const today = new Date();
    const expirationDate = new Date(Date.parse(expiration || ""));
    let data = {
      token,
      isAdmin: isAdmin === "true",
      isStaff: isStaff === "true",
      expired: false,
    };

    if (expirationDate < today) {
      data = { ...data, expired: true };
    }

    return data;
  };

  static setAuthData = (
    token: string,
    isStaff: boolean,
    isAdmin: boolean
  ): void => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);
    Cookie.set("token", token, { sameSite: "strict" });
    Cookie.set("expiration", expirationDate.toString(), { sameSite: "strict" });
    Cookie.set("staff", isStaff ? "true" : "false", { sameSite: "strict" });
    Cookie.set("admin", isAdmin ? "true" : "false", { sameSite: "strict" });
  };
}
