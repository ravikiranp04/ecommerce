import React, { useState } from 'react';
import { MdDeleteForever } from "react-icons/md";

function Cart() {
  const products = [
    {
      productid: 1,
      title: "shoes",
      description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      price: 109.95,
      discountPercentage: 5.6,
      rating: 4.6,
      stock: 25,
      brand: "puma",
      category: "fashion",
      priceAfterDiscount: 2633,
      image: "https://spy.com/wp-content/uploads/2022/08/120353_127_A_Adrenaline_GTS_22-e1661732377739.jpg"
    },
    {
      productid: 2,
      title: "shirt",
      description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      price: 109.95,
      discountPercentage: 5.6,
      rating: 4.6,
      stock: 25,
      brand: "puma",
      category: "trend",
      priceAfterDiscount: 2633,
      image: "https://1.bp.blogspot.com/-YSAgWpOn1IA/U6FVuFCCGzI/AAAAAAAAA4g/ftSTdvtJS_Q/s1600/71KAJ6D8DyL._UL1500_.jpg"
    },
    {
      productid: 3,
      title: "t-shirt",
      description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      price: 109.95,
      discountPercentage: 5.6,
      rating: 4.6,
      stock: 25,
      brand: "puma",
      category: "dashing",
      priceAfterDiscount: 2633,
      image: "https://i5.walmartimages.com/asr/284f89b0-afee-4e5c-a211-eeee44a6d8ef_1.2771c881383c14577c532acaddb7e036.jpeg"
    },
    {
      productid: 4,
      title: "shoes",
      description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      price: 109.95,
      discountPercentage: 5.6,
      rating: 4.6,
      stock: 25,
      brand: "puma",
      category: "stylist",
      priceAfterDiscount: 2633,
      image: "https://cdn.shopify.com/s/files/1/0005/6973/7276/products/3_5f793b84-f47b-4d4b-b7e1-bf02c946fa7d.jpg?v=1676625334"
    }
  ];

  const [quantities, setQuantities] = useState(Array(products.length).fill(1));

  const handleQuantityChange = (index, delta) => {
    const newQuantities = [...quantities];
    newQuantities[index] = Math.max(0, newQuantities[index] + delta);
    setQuantities(newQuantities);
  };

  return (
    <div className="container p-2">
      <div className="d-flex justify-content-even">
        <div className='w-50 pr-2'>
          <table className="table">
            <thead>
              <tr>
                <th>PRODUCT</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th>SUBTOTAL</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.productid}>
                  <td className="d-flex align-items-center">
                    <img src={product.image} alt={product.title} className="mr-3" style={{ width: "50px", height: "auto" }} />
                    <p>{product.title}</p>
                  </td>
                  <td>${product.priceAfterDiscount}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      {
                        quantities[index] === 1 ? <MdDeleteForever /> :
                          <button
                            className="btn btn-success"
                            onClick={() => handleQuantityChange(index, -1)}
                          >
                            -
                          </button>
                      }
                      <p className="text-center mx-2" style={{ width: "40px" }}>{quantities[index]}</p>
                      <button
                        className="btn btn-success"
                        onClick={() => handleQuantityChange(index, 1)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>${product.priceAfterDiscount * quantities[index]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <hr />
          <div className='d-flex'>
            <textarea placeholder='Coupon Code' style={{ height: '30px' }} />
            <h5 className='m-1' style={{ marginLeft: "10px" }}>APPLY COUPON</h5>
          </div>
          <hr />
        </div>
        <div className="mt-4 p-3 " style={{width:"35%"}}>
        <h3>Cart Total</h3>
         <h5>Subtotal</h5>
              <hr/>
      <form>
        <div className="form-group">
          <label htmlFor="countrySelect">Country</label>
          <select className="form-control" id="countrySelect">
            <option>India</option>
          </select>
          <label htmlFor="stateSelect">Country</label>
          <select className="form-control" id="stateSelect">
            <option>Telangana</option>
          </select>
          <label htmlFor="citySelect">Country</label>
          <select className="form-control" id="citySelect">
            <option>City</option>
          </select>
          <label htmlFor="pinSelect">Country</label>
          <select className="form-control" id="pinSelect">
            <option>Pincode</option>
          </select>
        </div>
      </form>
      <hr/>
      <button className="w-75 bg-dark text-light" style={{height:"50px"}}>PROCEED TO CHECKOUT =></button>
    </div>
      </div>
    </div>
  ); 
}

export default Cart;
