import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";

const styles = {
  defaultButton: {
    background: "#692c75",
    border: "1px solid #63387d",
    borderRadius: "2px",
    padding: "18px",
    color: "#fff",
    cursor: "pointer",
    width: "100%"
  },
  defaultButtonLabel: {
    fontWeight: 700
  }
};

const Button = ({ classes, children, ...props }) => (
  <button className={classes.defaultButton} {...props}>
    <span className={classes.defaultButtonLabel}>{children}</span>
  </button>
);

/* eslint-disable react/forbid-prop-types */
Button.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired
};
/* eslint-enable */

export default injectSheet(styles)(Button);
