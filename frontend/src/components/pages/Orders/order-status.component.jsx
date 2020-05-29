import React, {
  Component,
  Fragment,
  useEffect,
  useMemo,
  useState
} from "react";
import { createStructuredSelector } from "reselect";

import uniqid from "uniqid";

import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { withAlert } from "react-alert";
import { compose } from "redux";

import { getData, orderData } from "../../../reducers/cart/cart.utils";
import { selectCartItems } from "../../../reducers/cart/cart.selector";
import authReducer from "../../../reducers/auth";
import { authProperties } from "../../../reducers/auth.selector";

import Dashboard from "../../dashboard/Dashboard";
import FormInput from "../../form-input/form-input.component";
import ConfirmDialog from "../../Dialog/confirm.dialog.component";
import ReactTable from "../../table/table.compoent";
import Style from "../../table/table.styles";

import Bag from "@material-ui/icons/LocalMallOutlined";
import ArrowBack from "@material-ui/icons/ArrowBackIosOutlined";

import {OrderStatusContainer, 
        TitleContainer,
        OrderStatusInfoWrapper,
        OrderStatusInfoContainer,
        InfoContainer,
        InfoDetailsContainer,
        CatalogueImageContainer} from './order-status.styles';



import './order-status-info.styles.scss'
// import LoadingBar from "../../loading-bar/loading-bar.component";
import LinearBar from '../../linear-bar/linear-bar.component'

import { setOnloadEvent } from '../../../utilities/helper'

function OrderStatusPageContainer({ auth, cartItems, alert, getOrderData }) {
  const { isAuthenticated, order_data } = auth;
  const [orderData, setOrderData] = useState(cartItems);
  let cartItem = [];
  let finalList = [];
  

  useEffect(() => {
    setOrderData(getOrderData(auth.uid))
    // setOrderData()
  }, [orderData])

  // getOrderData(auth.uid)
  

  
  // console.log(otherProps.orderData(auth.uid))

  console.log(`cartcartItems`, cartItems.order_data);
  
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
        status: "Not Active",
        subscriber: item.first_name,
        url: item.url,
        version: item.version,
        item_id: item.item_id
      };
    });
    
  }
  
  finalList = cartItems.order_data;
  console.log(`finalList`, finalList);
  return (
    <Dashboard>
      {isAuthenticated ? (
        <OrderStatusComponent
          cartItems={finalList}
          // order_data={order_data}
          alert={alert}
        />
      ) : (
        <Redirect to="/login" />
      )}
    </Dashboard>
  );
}

export const OrderStatusInfoPageContainer = ({
  auth,
  match,
  ...otherProps
}) => {
  return (
    <Dashboard>
      <OrderStatusInfoComponent data={{ auth, otherProps, match }} />
    </Dashboard>
  );
};

class OrderStatusComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentDate: new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, "/"),
      status: "Not Active",
      loading: true,
      timeOut: setOnloadEvent()
    };

    this.updateStatus = this.updateStatus.bind(this);
  }

  componentDidMount(){
    const {timeOut} = this.state;
   
    if(timeOut){
      setTimeout(() =>{
        this.setState({loading: false})
      },timeOut)
    }
    
      
    
  }        

  updateStatus(statusText) {
    this.setState({
      status: statusText
    });
  }

  render() {
    const { cartItems } = this.props;
    const { status, loading,timeOut } = this.state;
    // const orderList = cartItems.length ? cartItems : order_data; //[JSON.parse(localStorage.getItem("catalogueFormData"))];
    
    return (
    
      <Fragment>
        { loading ? <LinearBar time={timeOut}/>:
      (<OrderStatusContainer>
        <Fragment>
        <TitleContainer>
          <h1>Order and Status</h1>
        </TitleContainer>
        <OrderStatusTable data={(cartItems && cartItems.length > 1) ? cartItems : []} updateStatus={this.updateStatus} /> 
        </Fragment>
        {/* {cartItems ? <OrderStatusTable data={cartItems} updateStatus={this.updateStatus} /> : 'Loading...'} */}
      </OrderStatusContainer>) 
      }
      </Fragment>
    );
  }
}

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
      status: "Not Active",
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

    const { updateStatus } = this.props.data.otherProps.location;

    console.log(`match `, catalogueData);
    console.log(`secondaryMobile`, secondaryMobile);

    const userData = data && data.auth;

    return (
      // <div className="content order-status-info">
      <OrderStatusContainer>
        {/* <div className="title-bc"> */}
        <TitleContainer className="title">
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
        </TitleContainer>
        {/* <div className="content-container"> */}
        <OrderStatusInfoWrapper>
          {/* <div className="row"> */}
          <OrderStatusInfoContainer>
            {/* <div className="col-25"> */}
            <InfoContainer>
              {/* <button className="btn btn-green" onClick={this.handleClick}>
                {addNewCatalogue ? "ADD" : "APPROVE"}
              </button> */}
              <ConfirmDialog
                handleClick={addNewCatalogue ? "catalogueFormData" : "Approve"}
                data={this.state}
                addOrder={addNewCatalogue ? true : false}
                alert={alert}
                message={"Add this order?"}
                match={data.match}
                buttonClass="btn-green button--green"
                type={addNewCatalogue ? "Add" : "Activate"}
                itemId={itemId}
                updateStatus={updateStatus}
              />
              <ConfirmDialog
                handleClick={addNewCatalogue ? "catalogueFormData" : "Approve"}
                data={this.state}
                addOrder={addNewCatalogue ? true : false}  
                alert={alert}
                message={"Cancel this order?"}
                match={data.match}
                type="Cancel"
                buttonClass="btn-outline-orange btn--orange"
                itemId={itemId}
                updateStatus={updateStatus}
              />

              {/* <Link
                to={addNewCatalogue ? "/service-catalogue" : "/order-status"}
              >
                <button className="btn btn-outline-orange" onClick={this.handleClick}>Cancel</button>
              </Link> */}

              {/* <div
                className={`cat cat-${catalogueData ? catalogueData.logo : logo}`}
              > */}
              <CatalogueImageContainer className={`catalogue__image cat-${catalogueData ? catalogueData.logo : logo} catalogue__image`} >
                <div className="cat-border"></div>
                <div className="ico-cart">
                  <Bag className="i" />
                </div>
                <img
                  alt="logo"
                  className="cat-logo"
                  src={require(`../../../assets/images/logo-${
                    catalogueData ? catalogueData.logo : logo
                  }.png`)}
                  
                />
                {console.log(`catalogueDatacatalogueData`, catalogueData)}
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
              </CatalogueImageContainer>
            </InfoContainer>
            <div className="col-75">
              {/* <div className="info"> */}
              <InfoDetailsContainer className="info__container">
                <div className="info-group info--label">
                  <p className="label">Service Information</p>
                    <h3>{catalogueData ? catalogueData.title : ""}</h3>
                </div>
                <div className="info-group info--label2">
                  <p className="label">Service Information</p>
                  {/* <div className="row"> */}
                  <OrderStatusInfoContainer id="input__info__container">
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
                          <strong> {last_name}</strong>
                        )}
                      </Fragment>
                    {/* </div> */}
                    {/* <div className="col"> */}
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
                          style={{
                            resize: "none"
                          }}
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
                    </OrderStatusInfoContainer>
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
                </InfoDetailsContainer>
            </div>
            </OrderStatusInfoContainer>
          </OrderStatusInfoWrapper>
        </OrderStatusContainer>
    );
  }
}

