
import React from 'react'
import axios from 'axios'
import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';
import CircleEchart from './CircleEchart'
import { ConsoleDeskQueryOrderMap } from '../../../../config/api'
import request from '../../../../utils/request'
class WordEchart extends React.Component {
  constructor() {
    super()
    this.state = {
      circleData: [{}],
      color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']
    }
  }


  getMap = (callback) => {
    request({
      url: ConsoleDeskQueryOrderMap,
    }).then(res => {
      if (res.code === 100) {
        let arr = res.data && res.data.dataList
        callback && callback(arr)
      }
    })
  }

  getColor = (v) => {
    const trend = ['#ffefd7', '#ffd2a0', '#fe8664', '#e64b47', '#c91014', '#9c0a0d',];
    return v > 9999
      ? trend[5]
      : v > 999
        ? trend[4]
        : v > 499
          ? trend[3]
          : v > 99
            ? trend[2]
            : v > 9
              ? trend[1]
              : trend[0];
  }

  addPoint = (collection, point, count = 1) => {
    for (let i = 0; i < count; i++) {
      collection.push(point);
    }
  }
  getCount = (x, y, medianX, medianY) => {
    const distance = Math.pow((x - medianX), 2) + Math.pow((y - medianY), 2);
    if (distance < 4) {
      return 3;
    } else if (distance < 16) {
      return 3;
    } else if (distance < 64) {
      return 2;
    }
    return 1;
  }

  getInitMap = (arr = []) => {
    const that = this
    const service = axios.create({
      baseURL: "https://g2.antv.vision/zh/examples", // api的base_url
      timeout: 200000, // 请求超时时间
      // withCredentials: true // 选项表明了是否是跨域请求
    })
    service({
      url: '/data/china-provinces.geo.json',
    }).then((res) => {
      return res.data
    }).then(mapData => {
      const ds = new DataSet();
      const dv = ds.createView('back').source(mapData, {
        type: 'GeoJSON',
      });
      const userData = arr
      const userDv = ds
        .createView()
        .source(userData)
        .transform({
          geoDataView: dv,
          field: 'name',
          type: 'geo.centroid',
          as: ['longitude', 'latitude'],
        });
      userDv.transform({
        type: 'sort',
        callback(a, b) { // 排序依据，和原生js的排序callback一致
          return b.value - a.value;
        }
      });

      that.setState({
        circleData: userDv.rows
      })

      const chart = new Chart({
        container: 'container',
        autoFit: true,
        height: 500,
        padding: 0
      });
      chart.scale({
        longitude: {
          sync: true,
        },
        latitude: {
          sync: true,
        },
      });
      chart.axis(false);

      chart.legend(false);
      chart.tooltip({
        showTitle: false,
        showMarkers: false,
        shared: true,
        containerTpl: '<div class="g2-tooltip"><table class="g2-tooltip-list"></table></div>',
        itemTpl: '<tr data-index="{index}"><td style="padding:5px;">{name}</td><td style="padding:5px;background-color:#fff;">{value}</td></tr>',
        domStyles: {
          'g2-tooltip': {
            borderRadius: '2px',
            backgroundColor: '#fff',
            padding: 0,
          }
        }
      });
      const bgView = chart.createView();
      bgView.data(dv.rows);
      bgView.tooltip(false);

      bgView
        .polygon()
        .position('longitude*latitude')
        .color('#ebedf0')
        .style({
          lineWidth: 1,
          stroke: '#fafbfc',
        });

      const userView = chart.createView();
      userView.data(userDv.rows);
      userView
        .point()
        .position('longitude*latitude')
        .color('#1890ff')
        .shape('circle')
        .size('orderCount', [5, 15])
        .style({
          lineWidth: 1,
          stroke: '#1890ff',
        })
        .tooltip('name*orderCount', (name, orderCount) => {
          return {
            name: name,
            value: orderCount,
          };
        });
      userView.interaction('element-active');

      chart.render();
    })
  }
  componentDidMount() {
    this.getMap((arr) => {
      this.getInitMap(arr)
    });
  }
  render() {
    const { circleData } = this.state
    return (
      <div style={{ display: 'flex' }} >
        <div style={{ width: '60%', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: 800, marginRight: 60, paddingBottom: 40 }}>
            <div id="container"></div>
          </div>
        </div>
        <div style={{ width: "40%", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircleEchart circleData={circleData} />
        </div>
      </div>
    )
  }
}


export default WordEchart
