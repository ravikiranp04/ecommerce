import React, { useEffect, useState } from "react";
import Card from "../components/card";
import Carousel1 from "../components/carousel1";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../port";

export default function Home() {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [err, setErr] = useState("");

  const displayProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user-api/products`);
      if (res.data.message === 'Products are') {
        setProducts(res.data.payload);
      } else {
        setErr(res.data.message);
        console.log(err);
      }
    } catch (error) {
      setErr("Failed to fetch products");
      console.error(error);
    }
  };

  useEffect(() => {
    displayProducts();
  }, [location,displayProducts]);

  return (
    <div>
      <div><Carousel1 /></div>
      <div className="m-1">
        <Card products={products} />
      </div>
    </div>
  );
}
