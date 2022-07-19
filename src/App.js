import React, { Component } from "react";
import ContactForm from "./Components/ContactForm";
import Contacts from "./Components/ContactList";
import Filter from "./Components/Filter";
import Section from "./Components/Section";
import shortid from "shortid";
import contacts from "./Components/data/contacts.json";

class App extends Component {
  state = {
    contacts,
    filter: "",
  };

  componentDidMount() {
    const localStList = localStorage.getItem("contacts");
    const transformationList = JSON.parse(localStList);

    if (transformationList) {
      this.setState({ contacts: transformationList });
    }
  }

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;

    if (contacts === prevState.contacts) {
      return;
    }
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }

  addContact = (name, number) => {
    const { contacts } = this.state;
    const newName = {
      id: shortid.generate(),
      name,
      number,
    };

    if (
      contacts.every(
        ({ name }) => name.toLowerCase() !== newName.name.toLowerCase()
      )
    ) {
      this.setState((prevState) => ({
        contacts: [newName, ...prevState.contacts],
      }));
    } else {
      alert(`${newName.name} is already in contacts`);
    }
  };

  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };

  handleChangeFilter = (e) => {
    this.setState({
      filter: e.currentTarget.value,
    });
  };

  render() {
    const { contacts, filter } = this.state;
    const convertFilter = filter.toLowerCase();
    const visibleNames = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(convertFilter)
    );

    return (
      <div
        style={{
          fontSize: 20,
          fontWeight: 400,
        }}
      >
        <Section title="Phonebook">
          <ContactForm onSubmit={this.addContact} />
        </Section>

        <Section title="Contacts">
          <Filter value={filter} onChange={this.handleChangeFilter} />
          <Contacts
            contacts={visibleNames}
            onDeleteContact={this.deleteContact}
          />
        </Section>
      </div>
    );
  }
}

export default App;
