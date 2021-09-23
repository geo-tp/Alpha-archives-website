
import { API_IMAGE } from "../utils/apiEndPoints"
import {urlFormater} from "../utils/urlFormater"

export const fetchUploadFile = (file) => {
    
    let url = urlFormater({
        model: API_IMAGE
    })

    return fetch(url, {
        method:"POST",
        body: file
        })
                .then(response => {
                    return response.status
                })
                .then(success => {
                    return success
                })

                .catch(error => {
                    return error
                })
}