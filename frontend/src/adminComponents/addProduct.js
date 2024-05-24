import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios";
import { BASE_URL } from '../port';
import { useNavigate } from 'react-router-dom';
function AddProduct() {
  const { register, handleSubmit, watch } = useForm();
  const [imageUrls, setImageUrls] = useState('');
  const navigate= useNavigate();
  const watchPrice = watch("price", 0);
  const watchDiscount = watch("discountPercentage", 0);
  const [err,setErr]=useState("")
  const calculateDiscountedPrice = (price, discount) => {
    const priceValue = parseFloat(price);
    const discountValue = parseFloat(discount);
    if (!isNaN(priceValue) && !isNaN(discountValue)) {
      return (priceValue - (priceValue * (discountValue / 100))).toFixed(2);
    }
    return 0;
  };
  
  const onSubmit =async(data) => {
    data.productid = Date.now();
    const finalData = {
      ...data,
      priceAfterDiscount: calculateDiscountedPrice(data.price, data.discountPercentage),
      images: imageUrls.split('\n').filter(url => url.trim() !== '') // Splitting the textarea content by newline
    };
    finalData.display_status=true
    console.log(finalData);
    const res= await axios.post(`${BASE_URL}/admin-api/add-product`,finalData)
    if(res.data.message==='Product added Successfully'){
       navigate('/admin-profile')
    }
    else{
        setErr(res.data.message);
    }
  };

  const handleTextareaChange = (event) => {
    setImageUrls(event.target.value);
  };

  return (
    <div className="container">
      <h3>Add New Product</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-group'>
          <label>Title</label>
          <input type='text' className='form-control mb-3' placeholder='Title' {...register("title")} />
        </div>
        <div>
          <label>Description</label>
          <input type='text' className='form-control mb-3' placeholder='Description' {...register("description")} />
        </div>
        <div>
          <label>Price</label>
          <input type='number' className='form-control mb-3' placeholder='Price' {...register("price")} />
        </div>
        <div>
          <label>Discount (in %)</label>
          <input type='number' className='form-control mb-3' placeholder='Discount Percentage' {...register("discountPercentage")} />
        </div>
        <div>
          <label>Stock</label>
          <input type='number' className='form-control mb-3' placeholder='Enter updated stock' {...register("stock")} />
        </div>
        <div>
          <label>Brand</label>
          <select className='form-control mb-3' {...register("brand")}>
            <option value="">Select</option>
            <option value="puma">PUMA</option>
            <option value="adidas">Adidas</option>
            <option value="allen solly">Allen Solly</option>
            <option value="nike">Nike</option>
            <option value="nestle">Nestle</option>
          </select>
        </div>
        <div>
          <label>Category</label>
          <select className='form-control mb-3' {...register("category")}>
            <option value="">Select</option>
            <option value="footwear">Foot Wear</option>
            <option value="fashion">Fashion</option>
            <option value="sports">Sports</option>
            <option value="food">Food</option>
          </select>
        </div>
        <div>
          <label>Paste Image URLs (One per line)</label>
          <textarea className='form-control mb-3' rows="4" onChange={handleTextareaChange} value={imageUrls}></textarea>
        </div>
        <div>
          <label>Price After Discount:</label>
          <input type='number' className='form-control mb-3' value={calculateDiscountedPrice(watchPrice, watchDiscount)} readOnly />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default AddProduct;