import React, { Component } from "react";
import { Graph } from "react-d3-graph";
import * as d3 from "d3";
import nodes from "../../assets/data/links.csv";
import links from "../../assets/data/Feedback.csv";

class Charts extends Component {
  constructor() {
    super();
    this.state = {
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
      },
      competency: "CD1",
      linksReady: false,
      nodesReady: false,
      config: {
        nodeHighlightBehavior: true,
        node: {
          color: "lightgreen",
          size: 120,
          highlightStrokeColor: "blue"
        },
        link: {
          highlightColor: "lightblue"
        }
      }
    };
  }

  // the graph configuration, you only need to pass down properties
  // that you want to override, otherwise default ones will be used

  onReadData(url) {
    return d3.csv(url, response => response);
  }

  componentDidMount() {
    this.onReadData(nodes).then(response => {
      let ndLst = response
        .filter(nd => nd.to_id === this.state.competency)
        .map(nd => ({
          ...nd,
          id: nd.from_id.split("@")[0],
          size: nd.Total_reference * 40000
        }));

      this.setState({
        ...this.state,
        nodesReady: true,
        data: { ...this.state.data, nodes: ndLst }
      });
    });
    this.onReadData(links).then(response => {
      let lkLst = response
        .filter(
          lk =>
            lk.competency === this.state.competency &&
            lk.email !== "" &&
            lk.author !== ""
        )
        .map(lk => ({
          ...lk,
          source: lk.email.split("@")[0],
          target: lk.author.split("@")[0]
        }));
      this.setState({
        ...this.state,
        linksReady: true,
        data: { ...this.state.data, links: lkLst }
      });
    });
  }

  render() {
    return (
      <div>
        <Graph
          id="graph-id"
          data={
            this.state.linksReady && this.state.nodesReady
              ? this.state.data
              : this.state.sample
          }
          config={this.state.config}
        />
      </div>
    );
  }
}

export default Charts;
