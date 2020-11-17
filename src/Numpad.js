import React from 'react';
import Button from './Button';

export default class Numpad extends React.Component {

  componentWillMount() {
    this.buttons = [
      {
        display: 'CE',
        value: 'CE'
      },
      {
        display: 'AC',
        value: 'AC'
      },
      {
        display: 'NOP',
        value: ''
      },
      {
        display: '\u00F7',
        value: '/'
      },
      {
        display: '7',
        value: 7
      },
      {
        display: '8',
        value: 8
      },
      {
        display: '9',
        value: 9
      },
      {
        display: '\u00D7',
        value: '*'
      },
      {
        display: '4',
        value: 4
      },
      {
        display: '5',
        value: 5
      },
      {
        display: '6',
        value: 6
      },
      {
        display: '-',
        value: '-'
      },
      {
        display: '1',
        value: 1
      },
      {
        display: '2',
        value: 2
      },
      {
        display: '3',
        value: 3
      },
      {
        display: '+',
        value: '+'
      },
      {
        display: '0',
        value: 10
      },
      {
        display: '00',
        value: 100
      },
      {
        display: '.',
        value: '.'
      },
      {
        display: '=',
        value: '='
      }
    ];
  }

  render() {
    const buttonList = [];
    this.buttons.map((btn) => {
      buttonList.push(
        <Button value={btn} key={btn.value} data-id={btn.value} onButtonClicked={this.props.onButtonClicked} />
      );
    });

    let rows = [];
    for(let i=0; i<buttonList.length;i+=4) {
      rows.push((
        <div className="cal-row" key={i}>
          {buttonList[i]}
          {buttonList[i+1]}
          {buttonList[i+2]}
          {buttonList[i+3]}
        </div>
      ));
    }

    return (
      <div>
        {rows}
      </div>
    );
  }
}
