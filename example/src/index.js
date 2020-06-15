import 'core-js/fn/object/assign'
import 'core-js/fn/array/from'
import 'core-js/fn/array/is-array'
import 'core-js/fn/map'
import 'core-js/fn/set'
import React from 'react';
import { render } from 'react-dom';
// import TimePeriodSelector from '../../src/components/TimePeriodSelector/TimePeriodSelector';
import TimePeriodSelector from '@congbao/time-period-selector';
import '@congbao/time-period-selector/lib/main.min.css';

const App = () => (
  <div className="time-period-selector-container">
    <TimePeriodSelector defaultSelected={[1, 2, 3, 4, 126, 127, 128, 129, 130, 135, 136, 137, 138, 139, 140, 141, 142, 143, 147, 148, 149, 151, 152, 153, 154, 155, 160, 161, 162, 163, 164, 165, 166, 167, 168, 172, 173, 174]} onSelectionFinish={(items) => { console.log(items) }} />
  </div>
);
render(<App />, document.getElementById("root"));