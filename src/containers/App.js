import React, { Component } from "react";
import "./App.css";
import Charts from './charts/Charts';
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Pie Charts</h1>
        </header>
        <div>
          <Charts />
        </div>
      </div>
    );
  }
}

export default App;
