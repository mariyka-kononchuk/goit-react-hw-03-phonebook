import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import data from '../../data/contacts.json'
import s from './App.module.css';

import Container from '../Container';
import ContactForm from '../ContactForm';
import Filter from '../Filter';
import ContactList from '../ContactList';

class App extends Component {

  state = {
    contacts: data,
    filter: ''
  }

  addContact = ({ name, number }) => {
    const { contacts } = this.state;
    const contact = {
      id: uuidv4(),
      name,
      number
    };
    
    if (contacts.find(option => option.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is already in contacts`);
      return;
    }
    
    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts]
    }))
  }
  
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts:prevState.contacts.filter(contact => contact.id !==contactId),
    }))
  }

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  }

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normilizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normilizedFilter));
  }
  
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevPops, prevState) {
    const { contacts} = this.state;
    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <Container>
        <div>
          <h1 className={s.titlePhonebbok}>Phonebook</h1>
          <ContactForm onAddContact={this.addContact} />
          <h2 className={s.titleContacts}>Contacts</h2>
          <Filter value={filter} onChange={this.changeFilter} />
          <ContactList contacts={visibleContacts} onDeleteContact={this.deleteContact} />
        </div>
      </Container>
    );
  }
}

export default App;

