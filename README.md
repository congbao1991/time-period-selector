## 默认选中

数组为选中格子下标，从左到右，从上到下
import TimePeriodSelector from '@congbao/time-period-selector'
import '@congbao/lib/main.min.css'
<TimePeriodSelector defaultSelected={[1,2]} />

## 选中事件

items => []
item => {column: 0, row:0, index: 0}
index为格子下标，从左到右，从上到下
column代表时间点，从0开始
row代表星期几，从0开始

import TimePeriodSelector from '@congbao/time-period-selector'
import '@congbao/lib/main.min.css'
<TimePeriodSelector onSelectionFinish={(items) => { console.log(items) }} />
