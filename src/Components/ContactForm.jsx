import PropTypes from "prop-types";
import React, { Component } from "react";
import shortid from "shortid";
import styles from "../Styles/styles.module.css";

class Form extends Component {
  state = {
    name: "",
    number: "",
  };

  nameInputId = shortid.generate();

  handleChangeName = (e) => {
    this.setState({
      name: e.currentTarget.value,
    });
  };

  handleChangeNumber = (e) => {
    this.setState({
      number: e.currentTarget.value,
    });
  };

  removeForm = () => {
    this.setState({ name: "", number: "" });
  };

  handleSubmit = (e) => {
    const { name, number } = this.state;
    e.preventDefault();

    this.props.onSubmit(name, number);
    this.removeForm();
  };

  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor={this.nameInputId} className={styles.label}>
          Name
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChangeName}
            id={this.nameInputId}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label htmlFor={this.nameInputId} className={styles.label}>
          Number
          <input
            type="tel"
            name="number"
            value={number}
            onChange={this.handleChangeNumber}
            id={this.nameInputId}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button type="submit">Add contacts</button>
      </form>
    );
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
