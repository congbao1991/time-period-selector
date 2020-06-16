import React from 'react';
import TimePeriodSelector from './components/TimePeriodSelector/TimePeriodSelector';

class App extends React.Component {
  render() {
    return (
      <div className="time-period-selector-container">
        <TimePeriodSelector {...this.props} />
      </div>
    )
  }
}
export default App;