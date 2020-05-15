import React from 'react'
import PropTypes from 'prop-types';

import { Chart } from '@antv/g2';
import '../index.less'
class GaugeEchart extends React.Component {
  constructor() {
    super()
    this.state = {
      gaugeChart: null,
      paipinNum: 0,
      yikoujiaNum: 0,
    }
  }
  componentDidMount() {
    // let getOtionObj = this.state.getOtionObj
    // setInterval(() => {
    //   getOtionObj.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
    //   this.setState({
    //     getOtionObj
    //   }, () => {
    //     this.forceUpdate();
    //   })
    // }, 2000);

    this.getInitChart()
  }

  componentDidUpdate() {

    this.setChartData()
  }

  setChartData = () => {
    const { paipinNum, yikoujiaNum } = this.props

    let allNum = paipinNum + yikoujiaNum
    if (allNum) {
      let paipinPercent = Number((paipinNum / allNum).toFixed(4))
      let yikoujiaPercent = Number((yikoujiaNum / allNum).toFixed(4))
      let data = [
        { item: '一口价', count: yikoujiaNum, percent: yikoujiaPercent },
        { item: '拍品', count: paipinNum, percent: paipinPercent },
      ]

      let chart = this.state.gaugeChart

      chart.annotation().clear(true);
      chart.data(data);
      chart.scale('percent', {
        formatter: (val) => {
          val = val * 100 + '%';
          return val;
        },
      });
      chart.coordinate('theta', {
        radius: 0.75,
        innerRadius: 0.86,
      });
      chart.tooltip({
        showTitle: false,
        showMarkers: false,
        itemTpl: '<li class="g2-tooltip-list-item"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>',
      });
      // 辅助文本
      chart
        .annotation()
        .text({
          position: ['50%', '50%'],
          content: '拍品',
          style: {
            fontSize: 12,
            fill: '#8c8c8c',
            textAlign: 'center',
          },
          offsetY: -20,
        })
        .text({
          position: ['50%', '50%'],
          content: allNum,
          style: {
            fontSize: 16,
            fill: '#8c8c8c',
            textAlign: 'center',
          },
          offsetY: 20,
        });
      chart
        .interval()
        .adjust('stack')
        .position('percent')
        .color('item', ['#4da3b6', '#a3d4dd'])
        .label('percent', (percent) => {
          return {
            content: (data) => {
              return `${data.item}: ${percent * 100}%`;
            },
          };
        })
        .tooltip('item*percent', (item, percent) => {
          percent = percent * 100 + '%';
          return {
            name: item,
            value: percent,
          };
        });

      chart.interaction('element-active');

      chart.render();
    }

  }

  getInitChart = () => {
    const chart = new Chart({
      container: 'gauge-chart',
      autoFit: true,
      height: 300,
    });

    this.setState({
      gaugeChart: chart
    })

  }

  render() {
    const { paipinNum, yikoujiaNum } = this.props
    return (
      <div>
        <div id="gauge-chart"></div>
        <div className="gauge-bottom">
          <div>
            <p style={{ color: '#202224' }}>{yikoujiaNum}</p>
            <p className="gauge-bottom-after">一口价</p>
          </div>
          <div>
            <p style={{ color: '#202224' }}>{paipinNum}</p>
            <p className="gauge-bottom-after gauge-bottom-after-other">拍品</p>
          </div>
        </div>
      </div>
    )
  }
}


GaugeEchart.propTypes = {
  style: PropTypes.object,
  paipinNum: PropTypes.number,
  yikoujiaNum: PropTypes.number,
}

GaugeEchart.defaultProps = {
  style: {
    height: '350px',
    width: '100%'
  },
  paipinNum: 0,
  yikoujiaNum: 0,
}

export default GaugeEchart