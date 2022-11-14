import Cookie from "js-cookie";

export class CookieManager {
  EXPIRATION_DEFAULT_TIME = 30; //days

  static deleteUserData = () => {
    Cookie.remove("token");
    Cookie.remove("admin");
    Cookie.remove("staff");
    Cookie.remove("expiration");
  };

  static retrieveUserData = () => {
    const token = Cookie.get("token");
    const isAdmin = Cookie.get("admin");
    const isStaff = Cookie.get("staff");
    let expiration = Cookie.get("expiration");
    if (!token) {
      return null;
    }

    const today = new Date();
    const expirationDate = Date.parse(expiration);
    let data = { token, isAdmin, isStaff };

    if (expirationDate < today) {
      data = { ...data, expired: true };
    }

    return data;
  };

  static setUserData = (token, isStaff, isAdmin) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);
    Cookie.set("token", token);
    Cookie.set("expiration", expirationDate.toString());
    Cookie.set("staff", isStaff);
    Cookie.set("admin", isAdmin);
    Cookie.set("SameSite", "strict");
  };
}
