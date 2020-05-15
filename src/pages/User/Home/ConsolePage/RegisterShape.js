import React from 'react'
import { Chart, registerShape } from '@antv/g2';
import PropTypes from 'prop-types';
class RegisterShape extends React.Component {
  constructor() {
    super()
    this.state = {
      chartObj: null
    }
  }

  getchartInit = () => {
    registerShape('point', 'pointer', {
      draw(cfg, container) {
        const group = container.addGroup();
        const center = this.parsePoint({ x: 0, y: 0 }); // 获取极坐标系下画布中心点
        // 绘制指针
        group.addShape('line', {
          attrs: {
            x1: center.x,
            y1: center.y,
            x2: cfg.x,
            y2: cfg.y,
            stroke: cfg.color,
            lineWidth: 2,
            lineCap: 'round',
          },
        });
        group.addShape('circle', {
          attrs: {
            x: center.x,
            y: center.y,
            r: 3.75,
            stroke: cfg.color,
            lineWidth: 2.5,
            fill: '#fff',
          },
        });

        return group;
      },
    });

    const { divId, pointColor } = this.props
    const chart = new Chart({
      container: divId,
      autoFit: true,
      height: 150,
      padding: [0, 0, 30, 0],
    });

    chart.scale('value', {
      min: 0,
      max: 100,
      tickInterval: 10,
    });
    chart.coordinate('polar', {
      startAngle: (-9 / 8) * Math.PI,
      endAngle: (1 / 8) * Math.PI,
      radius: 0.75,
    });

    chart.axis('1', false);
    chart.axis('value', {
      line: null,
      label: {
        offset: 10,
        style: {
          fontSize: 10,
          textAlign: 'center',
          textBaseline: 'middle',
        },
      },
      subTickLine: {
        count: 4,
        length: -15,
      },
      tickLine: {
        length: -24,
      },
      grid: null,
    });
    chart.legend(false);
    chart
      .point()
      .position('value*1')
      .shape('pointer')
      .color(pointColor)
      .animate({
        appear: {
          animation: 'fade-in'
        }
      });

    
    this.setState({
      chartObj: chart
    })
  }
  componentDidMount() {
    this.getchartInit()
  }
  getRegisterShape = () => {
    const { dataObj,arcColor } = this.props
   
    const chart = this.state.chartObj

    const data = [dataObj];

    chart.data(data);
    // 绘制指标
    chart.annotation().clear(true);
    chart.annotation().arc({
      start: [0, 1],
      end: [data[0].value, 1],
      style: {
        stroke: arcColor,
        lineWidth: 10,
        lineDash: null,
      },
    });
    // 绘制指标数字
    // chart.annotation().text({
    //   position: ['50%', '85%'],
    //   content: '合格率',
    //   style: {
    //     fontSize: 10,
    //     fill: '#545454',
    //     textAlign: 'center',
    //   },
    // });
    chart.annotation().text({
      position: ['50%', '90%'],
      content: `${data[0].value} %`,
      style: {
        fontSize: 12,
        fill: '#545454',
        textAlign: 'center',
      },
      offsetY: 15,
    });


    chart.render();
  }

  componentDidUpdate() {
    this.getRegisterShape()
  }

  render() {
    const { divId } = this.props
    return <div id={divId}></div>
  }
}

export default RegisterShape


RegisterShape.propTypes = {
  divId: PropTypes.string,
  dataObj: PropTypes.object,
  arcColor: PropTypes.string,
  pointColor: PropTypes.string
}

RegisterShape.defaultProps = {
  arcColor: '#1890FF',
  pointColor: '#1890FF',
}
