import React, { Component } from "react";
import "./App.css";
import Graph from "./components/charts/Charts";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Pie Charts</h1>
        </header>
        <div>
          <Graph />
        </div>
      </div>
    );
  }
}

export default App;
