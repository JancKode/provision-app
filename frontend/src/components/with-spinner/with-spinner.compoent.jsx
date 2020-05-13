import React from "react";

import { SpinnerContainer, SpinnerOverlay } from "./with-spinner.styles";
// import { getCatalogueData } from "../../reducers/catalogue/catalogue.utils";

export const WithSpinner = WrappedComponent => {
  const Spinner = ({getCatalogueData, isLoading, ...otherProps }) => {

    console.log(`isLoading`, getCatalogueData)
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (
      <WrappedComponent {...otherProps} />
    );
  };
  return Spinner;
};


