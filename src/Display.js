import React from 'react';
import './Display.css';

export default class Display extends React.Component {

  render() {
    return (
      <div className="display text-right">
        <p className="current-value">{this.props.valueToDisplay}</p>
        <small>{this.props.history}</small>
      </div>
    )
  }
}
