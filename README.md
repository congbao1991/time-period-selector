## 默认选中

数组为选中格子下标，从左到右，从上到下
<TimePeriodSelector defaultSelected={[1,2]} />

## 选中事件

items => []
item => {column: 0, row:0, index: 0}
index为格子下标，从左到右，从上到下
column代表时间点，从0开始
row代表星期几，从0开始
<TimePeriodSelector onSelectionFinish={(items) => { console.log(items) }} />
