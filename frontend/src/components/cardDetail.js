import React from "react";
import {Modal } from 'react-bootstrap';
import { IoStarSharp } from "react-icons/io5";
import { useState } from "react";
const CardDetail = ({ show, handleClose }) => {
  const [quantity,setQuantity]=useState(1);

  return (
    <Modal show={show} onHide={handleClose} centered>
      
      <div className="container d-flex p-1">
      <div className="w-50 h-100 p-1 ">
        <div className="p-2">
        <img src={show.image} alt={show.title} className="w-100 mb-3 h-75" />
        </div>
        <div className="d-flex justify-content-around p-2">
          
        <img src={show.image} alt={show.title} className="w-25 p-1 border-dark" />
        <img src={show.image} alt={show.title} className="w-25 " />
        <img src={show.image} alt={show.title} className="w-25 " />
        <img src={show.image} alt={show.title} className="w-25 " />
        </div>
      </div>
      <div className="w-50 h-100 m-0 p-1">
        <h3>{show.title}</h3>
        <div className="d-flex">
            <span><IoStarSharp/><IoStarSharp/><IoStarSharp/><IoStarSharp/><IoStarSharp/></span>
        </div>
        <div className="d-flex">
             <span className="text-decoration-line-through">${show.price}</span> 
             <h5>${show.priceAfterDiscount}</h5>
        </div>
        <div>
          <p>CATEGORY: <b>{show.category}</b></p>
          <hr/>
        </div>
        <div className="d-flex " style={{height:"40px"}}>
          <div className=" d-flex qty-change" style={{width:"150px",height:"100%"}}>
            {quantity>0?
            <button className="bg-success" value="-" style={{width:"30px",height:"40px"}} onClick={()=>setQuantity(quantity-1)}>-</button>:
            <button className="bg-success" value="-" style={{width:"30px",height:"40px"}} onClick={()=>setQuantity(quantity-1)} disabled>-</button>
            }
              
              <p className="text-center " defaultValue={1} style={{width:"40px",height:"40px",border: '1px solid #000'}}>{quantity}</p>
              <button className="bg-success" value="+" style={{width:"30px",height:"40px"}} onClick={()=>setQuantity(quantity+1)}>+</button>
          </div>
          <div className="w-50">
            <button className="mx-auto h-100 bg-primary rounded-2">Add to cart</button>
          </div>
          
        </div>
        <hr/>
        <button className="w-75 bg-success text-light rounded border-dark">Customize</button>
      </div>
     </div>
      
     
  </Modal>
  );
};

export default CardDetail;