import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Lifecycle from "./components/Lifecycle";
import Input from "./components/Input";

class App extends Component {
  state = {
    initialCount: 1
  }

  handleClick = (value) => {
    this.setState({
      initialCount: parseInt(value)
    })
  }

  render() {
    return (
      <div className="App">
        <Lifecycle initialCount={this.state.initialCount}/>
        <Input value={this.state.initialCount} handleClick={this.handleClick}/>
      </div>
    );
  }
}

export default App;
