import Home from '@/pages/Home'
import My from '@/pages/My'
import EditInfo from '@/pages/EditInfo'
import OrgInfo from '@/pages/OrgInfo'
import ProductInfo from '@/pages/ProductInfo'
import Buy from '@/pages/Buy'
import OrderCourse from '@/pages/OrderCourse'
import MyCard from '@/pages/MyCard'
import MyCourse from '@/pages/MyCourse'
import { ROUTE_KEY } from './menus'

export const ROUTE_COMPONENT = {
    [ROUTE_KEY.HOME]: Home,
    [ROUTE_KEY.MY]: My,
    [ROUTE_KEY.ORG_INFO]: OrgInfo,
    [ROUTE_KEY.EDIT_INFO]: EditInfo,
    [ROUTE_KEY.PRODUCT_INFO]: ProductInfo,
    [ROUTE_KEY.BUY]: Buy,
    [ROUTE_KEY.ORDER_COURSE]: OrderCourse,
    [ROUTE_KEY.MY_CARD]: MyCard,
    [ROUTE_KEY.MY_COURSE]: MyCourse,
}
