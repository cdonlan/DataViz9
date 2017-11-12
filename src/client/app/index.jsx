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
    }
    
    //C
    componentDidMount(){
      console.log("mount");
    }

    onCreateGraph () {
      // let newLikesCount = this.state.likesCount + 1;
      // this.setState({likesCount: newLikesCount});
      var chart = new Chart("SelectValue", "graphColor", "graphType");
        console.log("chart cat: " + chart.Category);
        console.log("chart color: " + chart.Color);
        console.log("chart type: " + chart.Type);
      console.log("Button Click!");
    }
  
    render() {
      return (
          <div><button onClick={this.onCreateGraph}>Create Graph!</button></div>
      );
    }
  }

  class StatisticalCategorySelect extends React.Component {
    
      constructor(props) {
        super(props);
      }
   
      render() {
        return (
            <div>
              <div>Statistical Category:</div>
              <div>
                <select id="selectCategory">
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
        }
     
        render() {
          return (
              <div>
                <div>Graph Color:</div>
                <div>
                  <select id="graphColor">
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
          }
       
          render() {
            return (
                <div>
                  <div>Graph Type:</div>
                  <div>
                    <select id="graphType">
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
    render () {
      return (
        <div>
          <p> Hello React Project</p>
          <StatisticalCategorySelect/>
          <GraphColorSelect/>
          <GraphTypeSelect/>
          <CreateGraphButton/>
        </div>
      );
    }
  }

render(<App/>, document.getElementById('app'));