import CatalogueActionTypes from "./catalogue.types";

import { serviceCatalogueData } from "../../components/cards/serviceCatalogueData";

const INITIAL_STATE = {
  catalogues: serviceCatalogueData
};

const catalogueReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CatalogueActionTypes.UPDATE_CATALOGUE:
      return {
        ...state,
        catalogues: action.payload
      };
    default:
      return state;
  }
};

export default catalogueReducer;
