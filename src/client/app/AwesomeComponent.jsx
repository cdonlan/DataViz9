import React from 'react';

//Sample code
// class AwesomeComponent extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {likesCount : 0};
//     this.onLike = this.onLike.bind(this);
//   }

//   onLike () {
//     let newLikesCount = this.state.likesCount + 1;
//     this.setState({likesCount: newLikesCount});
//   }

//   render() {
//     return (
//       <div>
//         Likes : <span>{this.state.likesCount}</span>
//         <div><button onClick={this.onLike}>Like Me</button></div>
//       </div>
//     );
//   }

// }

//Create graph button
class CreateGraphButton extends React.Component {
  
    constructor(props) {
      super(props);
    }
  
    onCreateGraph () {
      // let newLikesCount = this.state.likesCount + 1;
      // this.setState({likesCount: newLikesCount});
    }
  
    render() {
      return (
          <div><button onClick={this.onCreateGraph}>Create Graph!</button></div>
      );
    }
  
  }

export default AwesomeComponent;