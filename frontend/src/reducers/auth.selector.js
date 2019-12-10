import { createSelector } from "reselect";

const authData = state => state.auth;

export const authProperties = createSelector([authData], auth => auth);
