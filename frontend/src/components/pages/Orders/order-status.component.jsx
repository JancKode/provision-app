import React, { Component, Fragment, useEffect } from "react";
import { createStructuredSelector } from "reselect";

import uniqid from "uniqid";

import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { withAlert } from "react-alert";
import { compose } from "redux";

import { getData } from "../../../reducers/cart/cart.utils";
import { selectCartItems } from "../../../reducers/cart/cart.selector";
import authReducer from "../../../reducers/auth";
import { authProperties } from "../../../reducers/auth.selector";

import Dashboard from "../../dashboard/Dashboard";
import FormInput from "../../form-input/form-input.component";
import ConfirmDialog from "../../Dialog/confirm.dialog.component";

import Bag from "@material-ui/icons/LocalMallOutlined";
import ArrowBack from "@material-ui/icons/ArrowBackIosOutlined";

const OrderStatusPageContainer = ({ auth, cartItems, alert }) => {
  const { isAuthenticated, order_data } = auth;
  let cartItem = [];
  let finalList = [];
  useEffect(() => {
    
  })
  console.log(`cartcartItems`, cartItems);
  if (cartItems && cartItems.length > 0) {
    cartItem = cartItems.map(item => {
      return {
        address: item.address,
        approval_status: false,
        approved_by: "Admin",
        cat_sta: false,
        email: item.email,
        first_name: item.first_name,
        last_name: item.last_name,
        logo: item.logo,
        order_date: "2019-12-06T12:23:34.918961",
        price: item.price,
        service: item.service,
        status: 'Not Active',
        subscriber: item.first_name,
        url: null,
        version: item.version,
        item_id: item.item_id
      };
    });
    finalList = [...order_data, ...cartItem];
  }

  console.log(`finalList`, finalList);
  return (
    <Dashboard>
      {isAuthenticated ? (
        <OrderStatusComponent
          cartItems={finalList}
          order_data={order_data}
          alert={alert}
        />
      ) : (
        <Redirect to="/login" />
      )}
    </Dashboard>
  );
};

export const OrderStatusInfoPageContainer = ({ auth, match, ...otherProps }) => {
  console.log(`OrderStatusInfoPageContainer`, match)
  return (
    <Dashboard>
      <OrderStatusInfoComponent data={{ auth, otherProps, match }} />
    </Dashboard>
  );
};

