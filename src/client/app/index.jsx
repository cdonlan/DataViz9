import React from 'react';
import {render} from 'react-dom';
import * as d3 from "d3";
import { scaleLinear } from 'd3-scale';
import Rickshaw from 'rickshaw';

//================================= Chart Class =================================
class Chart {
  constructor(category, color, type) {
    this._category = category;
    this._color = color;
    this._type = type;
    this._data = null; 
    }

    get Category() {
        return this._category;
    }
  
    set Category(newCategory) {
        this._category = newCategory;
    }
    
  get Color() {
      return this._color;
  }

  set Color(newColor) {
      this._color = newColor;
  }

  get Type() {
      return this._type;
  }

  set Type(newType) {
      this._type = newType;
  }

  get Data() {
      return this._data;
  }

  set Data(newData) {
      this._data = newData;
  }
}

//================================= D3 Stuff =================================
var ds;
var graphData = [];

function loaddata(chart) {
  d3.json("BaseballStats.json", function (data) {
    var counter = 0;
    data.forEach(function (d) {

      var item = {};
      item["x"] = counter;

      //console.log(chart.Category);
      if (chart.Category == 'ddAverageAge') {
        item["y"] = d.AverageAge;
      }

      if (chart.Category.toLowerCase() == 'runs per game') {

        item["y"] = d.RunsPerGame;
      }

      if (chart.Category.toLowerCase() == 'runs') {

        item["y"] = d.Runs;
      }

      if (chart.Category.toLowerCase() == 'hits') {

        item["y"] = d.Hits;
      }

      if (chart.Category.toLowerCase() == 'doubles') {

        item["y"] = d.Doubles;
      }

      if (chart.Category.toLowerCase() == 'triples') {

        item["y"] = d.Triples;
      }

      if (chart.Category.toLowerCase() == 'home runs') {

        item["y"] = d.HomeRuns;
      }


      if (chart.Category.toLowerCase() == 'runs batted in') {

        item["y"] = d.RunsBattedIn;
      }

      if (chart.Category.toLowerCase() == 'stolen bases') {

        item["y"] = d.Stolenbases;
      }

      if (chart.Category.toLowerCase() == 'walks') {

        item["y"] = d.Walks;
      }

      if (chart.Category.toLowerCase() == 'strike outs') {

        item["y"] = d.StrikeOuts;
      }

      if (chart.Category.toLowerCase() == 'batting average') {

        item["y"] = d.BattingAverage;
      }
      console.log("here 1");
      graphData.push(item);
      counter = counter + 1;
    });
    chart.Data = graphData;
    createGraph(chart);

  });
}

function getMax(arr, prop) {
  var max;
  for (var i = 0; i < arr.length; i++) {
    if (!max || arr[i][prop] > max[prop]) {
      max = arr[i];
    }
  }
  return max;
}

function getMin(arr, prop) {
  var min;
  for (var i = 0; i < arr.length; i++) {
    if (!min || min[prop] > arr[i][prop]) {
      min = arr[i];
    }
  }
  return min;
}

function createGraph(chart) {
  
        document.getElementById('graph').innerHTML = "";
        document.getElementById('y_axis').innerHTML = "";
        document.getElementById('x_axis').innerHTML = "";
        console.log(chart.Data);
  
        //Scale Data
        var max = getMax(chart.Data, "y");
        console.log("max is: " + max.y);
  
        var min = getMin(chart.Data, "y");
        console.log("min is: " + min.y);
  
        //Create scaled function
        var scaleFunc = d3.scaleLinear()
          .domain([min.y, max.y]) //input min/max of sales values
          .range([0, 300]); //output pixels for SVG
  
        //Create Data
        var graph = new Rickshaw.Graph({
  
          element: document.querySelector("#graph"),
          width: 800,
          height: 300,
          renderer: chart.Type,
          series: [{
            color: chart.Color,
            data: JSON.parse(JSON.stringify(chart.Data)),
            scale: scaleFunc
          }]
        });
  
        //Create x-axis formatter
        var format = function (n) {
          return n + 2000;
        }
  
        //Create x-axis			
        var x_ticks = new Rickshaw.Graph.Axis.X({
          graph: graph,
          orientation: 'bottom',
          element: document.getElementById('x_axis'),
          tickFormat: format
          //pixelsPerTick: 200,
  
        });
  
        var yAxisFormat = function (n) {
          //console.log("N is: " +n)
          var point = scaleFunc.invert(n);
          //console.log("Scaled N is: " +foo);
          return Math.round(point * 100) / 100;
        }
  
        var y_ticks = new Rickshaw.Graph.Axis.Y({
          graph: graph,
          orientation: 'left',
          element: document.getElementById('y_axis'),
          tickFormat: yAxisFormat
        });
  
        graph.render();
      }

