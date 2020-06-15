import React from 'react';
import TimePeriodSelector from './components/TimePeriodSelector/TimePeriodSelector';

class App extends React.Component {
  render() {
    return <TimePeriodSelector {...this.props} />
  }
}
export default App;