import OrderBook from "../exercise/admin/order/book";
import OrderShort from "../exercise/admin/order/short";
import Purchase from "../exercise/admin/orderEx/purchase";
import Scrapped from "../exercise/admin/scrapped/scrapped";

export default function WebRouteConfig(){
    return [
        {
            label:'Order'
            ,path:'order'
            ,items:[
                {
                    path:'book'
                    ,label:'Order Book'
                    ,element:OrderBook
                }
                ,{
                    path:'short'
                    ,label:'Order Short'
                    ,element:OrderShort
                }
            ]
        }
        ,{
            label:'Order Ex'
            ,path:'orderEx'
            ,items:[
                {
                    path:'purchase'
                    ,label:'Purchase'
                    ,element:Purchase
                }
            ]
        }        
        ,{
            label:'Scrapped'
            ,path:'scrapped'
            ,items:[
                {
                    path:'scrapped'
                    ,label:'Scrapped cp'
                    ,element:Scrapped
                }
            ]
        }
    ]
}