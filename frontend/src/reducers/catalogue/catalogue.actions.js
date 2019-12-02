import CatalogueActionTypes from "./catalogue.types";

export const updateCatalogues = collectionsMap => ({
  type: CatalogueActionTypes.UPDATE_CATALOGUE,
  payload: collectionsMap
});
