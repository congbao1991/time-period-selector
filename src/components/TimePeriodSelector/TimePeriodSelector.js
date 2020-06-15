import React, { Component, Fragment } from 'react'
import { SelectableGroup } from 'react-selectable-fast'
import List from '../List/List'
import { deepClone } from '../../utils'
require('../../assets/styles/index.css');

function prefixNum(num) {
  if (num < 10) {
    return `0${num}`;
  }
  return num;
}
export default class TimePeriodSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tolerance: true,
      globalMouse: true,
      items: [],
      groupedData: [],
      tips: `Drag the mouse to select time period`,
      timeObj: {}
    }
  }

  arrange = (source) => {
    let t;
    let ta;
    let r = [];

    for (let j = 0; j < source.length; j++) {
      let v = source[j];
      if (v != null) {
        if (t === v['column']) {
          ta.push(v);
          t++;
          continue;
        }
        ta = [v];
        t = v['column'] + 1;
        r.push(ta);
      }
    }
    return r;
  }

  handleSelecting = (e) => {
    // console.log(e)
  }
  handleSelectionClear = () => { }
  handleSelectionFinish = (selectedItems) => {
    // 获取选中items;
    const arr = selectedItems.map(item => {
      // delete item.props.value.isSelected;
      return item.props.value
    })

    // 排序
    arr.sort((a, b) => {
      return a.index - b.index
    })

    // 分组
    const groupedData = this.arrange(arr);
    let tips;
    if (groupedData.length > 0) {
      tips = `Selected time period`
    } else {
      tips = 'Drag the mouse to select time period'
    }

    this.setState({
      groupedData,
      tips
    }, () => {
      this.generrateTimeObject()
    })
  }

  // 给父组件传参，抹平index差异
  emit2ParentComponentObj = () => {

  }

  // 生成时间对象
  generrateTimeObject = () => {
    const timeObj = {}
    this.state.groupedData.forEach(item => {
      if (item && item.length > 0) {
        switch (item[0].row) {
          case 0:
            if (!timeObj['Monday']) {
              timeObj['Monday'] = [];
            }
            timeObj['Monday'].push(item);
            break;
          case 1:
            if (!timeObj['Tuesday']) {
              timeObj['Tuesday'] = [];
            }
            timeObj['Tuesday'].push(item);
            break;
          case 2:
            if (!timeObj['Wednesday']) {
              timeObj['Wednesday'] = [];
            }
            timeObj['Wednesday'].push(item);
            break;
          case 3:
            if (!timeObj['Thursday']) {
              timeObj['Thursday'] = [];
            }
            timeObj['Thursday'].push(item);
            break;
          case 4:
            if (!timeObj['Friday']) {
              timeObj['Friday'] = [];
            }
            timeObj['Friday'].push(item);
            break;
          case 5:
            if (!timeObj['Saturday']) {
              timeObj['Saturday'] = [];
            }
            timeObj['Saturday'].push(item);
            break;
          case 6:
            if (!timeObj['Sunday']) {
              timeObj['Sunday'] = [];
            }
            timeObj['Sunday'].push(item);
            break;
        }
      }
    })
    this.setState({
      timeObj
    })

    if (this.props.onSelectionFinish) {
      const propsObj = deepClone(timeObj);
      Object.keys(propsObj).forEach(key => {
        propsObj[key].map(arr => {
          return arr.map(item => {
            delete item.isSelected
            item.index = item.index - 25
            return item
          })
        })
      })
      this.props.onSelectionFinish.call(this, propsObj)
    }
  }

  // 生成展示
  generateTimePeriodExhibition = () => {


    return Object.keys(this.state.timeObj).map((key, i) => {
      return (
        <p key={i} className="time-period-selecto-ex"><span className="time-period-selector-time">{key}</span>{this.generateTime(this.state.timeObj[key])}</p>
      )
    })
  }

  // 生成每个时间段展示
  generateTime = (source) => {
    return source.map(item => {
      return `${prefixNum(item[0].column)}:00 ~ ${prefixNum(item[item.length - 1].column)}:00;\xa0\xa0`
    })
  }

  generateItems = () => {
    let arr = [];
    let row = -2;
    let selectedItems = [];
    for (let i = 0; i < 8 * 25; i++) {
      let data = {}

      // 生成小时框显示
      if (i < 25) {
        if (i < 10) {
          data.title = `0${i}`;
        } else {
          data.title = i;
        }
      }

      // aaa代表星期几， 从0开始， 0-星期一
      if (i % 25 === 0) {
        row++
      }
      data.row = row;

      // 时间点 0-24
      data.column = i % 25;

      // 下标
      data.index = i;

      // 设置默认选中
      if (this.props.defaultSelected && this.props.defaultSelected.includes(i - 25)) {
        data.isSelected = true;
        selectedItems.push({ props: { value: data } });
      }

      arr.push(data);
    }
    this.setState({
      items: arr
    })
    this.handleSelectionFinish(selectedItems);
  }

  componentDidMount() {
    this.generateItems();
  }

  render() {
    return (
      <Fragment>
        <div className="time-period-selector-title-wrapper">
          <span className="time-period-selector-title">00:00-12:00</span>
          <span className="time-period-selector-title">12:00-24:00</span>
        </div>
        <SelectableGroup
          enableDeselect
          tolerance={this.state.tolerance}
          globalMouse={this.state.isGlobal}
          allowClickWithoutSelected={true}
          duringSelection={this.handleSelecting}
          onSelectionClear={this.handleSelectionClear}
          onSelectionFinish={this.handleSelectionFinish}
          ignoreList={['.not-selectable']}
        >
          <List items={this.state.items} ref={this.listHook} tips={this.state.tips} />
        </SelectableGroup>
        {this.generateTimePeriodExhibition()}
      </Fragment>
    )
  }
}
