import React from 'react';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.querySelector('#root'));

class App extends React.Component {
    state = {
        counter: 0,
    }

    componentDidMount() {
        console.log('componentDidMount');
        this.intervalId = setInterval(() => {
            this.setState((prevState) => ({
                counter: prevState.counter + 1,
            }));
        }, 5000);
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('componentDidUpdate', { prevProps, prevState });
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
        clearInterval(this.intervalId);
    }


    render() {
        console.log('render');

        return <h1>Licznik: { this.state.counter }</h1>
    }
}

class Remove extends React.Component {
    state = {
        showApp: true, 
    };

    toggleApp = () => {
        this.setState((prevState) => ({
            showApp: !prevState.showApp, 
        }));
    };

    render() {
        return (
            <div>
                <button onClick={this.toggleApp}>
                    {this.state.showApp ? 'Odinstaluj komponent' : 'Zainstaluj komponent'}
                </button>
                {this.state.showApp && <App />}
            </div>
        );
    }
}

root.render(<Remove/>);
