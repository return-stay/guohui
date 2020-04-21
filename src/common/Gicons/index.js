
import React from "react"
import {Icon} from 'antd'
import './index.less'
const MicromallsSvg = () => (
  <svg t="1579685433964" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6672" width="200" height="200">
    <path d="M417.728 271.424C370.688 395.84 462.272 471.808 503.104 498.176c146.688 94.656 318.656 57.344 318.656 57.344 0 156.864-180.864 284.032-403.968 284.032-223.104 0-403.968-127.104-403.968-284.032C13.824 398.592 194.688 271.424 417.728 271.424z" p-id="6673"></path>
    <path d="M204.416 740.8c0 0 3.328 28.544-16 59.008-20.992 33.088-87.296 84.992-87.296 84.992s120.256-12.032 186.304-36.992c62.72-23.744 198.4-65.664 198.4-65.664L204.416 740.8z" p-id="6674"></path>
    <path d="M474.176 327.488a4.188 2.945 0 1 0 536.064 0 4.188 2.945 0 1 0-536.064 0Z" p-id="6675"></path>
    <path d="M734.912 478.016c0 0 89.92 27.84 131.584 43.52 43.968 16.64 123.712 24.576 123.712 24.576s-44.032-34.56-57.856-56.448c-12.864-20.096-10.624-39.04-10.624-39.04L734.912 478.016z" p-id="6676"></path>
  </svg>
)


const AppletSvg = () => (
  <svg t="1579685598418" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7428" width="200" height="200">
    <path d="M402.2 734.6c-71.9 0-130.4-54.1-130.4-121 0-20.8 6-41.2 16.9-59.5 16.4-26.8 42.7-46.6 74.4-56 8.4-2.5 14.9-3.5 20.8-3.5 13.9 0 24.8 10.9 24.8 24.8s-10.9 24.8-24.8 24.8c-1 0-3 0-5.5 1-21.3 6-38.2 18.4-47.6 34.7-6.5 10.4-9.4 21.8-9.4 33.7 0 39.2 36.2 71.4 80.4 71.4 15.4 0 30.3-4 43.7-11.4 23.3-13.4 37.2-35.7 37.2-60V405.7c0-42.2 23.3-80.8 62-102.7 20.8-11.9 44.1-17.9 68-17.9 71.9 0 130.4 54.1 130.4 121 0 20.8-6 41.2-16.9 59.5-16.4 26.8-42.7 46.6-74.4 56-8.9 2.5-14.9 3.5-20.8 3.5-13.9 0-24.8-10.9-24.8-24.8s10.9-24.8 24.8-24.8c1 0 3 0 5.5-1 21.3-6.4 38.2-18.9 47.6-34.7 6.4-10.4 9.4-21.8 9.4-33.7 0-39.2-36.2-71.4-80.8-71.4-15.4 0-30.3 4-43.7 11.4-23.3 13.4-37.2 35.7-37.2 60v207.3c0 42.2-23.3 80.9-62 102.7-20.5 12.5-43.8 18.5-67.6 18.5z m504.4-223.2c0-219.2-177.6-396.8-396.8-396.8S113 292.1 113 511.4s177.6 396.8 396.8 396.8 396.8-177.6 396.8-396.8z m49.6 0c0 246.5-199.9 446.4-446.4 446.4-246.5 0-446.4-199.9-446.4-446.4C63.4 264.9 263.3 65 509.8 65c246.5 0 446.4 199.9 446.4 446.4z m0 0" fill="#ffffff" p-id="7429"></path>
  </svg>
)



const MicromallsIcon = props => <Icon component={MicromallsSvg} className="iconStyle"/>;

const AppletIcon = props => <Icon component={AppletSvg} {...props} className="iconStyle"/>;



const Gicons = {
  micromalls:MicromallsIcon,
  applet: AppletIcon,
}

export default Gicons