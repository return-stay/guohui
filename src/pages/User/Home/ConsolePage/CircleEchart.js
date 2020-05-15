import React from 'react'
import PropTypes from 'prop-types';
import { Chart } from '@antv/g2';

class CircleEchart extends React.Component {
  constructor() {
    super()
    this.state = {
      circleChart: null,
      color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']
    }
  }

  componentDidMount() {
    this.getInitCireleChart()
  }

  componentDidUpdate() {
    this.setChart()
  }

  setChart = () => {
    const { circleData } = this.props
    if (circleData.length > 0) {
      const data = circleData.slice(0, 8)
      const chart = this.state.circleChart
      chart.annotation().clear(true);
      chart.data(data);
      chart.scale('orderCount', {
        formatter: (val) => {
          return val;
        },
      });
      chart.coordinate('theta', {
        radius: 0.75,
        innerRadius: 0.6,
      });

      chart.legend(true);
      chart.tooltip({
        showTitle: false,
        showMarkers: false,
        // itemTpl: '<li class="g2-tooltip-list-item"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>',
      });

      chart
        .interval()
        .adjust('stack')
        .position('orderCount')
        .color('name')
        // .label('orderCount', (orderCount) => {
        //   return {
        //     content: (data) => {
        //       return `${data.name}: ${orderCount}`;
        //     },
        //   };
        // })
        .tooltip('name*orderCount', (name, orderCount) => {
          return {
            name: name,
            value: orderCount,
          };
        });

      chart.interaction('element-active');

      chart.render();
    }

  }

  getInitCireleChart = () => {
    const chart = new Chart({
      container: 'circle',
      autoFit: true,
      height: 600,
      width: 600,
      padding: [120,120]
    });

    this.setState({
      circleChart: chart
    })
  }

  render() {
    return (
      <div id="circle"></div>
    )
  }
}


CircleEchart.propTypes = {
  style: PropTypes.object
}

CircleEchart.defaultProps = {
  style: {
    height: '300px',
    width: '330px'
  }
}

export default CircleEchart