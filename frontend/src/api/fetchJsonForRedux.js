import { HeadersManager } from "./utils/headers";

/**
 * Fetch API resource with redux actions and return body of the api response
 * @param {func} getResource - Redux action for initiate resource fetching process
 * @param {func} getResourceSuccess - Redux action when resource is fetched with success
 * @param {func} getResourceError - Redux action when api return an error
 * @param {string} routeUrl - Full url of endpoints
 * @param {object} requestParams - containing method and headers for the fetch
 * @returns {object} Returns Json
 */
export function fetchJsonForRedux(
  getResource,
  getResourceSuccess,
  getResourceError,
  routeUrl,
  requestParams = {}
) {
  return (dispatch) => {
    dispatch(getResource());
    requestParams["headers"] = HeadersManager.getHeaders();

    return fetch(routeUrl, requestParams)
      .then((response) => {
        if (!response.ok) {
          throw response;
        }

        return response.json();
      })
      .then((data) => {
        dispatch(getResourceSuccess(data.body));
      })

      .catch((error) => {
        dispatch(getResourceError());
      });
  };
}
