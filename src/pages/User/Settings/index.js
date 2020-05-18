import AsyncComponent from '../../../utils/asyncComponent'

const Upgrade = AsyncComponent(() => import('./Upgrade'))

export {
  Upgrade,
}