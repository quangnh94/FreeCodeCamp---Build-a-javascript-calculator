import React from 'react';
import './Button.css';

export default class Button extends React.Component {
  constructor(props) {
    super(props);
    this.buttonClicked = this.buttonClicked.bind(this);
  }

  buttonClicked(e) {
    if(e.target.dataset.value) {
      this.props.onButtonClicked(e.target.dataset.value);
    }    
  }

  render() {
    return (
      <button className="cal-button" onClick={this.buttonClicked}
        data-value={this.props.value.value}>{this.props.value.display}</button>
      )
    }
  }
