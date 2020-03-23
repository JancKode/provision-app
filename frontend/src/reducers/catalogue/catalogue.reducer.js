import CatalogueActionTypes from "./catalogue.types";

import { serviceCatalogueData } from "../../components/cards/serviceCatalogueData";

import {} from './catalogue.utils';

const INITIAL_STATE = {
  catalogue: []
};

const catalogueReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CatalogueActionTypes.UPDATE_CATALOGUE:
      return {
        ...state,
        catalogue: action.payload
      };
    case CatalogueActionTypes.GET_CATALOGUE:
      return {
        ...state,
        catalogue: action.payload
      }
    default:
      return state;
  }
};

export default catalogueReducer;
