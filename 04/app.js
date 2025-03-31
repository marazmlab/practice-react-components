import React from 'react';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.querySelector('#root'));

class App extends React.Component {
    state = { 
        firstName: '',
        lastName: '',
        searchQuery: '',
        users: ['Jan Kowalski', 'Michał Nowak', 'Mariusz Kowalski', 'Dominik Zawiałow',],
    }

    renderUsersList() {
        const {users, searchQuery } = this.state;

        // wykorzystanie warunku if wydawało mi sie jakoś mało intuicyjne i skomplikowane
        const filteredUsers = users.filter(user => 
            user.toLowerCase().includes(searchQuery.toLocaleLowerCase())
        );

        return filteredUsers.map(name => {
            return (
                <li onClick={ this.clickHandler }
                    style={{  marginBottom: '5px', listStyle: 'none' }}
                    title="usuń"
                >
                    { name }
                    <button
                        onClick={() => this.removeUser(name)}
                        style={{
                            marginLeft: '10px',
                            backgroundColor: 'red',
                            color: 'white',
                            border: 'none',
                            borderRadius: '3px',
                            cursor: 'pointer',
                        }}
                    >
                        x
                    </button>
                </li>
            );
        });
    }

    // clickHandler = e => {
    //     const {innerText: userName} = e.target;
    //     this.removeUser(userName);
    // }

    inputChange = e => {
        const {name, value} = e.target;
        this.setState({
            [name]: value,
        });
    }

    render() {
        const { firstName, lastName, searchQuery } = this.state;
        return (
            <section onSubmit={ this.submitHandler }>
                <form>
                    <input name="firstName"
                        value={ firstName }
                        onChange={ this.inputChange }
                        placeholder="Imię"
                    />
                    <input name="lastName"
                        value={ lastName }
                        onChange={ this.inputChange }
                        placeholder="Nazwisko"
                    />
                    <input type="submit" value="Dodaj użytkownika"/>
                </form>

                <input
                    name="searchQuery"
                    value={ searchQuery }
                    onChange={ this.inputChange }
                    placeholder='Szukaj użytkownika'
                 />

                <ul>{ this.renderUsersList() }</ul>
            </section>
        );
    }

    submitHandler = e => {
        e.preventDefault();

        const { firstName, lastName } = this.state;
        if(firstName && lastName) {
            this.addUser(`${firstName} ${lastName}`);
            this.setState({
                firstName: '',
                lastName: '',
            });
        } else {
            // tutaj komunikat dla użytkownika
        }
    }

    addUser(name) {
        this.setState({
            users: [...this.state.users, name],
        });
    }

    removeUser(name) {
        const currUsers = this.state.users.filter(
            user => user != name
        );

        this.setState({
            users: currUsers,
        });
    }
}

root.render(<App/>);
