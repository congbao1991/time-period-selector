import React, { Component, Fragment } from 'react'
import { DeselectAll } from 'react-selectable-fast'
import Item from '../Item/Item';

export default class List extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tips: ''
    }
  }

  generateDay = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    return days.map(day => {
      return (<div key={day} className="time-period-selector-day">{day}</div>)
    })
  }

  setTips = (tips) => {
    this.setState({
      tips
    })
  }

  render() {
    return (
      <Fragment>
        <div>
          <div className="time-period-selector-day-wrapper">
            {this.generateDay()}
          </div>
          <div className="time-period-selector-wrapper">
            {this.props.items.map((item, i) => (
              <Item
                key={i}
                title={item.title}
                value={item}
                isSelected={item.isSelected}
              />
            ))}
          </div>
        </div>
        <div className="time-period-selector-button-wrapper">
          <span className="time-period-selector-tips">{this.props.tips}</span>
          <DeselectAll className="time-period-selector-button">
            <button>Clear</button>
          </DeselectAll>
        </div>
      </Fragment>
    )
  }
}
