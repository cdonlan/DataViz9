import React from 'react';
import {render} from 'react-dom';
//import AwesomeComponent from './AwesomeComponent.jsx';

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
                    <option value="ddBlue">Blue</option>
                    <option value="ddRed">Red</option>
                    <option value="ddGreen">Green</option>
                    <option value="ddOrange">Orange</option>
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

          handleChange(value) {
            this.props.onTypeChange(event.target.value);
          }
       
          render() {
            const type = this.props.type;
            return (
                <div>
                  <div>Graph Type:</div>
                  <div>
                    <select id="graphType" value={type} onChange={this.handleChange}>
                      <option value="ddLine">Line</option>
                      <option value="ddBar">Bar</option>
                      <option value="ddArea">Area</option>
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
    this.state = {category:'ddAverageAge',color:'ddBlue',type:'ddLine'};
  }
  
  onCategoryChange(value){
    this.setState({category: value});
  }

  onColorChange(value){
    this.setState({color: value});
  }

  onTypeChange(value){
    this.setState({type: value});
  }
  
  onCreateGraph () {
    
    var chart = new Chart(this.state.category, this.state.color, this.state.type);
    console.log("chart cat: " + chart.Category);
    console.log("chart color: " + chart.Color);
    console.log("chart type: " + chart.Type);
      // console.log(this.state.category);
      // console.log(this.state.color);
      // console.log(this.state.type);
  }

  render () {
      
    const category = this.state.category;
    const color = this.state.color;
    const type = this.state.type;
      return (
        <div>
          <p> Hello React Project</p>
          <StatisticalCategorySelect categoryValue={category} onCategoryChange={this.onCategoryChange} />
          <GraphColorSelect colorValue={color} onColorChange={this.onColorChange} />
          <GraphTypeSelect typeValue={type} onTypeChange={this.onTypeChange}/>
          <CreateGraphButton onCreateGraph={this.onCreateGraph}/>
        </div>
      );
    }
  }

render(<App/>, document.getElementById('app'));