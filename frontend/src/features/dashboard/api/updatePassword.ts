import { API_URL, UPDATE_PASSWORD } from "../../../config/api";
import { fetchJson } from "../../../api/fetchJson";
export const updatePassword = async (variables: {
  newPassword: string;
  oldPassword: string;
}) => {
  const newPassword = variables.newPassword;
  const oldPassword = variables.oldPassword;

  try {
    const res = await fetchJson(API_URL + UPDATE_PASSWORD, "PUT", {
      new_password: newPassword,
      old_password: oldPassword,
    });
    const json_res = await res.json();

    if (res.status === 200) {
      return json_res.body;
    }

    return json_res;
  } catch (error) {
    return error;
  }
};
