import React from 'react'

import i18n from '../../i18n.js';
export default class BaseChild extends React.Component {
  render() {
    return (
      <div>

        {i18n.t("Switch Theme")}
      </div>
    )
  }
}