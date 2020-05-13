import CatalogueActionTypes from "./catalogue.types";
import axios from "axios";

export const getCatalogueData = () => dispatch => {
    let res;
    console.log(`inside Get Catalogue`)

    const config = {
        headers: {
            "Content-Type" : "application/json"
        }
    }

    const body = JSON.stringify({
        isAdmin: 'admin'
    });

    try {
        res = axios.post("/service-catalogue", body, config).then(res => {
            console.log(`res`, res)
            dispatch({
                type: CatalogueActionTypes.GET_CATALOGUE,
                payload: res
            })
        })
    } catch(error){
        console.log(`Catalogue Data error`,error)
    }
}

export const addNewCatalogue = async (userId) => dispatch => {
    let newCatalagoue;

    const config = {
        headers: {
            "Content-Type" : "application/json"
        }
    }

    const body = JSON.stringify({
        userID: userId
    });

    try {
        newCatalagoue = axios.post('/service-catalogue/add', body, config).then( res => {
            dispatch({
                type: CatalogueActionTypes.NEW_CATALOGUE,
                payload: res.data
            })
        })
    }
    catch(error){
       return error;
    }
}