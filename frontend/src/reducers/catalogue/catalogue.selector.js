import { createSelector } from "reselect";

const catalogueData = state => state.catalogue;

export const catalogueCollections = createSelector(
  [catalogueData],
  catalogue => catalogue.catalogues
);

export const cataloguePreview = createSelector(
  [catalogueCollections],
  collections =>
    collections ? Object.keys(collections).map(key => collections[key]) : []
);
