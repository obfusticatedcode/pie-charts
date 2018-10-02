import React, { Component } from "react";
import  Graph  from '../../components/graph/Graph';
import SimpleSelect from '../../components/select/SimpleSelect'
import * as d3 from "d3";
import update from 'immutability-helper';
import nodes from "../../assets/data/links.csv";
import links from "../../assets/data/Feedback.csv";
import ReactTable from "react-table";
import 'react-table/react-table.css'

const keyNames = [
  {
    key: 'level_1',
    name: 'Proficiency 1'
  },{
    key: 'level_2',
    name: 'Proficiency 2'
  },{
    key: 'level_3',
    name: 'Proficiency 3'
  },{
    key: 'level_4',
    name: 'Proficiency 4'
  },{
    key: 'Feedback_counts',
    name: 'Feedback Counts'
  },{
    key: 'Feedback_self',
    name: 'Feedback Self'
  },{
    key: 'Feedback_final',
    name: 'Feedback Final'
  }
]
class Charts extends Component {
  constructor(props) {
    super(props);
    this.onClickNode=this.onClickNode.bind(this)
    this.state = {
      data: {
        nodes: [],
        links: []
      },
      lookup:{
        nodes:{},
        links:{}
      },
      competency: "CD1",
      linksReady: false,
      nodesReady: false,
      display:{node:{},links:{}},
      config: {
        height: 800,
        nodeHighlightBehavior: true,
        linkHighlightBehavior:false,
        highlightOpacity:0.1,
        node: {
          color: "#F37836",
          size: 120,
          highlightStrokeColor: "#818DC4",
        },
        link: {
          highlightColor:(link)=>{
            let scheme={'1':'#E87722',
            '2':'#F3E500',
            '3':' #6CC24A',
            '4':'#00A3E0'}
            return scheme[link.level]
          },
          opacity:1,
          value:'level',
          highlightDirection:'INWARD',
          directed:false
        }
      }
    };
  }

  // the graph configuration, you only need to pass down properties
  // that you want to override, otherwise default ones will be used

  onReadData(url) {
    return d3.csv(url, response => response);
  }

  onClickNode = function(nodeId) {
    this.setState(update(this.state,{display:{node:{$set:this.state.lookup.nodes[nodeId]}}}))
  }

  handleCompetencyChange = event => {
    this.setState({...this.state,competency:event.target.value});
    this.componentDidMount()
  };

  componentDidMount() {
    this.onReadData(nodes).then(response => {
      let competencies={}
      let ndLst = response
      .filter(nd => {
        competencies[nd.to_id]=competencies[nd.to_id]?competencies[nd.to_id]+1:1;
        return nd.to_id === this.state.competency
      })
      .map((nd,ind) =>{
        let id=nd.from_id.split("@")[0]
        return ({
          ...nd,
          id: id,
          size: (nd.Total_reference * 20000)^4
      })});

      this.setState(update(this.state,{
        nodesReady: {$set:true},
        data: { nodes: {$set:ndLst} },
        competenciesList:{$set:Object.keys(competencies)}
      }));
    })
    this.onReadData(links).then(response => {
      let lkLst = response
        .filter(
          lk =>
            lk.competency === this.state.competency &&
            lk.email !== "" &&
            lk.author !== ""
        )
        .map((lk,ind) =>{
          let from = lk.email.split("@")[0]
          let to = lk.author.split("@")[0]
          let id = from+'-'+to
          return ({
            ...lk,
            id:id,
            source: from,
            target: to
          })
        });
      this.setState(update(this.state,{
        linksReady: {$set:true},
        data: {links:{$set: lkLst }}
      }));
    });
  }

  render() {
    return (
      <div>
        <div             
        style={{
              position: 'absolute',
              left: '50px',
              top: '150px',
              'zIndex': '999'
        }}>
          {this.state.competenciesList?
            <SimpleSelect 
            id={'competency-select'}
            selected={this.state.competency} 
            label={'competency'} 
            list={this.state.competenciesList.map(c=>({label:c,value:c}))} 
            handleChange={this.handleCompetencyChange}
            />
          :null}
        </div>
        <div>
          <div 
            id='left-Window'          
            style={{
                position: 'absolute',
                left: '0px',
                top: '150px'
          }}>
            {
              (this.state.linksReady&&this.state.nodesReady)?
                <Graph 
                  id="graph-id" 
                  charts={this}
                  config={this.state.config}
                  data={this.state.data}
                  onClickNode={this.onClickNode}
                  style={
                    {width:'50%'
                  }}
                  //onMouseOverNode={()=>{}}
                  //onMouseOutNode={onMouseOutNode}
                  //onMouseOverLink={()=>{}}
                />:
                null
            }
          </div>
          <div 
            id='right-Window' 
            style={{
                position: 'absolute',
                right: '50px',
                top: '150px'
          }}>
            <ReactTable
              data={keyNames.map(pairs=>{
                return {name:pairs.name,value:this.state.display.node[pairs.key]}
              })}
              columns={[
                {
                  accessor:'name',
                  Header:'Node'
                },  
                {
                  accessor:'value',
                  Header:this.state.display.node.id
                },
              ]}
              page={0}
              pageSize={8}
            />
          </div>  
        </div>
      </div>
    );
  }
}

export default Charts;
