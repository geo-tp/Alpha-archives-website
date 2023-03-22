type headersType = {
  Accept: string;
  "Content-Type": string;
  Authorization?: string;
};

export class HeadersManager {
  static headers: headersType = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  static addAuthorization(token: string) {
    this.headers["Authorization"] = "Token " + token;
  }

  static removeAuthorization() {
    delete this.headers["Authorization"];
  }

  static getHeaders() {
    return this.headers;
  }
}
