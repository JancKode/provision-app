import CatalogueActionTypes from "./catalogue.types";

export const updateCatalogues = collectionsMap => ({
  type: CatalogueActionTypes.UPDATE_CATALOGUE,
  payload: collectionsMap
});


export const getCatalogue = catalogueMap => ({
  type: CatalogueActionTypes.GET_CATALOGUE,
  payload: catalogueMap
});
