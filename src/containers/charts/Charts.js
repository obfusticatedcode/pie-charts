import React, { Component } from "react";
import { Graph } from "react-d3-graph";
import * as d3 from "d3";
import nodes from "../../assets/data/links.csv";
import links from "../../assets/data/Feedback.csv";

class Charts extends Component {
  state = {
    data: {
        nodes: [], 
        links: []
    },
    sample: {
      nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice" }],
      links: [
        { source: "Harry", target: "Sally" },
        { source: "Harry", target: "Alice" }
      ]
    }
  };

  // the graph configuration, you only need to pass down properties
  // that you want to override, otherwise default ones will be used

  onReadData(url) {
    return d3.csv(url, response => {
        console.log(response);
        return response;
    });
  }

  onConfig() {
    return {
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
  }
  componentDidMount() {
    this.onReadData(nodes).then(response =>
      this.setState({
        data:{nodes: response}
      })
    );
    this.onReadData(links).then(response =>
      this.setState({
        data:{ links: response}
      })
    );
  }

  render() {
    return (
      <div>
        <Graph id="graph-id" data={this.state.sample} />
        <div>{JSON.stringify(this.state.data, null, 2)}</div>
      </div>
    );
  }
}

export default Charts;
