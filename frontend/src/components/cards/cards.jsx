import React, { useEffect, useState } from "react";

import Bag from "@material-ui/icons/LocalMallOutlined";

import { cataloguePreview } from "../../reducers/catalogue/catalogue.selector";
import { getCatalogueData } from "../../reducers/catalogue/catalogue.utils";
import authReducer from "../../reducers/auth";

import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import { setOnloadEvent } from "../../utilities/helper";
import { Link } from "react-router-dom";

import {
  CardContainer,
  TitleContainer,
  ContentContainer,
  CardRowContainer,
  SingleCardContaier,
  Card,
  CardIconContainer,
  CardIcon,
  CardLogo,
  CardBorder,
  CardInfoLeft,
  CardInfoRight,
} from "./cards.styles";

import LoadingBar from "../loading-bar/loading-bar.component";

import "./cards.styles.scss";

const Cards = ({ getCatalogueData, data }) => {
  let loadTime = setOnloadEvent();
  const { catalogue } = data.catalogue;
  let cardItems = [];
  console.log(`loadTime loadTime`, loadTime)
  const [loading, setLoadState] = useState(true);
  const [status, setPageStatus] = useState(201);

  useEffect(() => {
    getCatalogueData();
  }, []);

  const setTimeoutState = (time) => {
    console.log(time);
    if (time > 1) {
      setTimeout(() => {
        setPageStatus(catalogue.status);
        setLoadState(false);
      }, time);
    }
  };

  if (status === 200) {
    cardItems = catalogue.data.map((item) => (
      // <div key={item.uid} className="col col-25">
      <SingleCardContaier key={item.uid}>
        <Link
          to={{
            pathname: "/order-catalogue-form",
            addCatalogue: "newOrder",
            catalogue: item,
          }}
        >
          {/* <div className={`cat cat-${item.logo}`}> */}
          <Card id={`cat-${item.logo}`} className={`cat-${item.logo} cards`}>
            <CardBorder id="CardBorder" />
            {/* <div className="ico-cart"> */}
            <CardIconContainer>
              <CardIcon>
                <Bag id="bagIcon" />
              </CardIcon>
            </CardIconContainer>
            <CardLogo
              alt="logo"
              className="cat-logo"
              src={require(`../../assets/images/logo-${item.logo}.png`)}
            />
            <CardInfoLeft>
              <span>
                <strong>{item.title}</strong>
              </span>
              <br />
              <span>{item.version}</span>
            </CardInfoLeft>
            <CardInfoRight className="cat-info-right">
              <span>
                <strong>{item.price}</strong>
              </span>
              <br />
            </CardInfoRight>
          </Card>
        </Link>
      </SingleCardContaier>
    ));
  }

  const addNewCatalogue = (
    // <div className="col col-25">
    <SingleCardContaier>
      <Link
        to={{
          pathname: "/service-catalogue-new-catalogue",
        }}
      >
        <div className={`cat cat-aws`}>
          <div className="cat-border"></div>
          <div className="ico-cart">
            <Bag className="i" />
          </div>
          <img
            alt="logo"
            className="cat-logo"
            src={require(`../../assets/images/add_new.png`)}
          />
          <div className="cat-info-left">
            <span>
              <strong></strong>
            </span>
            <br />
            <span></span>
          </div>
          <div className="cat-info-right">
            <span>
              <strong></strong>
            </span>
            <br />
          </div>
        </div>
      </Link>
    </SingleCardContaier>
  );

  return (
    // <div className="content">
    <div>
      {!loading ? (
        <CardContainer>
          {/* <div className="title-bc"> */}
          <TitleContainer>
            <h1>Service Catalogue</h1>
          </TitleContainer>
          {/* <div className="content-container"> */}
          <ContentContainer>
            {/* <div className="row"> */}
            <CardRowContainer>
              {cardItems}
              {true ? "" : addNewCatalogue}
            </CardRowContainer>
          </ContentContainer>
        </CardContainer>
      ) : (
        <LoadingBar time={loadTime} />
      )}
      {setTimeoutState(loadTime)}
    </div>
  );
};

// const mapStateToProps = state => ({
//   auth: state.auth,
//   catalogue: state.catalogue.catalogues
// });

const mapStateToProps = createStructuredSelector({
  catalogues: cataloguePreview,
  data: authReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getCatalogueData: (data) => dispatch(getCatalogueData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
