import React from 'react'
import "./widget.scss";
import { Grading, KeyboardArrowUp, PersonOutlined, ShoppingCartOutlined, Warehouse } from '@mui/icons-material';

const Widget =({type}) => {
    let data;
    //temporary 
    const amount =100;
    const diff =20;
        switch(type){
            case "BestSeller":
                data={
                    title:"Best Seller",
                    isMoney:false,
                    link:"View Best Seller items",
                    icon:<PersonOutlined className="icon" style={{color:"white", backgroundColor:"green",}}/>,
                };
                break;
                case "lowstock":
                data={
                    title:"Low Stock",
                    isMoney:false,
                    link:"View Low stock item ",
                    icon:<ShoppingCartOutlined className="icon" style={{color:"white", backgroundColor:"maroon",}}/>,

                };
                break;
                case "instock":
                data={
                    title:"In Stock",
                    isMoney:true,
                    link:"View purchased order",
                    icon:<Warehouse className="icon" style={{color:"white", backgroundColor:"green",}}/>,

                };
                break;
                case "out":
                data={
                    title:"Out",
                    isMoney:true,
                    link:"view sales order",
                    icon:<Grading className="icon" style={{color:"white", backgroundColor:"grey",}}/>,

                };
                break;
                default:    
                    break;
        }
    return (
        <div className="widget">
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">{data.isMoney && "$"}{amount}</span>
                <span className="link">{data.link}</span>
            </div>
            <div className="right">
                <div className="percentage positive">
                    <KeyboardArrowUp/>
                    {diff}%
                </div>
                {data.icon}
            </div>
        </div>
    );
};

export default Widget