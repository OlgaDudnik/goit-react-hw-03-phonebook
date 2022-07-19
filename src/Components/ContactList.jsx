import React from "react";
import PropTypes from "prop-types";

const Contacts = ({ contacts, onDeleteContact }) => (
  <ul>
    {contacts.map(({ name, id, number }) => (
      <li key={id}>
        {name}: {number}{" "}
        <button onClick={() => onDeleteContact(id)}>Delete</button>
      </li>
    ))}
  </ul>
);

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    }).isRequired
  ),
  onDeleteContact: PropTypes.func.isRequired,
};

export default Contacts;
