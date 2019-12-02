import React from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import handleClick from "../../helper/helper";

import { addItem } from "../../reducers/cart/cart.actions";

const AlertDialog = ({ addItem, data, addOrder }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const clickAddItemHandler = () => {
    addItem(data);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button
        className="btn btn-green"
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
        {addOrder ? "ADD" : "APPROVE"}
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
            {addOrder
              ? "Are you sure you want to add this item?"
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

export default connect(null, mapDispatchToProps)(AlertDialog);
