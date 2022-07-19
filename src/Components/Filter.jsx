import React from "react";
import PropTypes from "prop-types";
import styles from "../Styles/styles.module.css";

const Filter = ({ value, onChange }) => (
  <label className={styles.label}>
    Find contacts by name
    <input type="text" value={value} onChange={onChange} />
  </label>
);

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