//================================= React Classes =================================
class CreateGraphButton extends React.Component {
  
    constructor(props) {
      super(props);
      this.onClick = this.onClick.bind(this);
    }
    
    //Added to DOM
    componentDidMount(){
      console.log("mount");
    }
  
    onClick(event){
      this.props.onCreateGraph(event.target.value);
    }

    render() {
      return (
          <div><button onClick={this.onClick}>Create Graph!</button></div>
      );
    }
  }

  class StatisticalCategorySelect extends React.Component {
    
      constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
      }
      
      handleChange(event){
        console.log(event.target.value);
        this.props.onCategoryChange(event.target.value);
      }

      render() {
        const category = this.props.category;        
        return (
            <div>
              <div>Statistical Category:</div>
              <div>
                <select id="selectCategory" value={category} onChange={this.handleChange}>
                    <option value="ddAverageAge">Average Age</option>
                    <option value="ddRunsPerGame">Runs Per Game</option>
                    <option value="ddRuns">Runs</option>
                    <option value="ddHits">Hits</option>
                    <option value="ddDoubles">Doubles</option>
                    <option value="ddTriples">Triples</option>
                    <option value="ddHomeRuns">Home Runs</option>
                    <option value="ddRunsBattedIn">Runs Batted In</option>
                    <option value="ddStolenBases">Stolen Bases</option>
                    <option value="ddWalks">Walks</option>
                    <option value="ddStrikeOuts">Strike Outs</option>
                    <option value="ddBattingAverage">Batting Average</option>
                  </select>
              </div>
            </div>
        );
      }
    }
    class GraphColorSelect extends React.Component {
      
        constructor(props) {
          super(props);
          this.handleChange = this.handleChange.bind(this);
        }
        
        handleChange(event){
          console.log(event.target.value);
          this.props.onColorChange(event.target.value);
        }

        render() {
          const color = this.props.color;
          return (
              <div>
                <div>Graph Color:</div>
                <div>
                  <select id="graphColor" value={color} onChange={this.handleChange}>
                    <option value="blue">blue</option>
                    <option value="red">red</option>
                    <option value="green">green</option>
                    <option value="orange">orange</option>
                  </select>
                </div>
              </div>
          );
        }
      }

      class GraphTypeSelect extends React.Component {
        
          constructor(props) {
            super(props);
            this.handleChange = this.handleChange.bind(this);
          }

          handleChange(event) {
            
            this.props.onTypeChange(event.target.value);
          }
       
          render() {
            const type = this.props.type;
            return (
                <div>
                  <div>Graph Type:</div>
                  <div>
                    <select id="graphType" value={type} onChange={this.handleChange}>
                      <option value="line">line</option>
                      <option value="bar">bar</option>
                      <option value="area">area</option>
                    </select> 
                  </div>
                </div>
            );
          }
        }

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.onCreateGraph = this.onCreateGraph.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onColorChange = this.onColorChange.bind(this);
    this.onTypeChange = this.onTypeChange.bind(this);
    this.state = {category:'ddAverageAge',color:'blue',type:'line'};
  }
  
  onCategoryChange(value){
    this.setState({category: value});
  }

  onColorChange(value){
    this.setState({color: value});
  }

  onTypeChange(value){
    console.log("change");
    this.setState({type: value});
  }
  
  onCreateGraph () {
    var chart = new Chart(this.state.category, this.state.color, this.state.type);
    console.log("chart cat: " + chart.Category);
    console.log("chart color: " + chart.Color);
    console.log("chart type: " + chart.Type);
    loaddata(chart);
  }

  render () { 
    const category = this.state.category;
    const color = this.state.color;
    const type = this.state.type;
      return (
        <div>
          <p>Hello React Project</p>
          <StatisticalCategorySelect categoryValue={category} onCategoryChange={this.onCategoryChange} />
          <GraphColorSelect colorValue={color} onColorChange={this.onColorChange} />
          <GraphTypeSelect typeValue={type} onTypeChange={this.onTypeChange}/>
          <CreateGraphButton onCreateGraph={this.onCreateGraph}/>
          <p></p>
          <div id="chartblock">
            <div id="chart_container">
              <div id="y_axis"></div>
              <div id="graph"></div>
              <div id="x_axis"></div>
            </div>
          </div>          
        </div>
      );
    }
  }

  //================================= Add Elemet =================================
render(<App/>, document.getElementById('app'));