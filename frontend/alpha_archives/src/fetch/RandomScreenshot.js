import { API_RANDOM_SCREENSHOT } from "../utils/apiEndPoints";
import { urlFormater } from "../utils/urlFormater";

export const randomScreenshot = () => {

let url = urlFormater({
    model: API_RANDOM_SCREENSHOT,
})

return fetch(url)
            .then(response => {
                return response.json()
            })
            .then(success => {
                return success
            })
            .catch(error => {
                return error
            })

}

