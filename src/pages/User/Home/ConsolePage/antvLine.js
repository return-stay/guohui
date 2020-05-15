import React from 'react'
import PropTypes from 'prop-types';
import request from '../../../../utils/request'
import { ConsoleDeskQueryCalDataOrder } from '../../../../config/api'
import { Chart } from '@antv/g2';
import { DatePicker } from 'antd'
import moment from 'moment';
const { MonthPicker } = DatePicker;
class AntvLine extends React.Component {
  constructor() {
    super()
    this.state = {
      ym: null,
      lineChart: null,
      paipinMap: {},
      yikoujiaMap: {},
    }
  }

  componentDidMount() {
    let ym = this.doHandleYear() + '/' + this.doHandleMonth()
    this.setState({
      ym
    })
    this.getInitChart()
    setTimeout(() => {
      this.getRequestData()
    }, 0);
  }

  getInitChart = () => {

    const chart = new Chart({
      container: 'line-antv',
      autoFit: true,
      height: 500,
    });


    this.setState({
      lineChart: chart
    })
  }

  doHandleYear = () => {
    var myDate = new Date();
    var tYear = myDate.getFullYear();

    return tYear;
  }

  doHandleMonth = () => {
    var myDate = new Date();
    var tMonth = myDate.getMonth();

    var m = tMonth + 1;
    if (m.toString().length === 1) {
      m = "0" + m;
    }
    return m;
  }


  getRequestData = (y = null, m) => {
    let year = y || this.doHandleYear()
    let month = m || this.doHandleMonth()
    request({
      url: ConsoleDeskQueryCalDataOrder,
      params: {
        year,
        month,
      }
    }).then(res => {
      if (res.code === 100) {
        let dayOrderList = res.data.dayOrderList
        this.setChartData(this.setParams(dayOrderList))
      }
    })
  }

  setParams = (dayOrderList) => {

    return dayOrderList;
  }

  setChartData = (data) => {
    // const data = [
    //   { day: '1991', orderCount: 3 },
    //   { day: '1992', orderCount: 4 },
    //   { day: '1993', orderCount: 3.5 },
    //   { day: '1994', orderCount: 5 },
    //   { day: '1995', orderCount: 4.9 },
    //   { day: '1996', orderCount: 6 },
    //   { day: '1997', orderCount: 7 },
    //   { day: '1998', orderCount: 9 },
    //   { day: '1999', value: 13 },
    // ];
    const chart = this.state.lineChart

    chart.data(data);
    chart.annotation().clear(true);
    chart.scale('day', {
      range: [0, 1],
    });
    chart.scale('orderCount', {
      nice: true,
    });
    chart.tooltip({
      showCrosshairs: true, // 展示 Tooltip 辅助线
      shared: true,
      itemTpl: '<tr data-index="{index}"><td style="padding:5px;">订单数</td><td style="padding:5px;background-color:#fff;">{value}</td></tr>',
    });

    chart.axis('orderCount', {
      label: {
        formatter: (val) => {
          return val + '单';
        },
      },
    });

    chart.line().position('day*orderCount').shape('smooth').label('orderCount');
    chart.point()
      .position('day*orderCount')
      .shape('circle')
      .tooltip('name*orderCount', (name, orderCount) => {
        return {
          name: name,
          value: orderCount,
        };
      });;

    chart.render();

    // const chart = this.state.lineChart

    // chart.data(data);
    // chart.scale({
    //   month: {
    //     range: [0, 1],
    //   },
    //   temperature: {
    //     nice: true,
    //   },
    // });

    // chart.tooltip({
    //   showCrosshairs: true,
    //   shared: true,
    // });

    // chart
    //   .line()
    //   .position('month*temperature')
    //   .color('month')
    //   .shape('smooth');

    // chart
    //   .point()
    //   .position('month*temperature')
    //   .color('month')
    //   .shape('circle');

    // chart.render();



  }

  onMonthChange = (date, dateString) => {
    let arr = dateString.split('/')
    this.setState({
      ym: dateString,
    })
    this.getRequestData(arr[0], arr[1])
  }

  disabledDate = (current) => {
    // Can not select days before today and today
    return current && current > moment().endOf('day');
  }

  render() {
    const { ym } = this.state
    const monthFormat = 'YYYY/MM';
    let defaultYm = ym ? moment(ym, monthFormat) : null
    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h5 className="table-title">订单统计</h5>
          <MonthPicker onChange={this.onMonthChange} disabledDate={this.disabledDate} value={defaultYm} format={monthFormat} placeholder="Select month" />
        </div>
        
        <div id='line-antv'></div>
      </>
    )
  }
}


AntvLine.propTypes = {
  style: PropTypes.object
}

AntvLine.defaultProps = {
  style: {
    height: '350px',
    width: '100%'
  }
}

export default AntvLine