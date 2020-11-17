import React from 'react';
import Numpad from './Numpad';
import Display from './Display';
import './Calculator.css';

function performMath(a, op, b) {
  a = Number(a);
  b = Number(b);
  switch(op) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a*b;
    case '/':      
      if(b === 0) {
        return 0;
      }
      return a/b;
  }
}

function checkNumber(val) {
  return !Number.isNaN(parseFloat(val));
}

export default class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.onButtonClicked = this.onButtonClicked.bind(this);
    this.state = {
      currentClicked: 0
    };
    this.history = '';
    this.operations = [];
  }

  onButtonClicked(value) {

    function calcAnswer() {
      let answer = 0;
      for(let i=0; i<this.operations.length-1;i+=2) {
        // answer = this.operations[i];
        answer = performMath(this.operations[i], this.operations[i+1], this.operations[i+2]);
        this.operations[i+2] = answer;
      }
      this.operations = [];
      this.operations.push(answer);
      return answer;
    }

    function reset() {
      this.operations = [];
      this.setState({
        currentClicked: 0
      });
    }

    function setCurrentClicked(val) {
      if(val.toString().length > 11) {
        val = val.toString().substr(0, 11) + '..';
      }
      this.setState({
        currentClicked: val
      });
    }

    function pushOperation(val, index) {
      if(this.operations.length < 20) {
        if(index || index === 0) {
          this.operations[index] = val;
        } else {
          this.operations.push(val);
        }
      }
    }

    if(checkNumber(value)) {
      value = Number(value);
    }

    const opLen = this.operations.length;
    const lastClicked = opLen && this.operations[opLen - 1];
    switch(value) {
      case 10:
      case 100: //special case for 0 & 00
        if(checkNumber(lastClicked)) {
          pushOperation.call(this, lastClicked * value, opLen - 1);
          setCurrentClicked.call(this, this.operations[opLen - 1]);
        }
        break;
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
        if(checkNumber(lastClicked) && this.state.currentClicked !== 0) {
          value = lastClicked + "" + value;
          pushOperation.call(this, value, opLen - 1);
        } else {
          pushOperation.call(this, value);
        }
        setCurrentClicked.call(this, value);
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        pushOperation.call(this, value);
        break;
      case '=':
        if(this.operations.length > 2 &&
          this.operations.length%2 !== 0) { //perform op only if you have correct no of operators and operands
          const answer = calcAnswer.call(this);
          setCurrentClicked.call(this, answer);
        }
        break;
      case 'CE':
        this.operations.pop();
        setCurrentClicked.call(this, 0);
        break;
      case 'AC':
        reset.call(this);
        break;
    }
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="well well-sm text-center">
                A simple Calculator using ReactJS
              </h2>
            </div>
          </div>
          <div className="row">
            <div className="calculator">
              <h2 className="title">CALCULATOR</h2>
              <Display valueToDisplay={this.state.currentClicked}
                history={this.operations.join('')} />
              <div className="buttons-container">
                <Numpad onButtonClicked={this.onButtonClicked} />
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="col-md-12">
            <div className="alert alert-info calc-notice">
              <p>
                This is a very basic calculator simply trying to use ReactJS as a part of learning. Limitations of the calculator
              </p>
              <ul>
                <li>Can handle only upto 12 digits</li>
                <li>Does not handle complex operations involving negative integers very well</li>
              </ul>
            </div>
          </div>
        </div>
        <footer>
          <div className="container">
            <div className="row">
              <div className="col-md-12 well well-sm text-center">
                <small>Styles borrowed from https://codepen.io/freeCodeCamp/full/rLJZrA</small>
              </div>
            </div>
          </div>
        </footer>
      </div>
      )
    }
  }
