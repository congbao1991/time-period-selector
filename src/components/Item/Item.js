import React, { Component } from 'react'
import { createSelectable } from 'react-selectable-fast'
import cs from 'classnames';

class Item extends Component {
  render() {
    const { selectableRef, isSelected, isSelecting } = this.props

    return <div className={cs('time-period-selector-item', { selected: isSelected, selecting: isSelecting, 'not-selectable': this.props.title })} ref={selectableRef}>
      {this.props.title}
    </div>
  }
}

export default createSelectable(Item)
