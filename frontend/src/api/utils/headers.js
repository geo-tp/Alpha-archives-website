export class HeadersManager {
  static headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  static addAuthorization(token) {
    this.headers["Authorization"] = "Token " + token;
  }

  static removeAuthorization() {
    delete this.headers["Authorization"];
  }

  static getHeaders() {
    return this.headers;
  }
}
