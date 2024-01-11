import OrderBook from "../web/order/book";
import OrderShort from "../web/order/short";
import Purchase from "../web/orderEx/purchase";
import Scrapped from "../web/scrapped/scrapped";

export default function WebRouteConfig(){
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