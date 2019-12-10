import React, { Component, Fragment } from "react";
import { createStructuredSelector } from "reselect";
import uniqid from "uniqid";

import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { selectCartItems } from "../../../reducers/cart/cart.selector";
import authReducer from "../../../reducers/auth";

import { authProperties } from "../../../reducers/auth.selector";

import Dashboard from "../../dashboard/Dashboard";
import FormInput from "../../form-input/form-input.component";

import Bag from "@material-ui/icons/LocalMallOutlined";
import ArrowBack from "@material-ui/icons/ArrowBackIosOutlined";

import ConfirmDialog from "../../Dialog/confirm.dialog.component";

const OrderStatusPageContainer = ({ auth, cartItems }) => {
  const { isAuthenticated, order_data } = auth;
  let cartItem = [];
  let finalList = [];

  if (cartItems) {
    cartItem = cartItems.map(item => {
      return {
        address: item.address,
        approval_status: false,
        approved_by: "Admin",
        cat_sta: false,
        email: item.email,
        first_name: item.first_name,
        last_name: item.last_name,
        logo: item.catalogueData.logo,
        order_date: "2019-12-06T12:23:34.918961",
        price: item.catalogueData.price,
        service: item.catalogueData.title,
        status: false,
        subscriber: item.first_name,
        url: null,
        version: item.catalogueData.version
      };
    });
    finalList = [...order_data, ...cartItem];
  }

  console.log(`finalList`, finalList);
  return (
    <Dashboard>
      {isAuthenticated ? (
        <OrderStatusComponent cartItems={finalList} order_data={order_data} />
      ) : (
        <Redirect to="/login" />
      )}
    </Dashboard>
  );
};

export const OrderStatusInfoPageContainer = ({ auth, ...otherProps }) => {
  return (
    <Dashboard>
      <OrderStatusInfoComponent data={{ auth, otherProps }} />
    </Dashboard>
  );
};

export const OrderStatusComponent = ({ cartItems, order_data }) => {
  console.log(`cartItems[order_data]`, cartItems);
  const orderList = cartItems.length ? cartItems : order_data; //[JSON.parse(localStorage.getItem("catalogueFormData"))];
  let orderItems = "";
  let currentDate = new Date()
    .toJSON()
    .slice(0, 10)
    .replace(/-/g, "/");
  console.log(`orderList`, orderList);
  if (orderList) {
    orderItems = orderList.map(item => (
      <tr key={uniqid()}>
        <td className="td-select-all">
          <input type="checkbox" />
        </td>
        <td className="td-logo-ico">
          <img
            src={require(`../../../assets/images/logo-${item.logo}.png`)}
            alt="logo"
          />
        </td>
        <td className="td-service">{`${item.service} ${item.version}`}</td>
        <td className="td-subscriber">
          <Link to="/order-status-info">{`${item.first_name} ${item.last_name}`}</Link>
        </td>
        <td className="td-approval-status">
          <span className="span-status">{"Pending"}</span>
        </td>
        <td className="td-url">http://192.168.1.1/</td>
        <td className="td-date">
          {item.order_date
            ? item.order_date.slice(0, 10).replace(/-/g, "/")
            : currentDate}
        </td>
        <td className="td-status">
          <span className="span-status">Not Active</span>
        </td>
        <td className="td-approved-by">Beatrix, A.</td>
        <td className="td-delete">
          <i className="ti ti-close"></i>
        </td>
        <td className="td-approve">
          <button className="btn btn-outline btn-outline-green">Approve</button>
        </td>
      </tr>
    ));
  }

  return (
    <div className="content order-status">
      <div className="title-bc">
        <h1>Order and Status</h1>
      </div>
      <div className="content-container">
        <table>
          <thead>
            <tr>
              <th className="select-all">
                <input type="checkbox" />
              </th>
              <th className="logo-ico"></th>
              <th className="service">Service</th>
              <th>Subscriber</th>
              <th className="approval-status">Approval Status</th>
              <th>URL</th>
              <th>Order Date</th>
              <th className="th-status">Status</th>
              <th>Approved by</th>
              <th className="th-delete"></th>
              <th className="th-approve"></th>
            </tr>
          </thead>
          <tbody>{orderItems}</tbody>
        </table>
      </div>
    </div>
  );
};

