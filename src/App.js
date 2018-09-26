import React, { Component } from "react";
import "./App.css";
import { Graph } from "react-d3-graph";
// graph payload (with minimalist structure)
const data = {
  nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice" }],
  links: [
    { source: "Harry", target: "Sally" },
    { source: "Harry", target: "Alice" }
  ]
};

// the graph configuration, you only need to pass down properties
// that you want to override, otherwise default ones will be used
const myConfig = {
  nodeHighlightBehavior: true,
  node: {
    color: "lightgreen",
    size: 120,
    highlightStrokeColor: "blue"
  },
  link: {
    highlightColor: "lightblue"
  }
};



// graph event callbacks
const onClickNode = function(nodeId) {
  window.alert(`Clicked node ${nodeId}`);
};

const onMouseOverNode = function(nodeId) {
  window.alert(`Mouse over node ${nodeId}`);
};

const onMouseOutNode = function(nodeId) {
  window.alert(`Mouse out node ${nodeId}`);
};

const onClickLink = function(source, target) {
  window.alert(`Clicked link between ${source} and ${target}`);
};

const onMouseOverLink = function(source, target) {
  window.alert(`Mouse over in link between ${source} and ${target}`);
};

const onMouseOutLink = function(source, target) {
  window.alert(`Mouse out link between ${source} and ${target}`);
};

const Feedback_onChange = function(event){

};

const Links_onChange = function(event){

};


class App extends Component {
  constructor(props) {
    super(props);
    this.store=props.store;
    this.handleFileSelect = require("./events/handleFileSelect").default.bind(this);
  }
  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">360 Network</h1>
        </header>
        <div>
          <Graph
            id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
            data={data}
            config={myConfig}
            onClickNode={onClickNode}
            onClickLink={onClickLink}
            //onMouseOverNode={onMouseOverNode}
            //onMouseOutNode={onMouseOutNode}
            //onMouseOverLink={onMouseOverLink}
            //onMouseOutLink={onMouseOutLink}
          />
        </div>
        <div>
          Feedback:
          <input
            id="feedback_input"
            className="FeedBackUpload"
            type={"file"}
            onChange={(evt)=>this.handleFileSelect(evt,"Feedback",false,1)}
          />
          Links:
          <input
            id="links_input"
            className="LinksUpload"
            type={"file"}
            onChange={(evt)=>this.handleFileSelect(evt,"Feedback",false,1)}
          />
          <button id="render" onClick={(evt)=>this.handleRenderClick(evt)}>
            Render Graph
          </button>
        </div>
      </div>
    );
  }
}

export default App;
