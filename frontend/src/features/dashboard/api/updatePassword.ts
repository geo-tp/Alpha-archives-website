import { HeadersManager } from "../../../utils/headers";
import { API_URL, UPDATE_PASSWORD } from "../../../config/api";
export const updatePassword = async (variables: {
  newPassword: string;
  oldPassword: string;
}) => {
  const newPassword = variables.newPassword;
  const oldPassword = variables.oldPassword;
  const headers = HeadersManager.getHeaders();

  const params = {
    method: "PUT",
    headers,
    body: JSON.stringify({
      new_password: newPassword,
      old_password: oldPassword,
    }),
  };

  try {
    const res = await fetch(API_URL + UPDATE_PASSWORD, params);
    const json_res = await res.json();

    if (res.status === 200) {
      return json_res.body;
    }

    return json_res;
  } catch (error) {
    return error;
  }
};
