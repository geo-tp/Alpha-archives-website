import { API_ELEMENT } from "../utils/apiEndPoints";
import { urlFormater } from "../utils/urlFormater";

export const fetchElements = (filter_field, folderName) => {
    
    let url = urlFormater({
        model: API_ELEMENT,
        filter_field: filter_field,
        filter_value: folderName
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

