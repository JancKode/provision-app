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

import { addItem, removeItem } from "../../reducers/cart/cart.actions";
import {
  addDataToDb,
  updateEntry,
  cancelOrder,
  activateOrder,
  approveOrder
} from "../../reducers/cart/cart.utils";
import messages from "../../reducers/messages";

const AlertDialog = ({
  addItem,
  data,
  addOrder,
  alert,
  message,
  buttonClass,
  type,
  itemId,
  removeItem,
  userId
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  let promptMessage = () => {
    switch (type) {
      case "Add":
        return "Are you sure you want to add this order?";
      case "Cancel":
        return "Are you sure you want to cancel?";
      case "Approve":
        return "Are you sure you want to approve this item?";
      case "Activate":
        return "Are you sure you want to activate this item?";
    }
  };

  const clickAddItemHandler = async () => {
    console.log(`data`, data);

    let items;
    if (type === "Add") {
      try {
        items = addOrder ? await addDataToDb(data) : await updateEntry(data);
        console.log(`data to insert`, items);

        if (items.getData) {
          setTimeout(() => {
            alert.success("Order added to list");
          }, 1500);
          // addItem(items.getData);
        }
      } catch (err) {
        console.log(`errerrerr`, err);
        alert.error("Error in adding order");
      }
    } else if (type === "Cancel") {
      //add cancel function here

      console.log(`data.orderDetail`, data.orderDetail);

      let cancelOrderResult = await cancelOrder(itemId);
    } else if (type === "Activate") {
      let activateOrderResult = await activateOrder(itemId);
    } else if (type === "Approve") {
      
      let approveOrderResult = await approveOrder(data.item_id, data.user_id)
      if(approveOrderResult.status === 'Ok') {
        alert.success("Order approved")
        setTimeout(() => {
          window.location.reload();
        }, 800);
      }
      console.log(`approveOrderResult`, approveOrderResult)
    }
  };

  const handleClose = () => {
    console.log(data);
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
        {type}
      </button>

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
            {promptMessage(type)}
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
  addItem: item => dispatch(addItem(item)),
  removeItem: item => dispatch(removeItem(item))
});

export default compose(
  withAlert(),
  connect(null, mapDispatchToProps)
)(AlertDialog);