export class OrderStatusInfoComponent extends Component {
  constructor(props) {
    super(props);
    console.log(`this.props`, this.props);
    const { auth } = this.props.data;
    const { catalogue } = this.props.data.otherProps.location;

    console.log(`this.props.data`, this.props.data);
    console.log(`this.auth`, auth.first_name);
    this.state = {
      auth: auth,
      first_name: auth ? auth.first_name : "",
      last_name: auth ? auth.last_name : "",
      email: auth && auth.email ? auth.email : "samplemail@email.com",
      mobile: auth && auth.mobile ? auth.mobile : "+61 123 456 7890",
      secondaryMobile: auth && auth.phonext ? auth.phonext : "+61 987 654 3210",
      address: "",
      catalogueData: catalogue,

      addNewCatalogue:
        this.props.data && this.props.data.otherProps
          ? this.props.data.otherProps.location.addCatalogue
          : ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleClick = () => {
    this.setState({ buttonClicked: true });
  };

  render() {
    const { data } = this.props;
    const {
      auth,
      first_name,
      last_name,
      email,
      mobile,
      secondaryMobile,
      addNewCatalogue,
      catalogueData,
      address
    } = this.state;

    console.log(`addNewCatalogue `, addNewCatalogue);

    const userData = data && data.auth;

    return (
      <div className="content order-status-info">
        <div className="title-bc">
          <h1>
            <Link
              to={addNewCatalogue ? "/service-catalogue" : "/order-status"}
              className="bc-back"
            >
              <ArrowBack className="i" />
            </Link>
            <span>
              {addNewCatalogue ? "Catalogue Order Form" : "Orders and Status"}
            </span>
          </h1>
        </div>
        <div className="content-container">
          <div className="row">
            <div className="col-25">
              {/* <button className="btn btn-green" onClick={this.handleClick}>
                {addNewCatalogue ? "ADD" : "APPROVE"}
              </button> */}
              <ConfirmDialog
                className="btn btn-green"
                handleClick={addNewCatalogue ? "catalogueFormData" : "Approve"}
                data={this.state}
                addOrder={addNewCatalogue ? true : false}
              />

              <Link
                to={addNewCatalogue ? "/service-catalogue" : "/order-status"}
              >
                <button className="btn btn-outline-orange">Cancel</button>
              </Link>
              <div
                className={`cat cat-${
                  catalogueData ? catalogueData.id : "aws"
                }`}
              >
                <div className="cat-border"></div>
                <div className="ico-cart">
                  <Bag className="i" />
                </div>
                <img
                  alt="logo"
                  className="cat-logo"
                  src={require(`../../../assets/images/logo-${
                    catalogueData ? catalogueData.id : "aws"
                  }.png`)}
                />
                <div className="cat-info-left">
                  <span>
                    <strong>
                      {catalogueData
                        ? catalogueData.title
                        : "Amazon Web Services"}
                    </strong>
                  </span>
                  <br />
                  <span>
                    {catalogueData ? catalogueData.version : "V1.0.0.1"}
                  </span>
                </div>
                <div className="cat-info-right">
                  <span>
                    <strong>
                      {catalogueData ? catalogueData.price : "$0.99/mo"}.
                    </strong>
                  </span>
                  <br />
                </div>
              </div>
            </div>
            <div className="col-75">
              <div className="info">
                <div className="info-group">
                  <p className="label">Service Information</p>
                  <h3>AWS</h3>
                </div>
                <div className="info-group">
                  <p className="label">Service Information</p>
                  <div className="row">
                    <div className="col">
                      <Fragment>
                        {addNewCatalogue ? (
                          <FormInput
                            name="first_name"
                            type="text"
                            label="First Name"
                            value={first_name}
                            required
                            handleChange={this.handleChange}
                          />
                        ) : (
                          <strong>{first_name}</strong>
                        )}
                        {addNewCatalogue ? (
                          <FormInput
                            name="last_name"
                            type="text"
                            label="Last Name"
                            value={last_name}
                            required
                            handleChange={this.handleChange}
                          />
                        ) : (
                          <strong>{last_name}</strong>
                        )}
                      </Fragment>
                    </div>
                    <div className="col">
                      <Fragment>
                        {addNewCatalogue ? (
                          <FormInput
                            name="email"
                            type="email"
                            label="Email"
                            value={email}
                            required
                            handleChange={this.handleChange}
                          />
                        ) : (
                          <p>{email}</p>
                        )}

                        {addNewCatalogue ? (
                          <FormInput
                            name="mobile"
                            type="text"
                            label="Phone Number"
                            value={mobile}
                            required
                            handleChange={this.handleChange}
                          />
                        ) : (
                          <p>{mobile}</p>
                        )}

                        {addNewCatalogue ? (
                          <FormInput
                            name="secondary_mobile"
                            type="text"
                            label="Additional Phone number"
                            value={secondaryMobile}
                            required
                            handleChange={this.handleChange}
                          />
                        ) : (
                          <p>{secondaryMobile}</p>
                        )}
                      </Fragment>
                      {/* <p>jjsmith@email.com</p>
                      <p>+61 123 456 7890</p>
                      <p>+61 987 654 3210</p> */}
                    </div>
                    <div className="col">
                      {addNewCatalogue ? (
                        <textarea
                          name="address"
                          rows="10"
                          cols="30"
                          placeholder="Address"
                          onChange={this.handleChange}
                        />
                      ) : (
                        <p>{address}</p>
                      )}

                      {/* <p>
                        Room 2310, Emerson Bldg.
                        <br />
                        Willow Creek, NSW 2205
                        <br />
                        Australia
                      </p> */}
                    </div>
                  </div>
                </div>
                <div className="info-group">
                  <p className="label">Approval Status</p>
                  <span className="span-status">Pending</span>
                </div>
                <div className="info-group">
                  <p className="label">URL</p>
                  <h3>https://192.168.1.1/</h3>
                </div>
                <div className="info-group">
                  <p className="label">Order Date</p>
                  <h3>2019 October 23, 15:06:59</h3>
                </div>
                <div className="info-group">
                  <p className="label">Approval Status</p>
                  <span className="span-status">Pending</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  auth: authProperties,
  cartItems: selectCartItems
});

const connectContainer = connect(mapStateToProps);
export const OrderStatusPage = connectContainer(OrderStatusPageContainer);
export const OrderStatusInfoPage = connectContainer(
  OrderStatusInfoPageContainer
);

// export default connect(mapStateToProps)(OrderStatusPage, OrderStatusInfoPage);
