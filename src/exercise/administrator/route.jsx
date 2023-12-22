import OrderBook from "./order/book";
import OrderShort from "./order/short";
import Purchase from "./orderEx/purchase";
import Scrapped from "./scrapped/scrapped";

export default function WebRouteConfig(){
    return [
        {
            label:'Order'
            ,path:'order'
            ,items:[
                {
                    path:'book'
                    ,label:'Order Book'
                    ,component:OrderBook
                }
                ,{
                    path:'short'
                    ,label:'Order Short'
                    ,component:OrderShort
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
                    ,component:Purchase
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
                    ,component:Scrapped
                }
            ]
        }
    ]
}