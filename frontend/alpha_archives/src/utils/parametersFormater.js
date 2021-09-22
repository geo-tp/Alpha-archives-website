
import { BASIC_HEADER } from "../utils/APIConfig";
import {store} from "../index"
import { tokenSelector } from "../selectors/AuthSelectors";

const addTokenIfExist = () => {

    let token = tokenSelector(store.getState().auth)

    if (token) {
        BASIC_HEADER.append("Authorization", "token " + token)
    }

}

export const parametersFormater = (method, body=null) => {

    // not add token if it's already done
    if (!BASIC_HEADER.get("authorization")) {
        addTokenIfExist()
    }


    switch (method) {

        case "GET":
        case "DELETE":
            return {method: method, headers:BASIC_HEADER}


        case "PUT":
        case "PATCH":
        case "POST":


            return {method: method, headers:BASIC_HEADER, body:JSON.stringify(body)}

            
        default:
            return {};
    }
}
