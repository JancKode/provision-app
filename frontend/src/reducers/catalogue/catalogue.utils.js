import CatalogueActionTypes from "./catalogue.types";
import axios from "axios";
const appServerEnv = process.env.REACT_APP_STAGE;

export const getCatalogueData = () => dispatch => {
    let res;
    console.log(`inside Get Catalogue`, appServerEnv)

    const config = {
        headers: {
            "Content-Type" : "application/json"
        }
    }

    const body = JSON.stringify({
        isAdmin: 'admin'
    });

    if(appServerEnv === 'dev') {
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

    } else if (appServerEnv === 'mock') {
        console.log(`resmockmock`);
        try {
            res = axios.get("https://d05ea3e3-649a-4145-b292-c4ed31dc6ab6.mock.pstmn.io/service-catalogue", body, config).then(res => {
                console.log(`resmockmock`, res)
                dispatch({
                    type: CatalogueActionTypes.GET_CATALOGUE,
                    payload: res
                })
            }).catch(err => {
                console.log(`Catalogue Data error`,err)
            })
        } catch(error){
            console.log(`Catalogue Data error`,error)
        }
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