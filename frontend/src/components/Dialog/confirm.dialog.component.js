import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { withAlert } from "react-alert";
import { compose } from "redux";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";


import { addItem } from "../../reducers/cart/cart.actions";
import { addDataToDb, updateEntry, cancelOrder, activateOrder } from "../../reducers/cart/cart.utils";

const AlertDialog = ({
  addItem,
  data,
  addOrder,
  alert,
  message,
  buttonClass,
  type,
  itemId
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const clickAddItemHandler = async () => {
    console.log(`data`, data);
    let items;
    if (type === "add") {
      try {
        items = addOrder ? await addDataToDb(data) : await updateEntry(data);
        console.log(`data to insert`, items);

        if (items.getData) {
          setTimeout(() => {
            alert.success("Order added to list");
          }, 1500);
          addItem(items.getData);
        }
      } catch (e) {
        alert.error("Error in adding order");
      }
    } else if (type === 'cancel'){
      //add cancel function here
      let cancelOrderResult = await cancelOrder(itemId);
    } else if ( type === 'activate') {
      let activateOrderResult = await activateOrder(itemId);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button
        className={`btn ${buttonClass}`}
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
        {type === "cancel" ? "CANCEL" : addOrder ? "ADD" : "ACTIVATE"}
      </button>
      {/* <button
        className="btn btn-outline-orange"
        variant="outlined"
        // color="primary"
        onClick={handleClickOpen}
      >
        {'Cancel'}
      </button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Action"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {addOrder
              ? message
              : type === "cancel"
              ? message
              : "Approve this order?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button className="btn btn-outline-orange" onClick={handleClose}>
            No
          </button>
          <button
            className="btn btn-green"
            onClick={() => {
              handleClose();
              clickAddItemHandler();
            }}
            autoFocus
          >
            Yes
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  // clearItem: item => dispatch(clearItemFromCart(item)),
  addItem: item => dispatch(addItem(item))
  // removeItem: item => dispatch(removeItem(item))
});

export default compose(
  withAlert(),
  connect(null, mapDispatchToProps)
)(AlertDialog);
