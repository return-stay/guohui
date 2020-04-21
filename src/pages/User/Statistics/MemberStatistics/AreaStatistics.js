import React from 'react'
import TitleSearch from './TitleSearch'
import { Radio } from 'antd'
import ReactEcharts from "echarts-for-react"
import echarts from 'echarts';
import chinaJson from 'echarts/map/json/china.json';
import './index.less'
echarts.registerMap('china', chinaJson);
export default class AddMember extends React.Component {

  constructor() {
    super()
    this.state = {
      typeValue: 'a'
    }
  }


  typeChange = (e) => {
    console.log(e)
    let value = e.target.value

    this.setState({
      typeValue: value
    })
  }
  getOption() {
    var data = [
      {
        name: '江苏省',
        value: 5.3
      },
      {
        name: '北京市',
        value: 3.8
      },
      {
        name: '北京',
        value: 3.8
      },
      {
        name: '天津',
        value: 3.3
      },
      {
        name: '南海诸岛',
        value: 3.3
      },
      {
        name: '上海',
        value: 4.6
      },
      {
        name: '重庆',
        value: 3.6
      },
      {
        name: '河北',
        value: 3.4
      },
      {
        name: '河南',
        value: 3.2
      },
      {
        name: '云南',
        value: 1.6
      },
      {
        name: '辽宁',
        value: 4.3
      },
      {
        name: '黑龙江',
        value: 4.1
      },
      {
        name: '湖南',
        value: 2.4
      },
      {
        name: '安徽',
        value: 3.3
      },
      {
        name: '山东',
        value: 3.0
      },
      {
        name: '新疆',
        value: 1
      },
      {
        name: '江苏',
        value: 3.9
      },
      {
        name: '浙江',
        value: 3.5
      },
      {
        name: '江西',
        value: 2.0
      },
      {
        name: '湖北',
        value: 2.1
      },
      {
        name: '广西',
        value: 3.0
      },
      {
        name: '甘肃',
        value: 1.2
      },
      {
        name: '山西',
        value: 3.2
      },
      {
        name: '内蒙古',
        value: 3.5
      },
      {
        name: '陕西',
        value: 2.5
      },
      {
        name: '吉林',
        value: 4.5
      },
      {
        name: '福建',
        value: 2.8
      },
      {
        name: '贵州',
        value: 1.8
      },
      {
        name: '广东',
        value: 3.7
      },
      {
        name: '青海',
        value: 0.6
      },
      {
        name: '西藏',
        value: 0.4
      },
      {
        name: '四川',
        value: 3.3
      },
      {
        name: '宁夏',
        value: 0.8
      },
      {
        name: '海南',
        value: 1.9
      },
      {
        name: '台湾',
        value: 0.1
      },
      {
        name: '香港',
        value: 0.1
      },
      {
        name: '澳门',
        value: 0.1
      }
    ];

    var yData = [];

    for (var i = 0; i < 10; i++) {
      yData.push(i + data[i].name);
    }

    var option = {
      tooltip: {
        show: true,
        formatter: function (params) {
          return params.name + '：' + params.data['value'] + '%'
        },
      },
      visualMap: {
        type: 'continuous',
        orient: 'horizontal',
        itemWidth: 10,
        itemHeight: 80,
        text: ['高', '低'],
        showLabel: true,
        seriesIndex: [0],
        min: 0,
        max: 2,
        inRange: {
          color: ['#6FCF6A', '#FFFD64', '#FF5000']
        },
        textStyle: {
          color: '#7B93A7'
        },
        bottom: 30,
        left: 'left',
      },
      grid: {
        right: 10,
        top: 135,
        bottom: 100,
        width: '20%'
      },
      xAxis: {
        show: false
      },
      yAxis: {
        type: 'category',
        inverse: true,
        nameGap: 16,
        axisLine: {
          show: false,
          lineStyle: {
            color: '#ddd'
          }
        },
        axisTick: {
          show: false,
          lineStyle: {
            color: '#ddd'
          }
        },
        axisLabel: {
          show: false,
          interval: 0,
          margin: 85,
          textStyle: {
            color: '#455A74',
            align: 'left',
            fontSize: 14
          },
        },
        data: yData
      },
      geo: {
        // roam: true,
        map: 'china',
        left: 'left',
        right: '300',
        // layoutSize: '80%',
        label: {
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          emphasis: {
            areaColor: '#fff464'
          }
        }
      },
      series: [{
        name: 'mapSer',
        type: 'map',
        roam: false,
        geoIndex: 0,
        label: {
          show: false,
        },
        data: data
      }]
    };

    return option
  }
  render() {
    const options = this.getOption()
    const { typeValue } = this.state
    return (
      <div>

        <TitleSearch searchMember={this.searchMember} />

        <div className="type-class">
          <Radio.Group defaultValue="a" buttonStyle="solid" onChange={this.typeChange}>
            <Radio.Button value="a">下单量</Radio.Button>
            <Radio.Button value="b">下单金额</Radio.Button>
          </Radio.Group>

        </div>

        <div style={{ border: '1px solid #ccc', padding: 10 }}>
          <ReactEcharts
            option={options}
            style={{ height: '650px', width: '1000px', padding: '0 30px' }}
            className='react_for_echarts'
            notMerge={true}
            lazyUpdate={true}
            onChartReady={this.onChartReadyCallback}
            opts={null} />
        </div>

        <div style={{ backgroundColor: '#d9edf7', border: '1px solid #e7e7e7', padding: '20px 5px', textAlign: 'center', }}>
          {
            typeValue === 'a' ? <span>下单量： {typeValue}个</span>:<span>下单金额： {typeValue}元</span>
          }
          
          
        </div>

      </div>
    )
  }
}