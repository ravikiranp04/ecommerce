import React, { useEffect } from "react";
import Card from "../components/card";
import Carousel1 from "../components/carousel1";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../port";
import { useAccordionButton } from "react-bootstrap";
export default function Home() {
  const location = useLocation()
   const [products, setProducts]=useState([])
   const [err,setErr]=useState("");
  /*const products = [
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
  ];*/
  const displayProducts=async()=>{
    const res = await axios.get(`${BASE_URL}/user-api/products`)
    console.log(res)
    if(res.data.message=='Products are'){
      setProducts(res.data.payload);
    }
    else{
      setErr(res.data.message)
      console.log(err)
    }
  }

  useEffect(()=>{
    displayProducts();
  },[location])

  return (
    <div>
      <div><Carousel1 /></div>
      <div className="m-1">
        <Card products={products} />
      </div>
    </div>
  );
}
