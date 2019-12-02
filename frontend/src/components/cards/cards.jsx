import React from "react";

import Bag from "@material-ui/icons/LocalMallOutlined";

import { cataloguePreview } from "../../reducers/catalogue/catalogue.selector";
import authReducer from "../../reducers/auth";

import { createStructuredSelector } from "reselect";

import { connect } from "react-redux";

// import { handleClick } from "../../helper/helper";
import { Link } from "react-router-dom";

const Cards = ({ catalogue }) => {
  console.log(catalogue);
  const cardItems = catalogue.map(item => (
    <div key={item.uid} className="col col-25">
      <Link
        to={{
          pathname: "/order-catalogue-form",
          addCatalogue: "newOrder",
          catalogue: item
        }}
      >
        <div className={`cat cat-${item.id}`}>
          <div className="cat-border"></div>
          <div className="ico-cart">
            <Bag className="i" />
          </div>
          <img
            alt="logo"
            className="cat-logo"
            src={require(`../../assets/images/logo-${item.logo}.png`)}
          />
          <div className="cat-info-left">
            <span>
              <strong>{item.title}</strong>
            </span>
            <br />
            <span>{item.version}</span>
          </div>
          <div className="cat-info-right">
            <span>
              <strong>{item.price}</strong>
            </span>
            <br />
          </div>
        </div>
      </Link>
    </div>
  ));
  return (
    <div className="content">
      <div className="title-bc">
        <h1>Service Catalogue</h1>
      </div>
      <div className="content-container">
        <div className="row">{cardItems}</div>
      </div>
    </div>
  );
};

// const mapStateToProps = state => ({
//   auth: state.auth,
//   catalogue: state.catalogue.catalogues
// });

const mapStateToProps = createStructuredSelector({
  catalogue: cataloguePreview,
  data: authReducer
});

export default connect(mapStateToProps)(Cards);