function OrderStatusTable({ data, updateStatus }) {
  const approvalStatusClass = approvalStatusCode => {
    if (approvalStatusCode === "Cancelled" || !approvalStatusCode) {
      return "status-orange";
    } else if (approvalStatusCode === "Active" || approvalStatusCode === true) {
      return "status-green";
    } else {
      return "";
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "",
        accessor: "logo",
        width: 70,

        className: "logo-ico",
        Cell: props => (
          
          <img
            className="td-logo-ico"
            style={{
              height: "auto",
              width: "100%"
            }}
            src={require(`../../../assets/images/logo-${props.cell.value}.png`)}
            alt="logo"
          />
        )
      },

      {
        Header: "Service",
        accessor: "service",
        width: 150,
        className: "service"
      },
      {
        Header: "Subscriber",
        accessor: "subscriber",
        className: "td-subscriber",
        Cell: props => (
          <Link
            to={{
              pathname: "/order-status-info",
              item_id: props.cell.row.original.item_id,
              updateStatus: updateStatus
            }}
          >
            {props.cell.value}
          </Link>
        )
      },
      {
        Header: "Approval Status",
        accessor: "approval_status",
        className: "td-approval-status",
        Cell: props => (
          <span
            key={uniqid()}
            className={`span-status ${approvalStatusClass(props.cell.value)}`}
          >
            {!props.cell.value ? "Pending" : "Approved"}
          </span>
        )
      },
      {
        Header: "URL",
        accessor: "url"
      },
      {
        Header: "Order Date",
        accessor: "order_date",
        Cell: props =>
          props.cell.value
            ? props.cell.value.slice(0, 10).replace(/-/g, "/")
            : this.state.currentDate
      },
      {
        Header: "Status",
        accessor: "status",
        className: "td-status",
        Cell: props => (
          <span
            className={`span-status ${approvalStatusClass(props.cell.value)}`}
          >
            {props.cell.value}
          </span>
        )
      },
      {
        Header: "Approved by",
        accessor: "approved_by"
      },
      {
        Header: "Action",
        accessor: "null",
        className: "td-approve",
        Cell: props => (
          <ConfirmDialog
                className="btn btn-orange"
                // handleClick={addNewCatalogue ? "catalogueFormData" : "Approve"}
                data={props.cell.row.original}
                
                
                alert={alert}
                message={"Approve this item?"}
                
                type="Approve"
                buttonClass="btn-outline btn-outline-green"
                
                
              />
          // <button className="btn btn-outline btn-outline-green">Approve</button>
        )
      }
    ],
    []
  );

  return (
    <Style className="content-container">
      <ReactTable
        columns={columns}
        data={data}
        /*getHeaderProps={column => ({
        onClick: () => alert('Header!'),
      })}
      getColumnProps={column => ({
        onClick: () => alert('Column!'),
      })}*/
        // getRowProps={row => ({
        //   style: {
        //     background: row.index % 2 === 0 ? 'rgba(0,0,0,.1)' : 'white',
        //   },
        // })}
        dataLength={data ? data.length : 0}
        getCellProps={cellInfo => ({})}
      />
    </Style>
  );
}

const mapStateToProps = createStructuredSelector({
  auth: authProperties,
  cartItems: selectCartItems
});

const mapDispatchToProps = dispatch => ({
  getOrderData: data => dispatch(orderData(data))
})

const connectContainer = compose(withAlert(), connect(mapStateToProps, mapDispatchToProps))
export const OrderStatusPage = connectContainer(OrderStatusPageContainer);
export const OrderStatusInfoPage = connectContainer(
  OrderStatusInfoPageContainer
);

// export default connect(mapStateToProps)(OrderStatusPage, OrderStatusInfoPage);
