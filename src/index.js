import React from 'react';
import TimePeriodSelector from './components/TimePeriodSelector/TimePeriodSelector';

class ReactDemo extends React.Component {
  render() {
    return <TimePeriodSelector {...this.props} />
  }
}
export default ReactDemo;