export const OrderStatusComponent = ({ cartItems, order_data }) => {
  console.log(`cartItems[order_data]`, cartItems);
  const orderList = cartItems.length ? cartItems : order_data; //[JSON.parse(localStorage.getItem("catalogueFormData"))];
  const approvalStatusClass = (approvalStatusCode) => {
    console.log(`approvalStatusCode`, approvalStatusCode)
    if(approvalStatusCode === 'Cancelled' || !approvalStatusCode) {
      return 'status-orange'
    }else if (approvalStatusCode === 'Active' || approvalStatusCode === true){
      return 'status-green'
    } else {
      return ''
    }
  }
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
        <td className="td-service">{`${(item.service)} ${item.version}`}</td>
        <td className="td-subscriber">
          <Link
            to={{
              pathname: "/order-status-info",
              item_id: item.item_id
            }}
          >
            {`${item.first_name} ${item.last_name}`}
          </Link>
        </td>
        <td className="td-approval-status">
          <span className={`span-status ${approvalStatusClass(item.approval_status)}`}>{!item.approval_status ? 'Pending' : 'Approved'}</span>
        </td>
        <td className="td-url">http://192.168.1.1/</td>
        <td className="td-date">
          {item.order_date
            ? item.order_date.slice(0, 10).replace(/-/g, "/")
            : currentDate}
        </td>
        <td className="td-status">
  <span className={`span-status ${approvalStatusClass(item.status)}`}>{item.status}</span>
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
      orderDetail: "",
      service: "",
      logo: "aws",
      status: 'Not Active',
      addNewCatalogue:
        this.props.data && this.props.data.otherProps
          ? this.props.data.otherProps.location.addCatalogue
          : ""
    };

    this.handleChange = this.handleChange.bind(this);
  }
  //Load item data when component mounts
  async componentDidMount() {
    const { item_id } = this.props.data.otherProps.location;
    const { error, success } = this.props.data.otherProps.alert;
    const { addNewCatalogue } = this.state;

    
    console.log(`addNewCatalogue`, addNewCatalogue);
    if (addNewCatalogue === undefined) {
      try {
        let itemData = await getData(item_id);
        console.log(`itemData`, itemData);
        this.setState({
          orderDetail: itemData,
          first_name: itemData.first_name,
          last_name: itemData.last_name,
          email: itemData.email,
          mobile: itemData.mobile,
          secondaryMobile: itemData.secondary_mobile,
          address: itemData.address,
          service: itemData.service,
          orderDate: itemData.order_date,
          approvalStatus: itemData.approval_status,
          logo: itemData.logo || "aws",
          price: itemData.price,
          version: itemData.version,
          itemId: itemData.item_id,
          status: itemData.status
        });
      } catch (e) {
        
        error(e);
      }
    }
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
    const { data  } = this.props;
    const {
      auth,
      first_name,
      last_name,
      email,
      mobile,
      secondaryMobile,
      addNewCatalogue,
      catalogueData,
      address,
      orderDate,
      service,
      logo,
      price,
      version,
      status,
      itemId, 
      approvalStatus
    } = this.state;

    console.log(`match `, this.props);
    console.log(`secondaryMobile`, secondaryMobile);

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
                alert={alert}
                message={'Add this order?'}
                match = {data.match}
                buttonClass='btn-green'
                type= {addNewCatalogue ? 'add' : 'activate'}
                itemId={itemId}
                
              />
              <ConfirmDialog
                className="btn btn-orange"
                handleClick={addNewCatalogue ? "catalogueFormData" : "Approve"}
                data={this.state}
                addOrder={addNewCatalogue ? true : false}
                alert={alert}
                message={'Cancel this order?'}
                match = {data.match}
                type='cancel'
                buttonClass='btn-outline-orange'
                itemId={itemId} />

              {/* <Link
                to={addNewCatalogue ? "/service-catalogue" : "/order-status"}
              >
                <button className="btn btn-outline-orange" onClick={this.handleClick}>Cancel</button>
              </Link> */}
              
              <div
                className={`cat cat-${catalogueData ? catalogueData.id : logo}`}
              >
                <div className="cat-border"></div>
                <div className="ico-cart">
                  <Bag className="i" />
                </div>
                <img
                  alt="logo"
                  className="cat-logo"
                  src={require(`../../../assets/images/logo-${
                    catalogueData ? catalogueData.id : logo
                  }.png`)}
                />
                <div className="cat-info-left">
                  <span>
                    <strong>
                      {catalogueData ? catalogueData.title : service}
                    </strong>
                  </span>
                  <br />
                  <span>{catalogueData ? catalogueData.version : version}</span>
                </div>
                <div className="cat-info-right">
                  <span>
                    <strong>
                      {catalogueData ? catalogueData.price : price}.
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
                  <h3>{service}</h3>
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
                          <strong> { last_name}</strong>
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
                            name="secondaryMobile"
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
                    <span className="span-status">{approvalStatus}</span>
                </div>
                <div className="info-group">
                  <p className="label">URL</p>
                  <h3>https://192.168.1.1/</h3>
                </div>
                <div className="info-group">
                  <p className="label">Order Date</p>
                  <h3>{orderDate}</h3>
                </div>
                <div className="info-group">
                  <p className="label">Approval Status</p>
                  <span className="span-status">{status}</span>
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

const connectContainer = compose(withAlert(), connect(mapStateToProps));
export const OrderStatusPage = connectContainer(OrderStatusPageContainer);
export const OrderStatusInfoPage = connectContainer(
  OrderStatusInfoPageContainer
);

// export default connect(mapStateToProps)(OrderStatusPage, OrderStatusInfoPage);
