import OrderBook from "../web/order/book";
import OrderShort from "../web/order/short";
import Purchase from "../web/orderEx/purchase";
import Scrapped from "../web/scrapped/scrapped";

export default function Fack(){
    return [
        {
            label:'訂單納入企劃'
            ,path:'order'
            ,items:[
                {
                    path:'book'
                    ,label:'訂單作業'
                    ,element:OrderBook
                }
                ,{
                    path:'short'
                    ,label:'達成率查詢'
                    ,element:OrderShort
                }
            ]
        }
        ,{
            label:'客戶管理'
            ,path:'orderEx'
            ,items:[
                {
                    path:'purchase'
                    ,label:'客戶列表'
                    ,element:Purchase
                    ,desc:'Description...'
                }
            ]
        }        
        ,{
            label:'權限管理'
            ,path:'scrapped'
            ,items:[
                {
                    path:'scrapped'
                    ,label:'功能群組'
                    ,element:Scrapped
                }
            ]
        }
    ]
}

 function WebRouteConfig(){
    return [
        {
            label:'A'
            ,path:'order'
            ,items:[
                {
                    path:'book'
                    ,label:'A 1'
                    ,element:OrderBook
                    ,desc:'Description...'
                }
                ,{
                    path:'short'
                    ,label:'A2'
                    ,element:OrderShort
                }
            ]
        }
        ,{
            label:'B'
            ,path:'orderEx'
            ,items:[
                {
                    path:'purchase'
                    ,label:'B 1'
                    ,element:Purchase
                    ,desc:'Description...'
                }
            ]
        }        
        ,{
            label:'C'
            ,path:'scrapped'
            ,items:[
                {
                    path:'scrapped'
                    ,label:'C 1'
                    ,element:Scrapped
                }
            ]
        }
    ]
}