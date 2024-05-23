import React from 'react'
import { useState } from 'react';
import { useForm , useFieldArray} from 'react-hook-form';
function AddProduct() {
    const { register, handleSubmit, control, reset } = useForm({
        defaultValues: {
          productid: '',
          title: '',
          description: '',
          price: '',
          discountPercentage: '',
          rating: '',
          stock: '',
          brand: '',
          category: '',
          priceAfterDiscount: '',
          images: [],
          display_status: true
        }
      });
    
      const { fields, append } = useFieldArray({
        control,
        name: 'images'
      });
    
      const onSubmit = data => {
        const formattedData = {
          ...data,
          price: parseFloat(data.price),
          priceAfterDiscount: parseFloat(data.priceAfterDiscount)
        };
        console.log(formattedData);
        reset();
      };

      const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        files.forEach(file => {
          const fileURL = URL.createObjectURL(file);
          append({ url: fileURL });
        });
      };
  return (
    <div className="container">
      <h3>Add New Product</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Product ID</label>
          <input
            type="text"
            className="form-control"
            {...register('productid')}
          />
        </div>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            {...register('title')}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            {...register('description')}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            {...register('price')}
          />
        </div>
        <div className="form-group">
          <label>Discount Percentage</label>
          <input
            type="number"
            step="0.1"
            className="form-control"
            {...register('discountPercentage')}
          />
        </div>
        <div className="form-group">
          <label>Rating</label>
          <input
            type="number"
            step="0.1"
            className="form-control"
            {...register('rating')}
          />
        </div>
        <div className="form-group">
          <label>Stock</label>
          <input
            type="number"
            className="form-control"
            {...register('stock')}
          />
        </div>
        <div className="form-group">
          <label>Brand</label>
          <input
            type="text"
            className="form-control"
            {...register('brand')}
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            className="form-control"
            {...register('category')}
          />
        </div>
        <div className="form-group">
          <label>Price After Discount</label>
          <input
            type="number"
            className="form-control"
            {...register('priceAfterDiscount')}
          />
        </div>
        <div className="form-group">
          <label>Upload Images</label>
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
            multiple
          />
        </div>
        <div className="form-group">
          <label>Or Add Image URL</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter image URL and press Enter"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.target.value !== '') {
                e.preventDefault();
                append({ url: e.target.value });
                e.target.value = '';
              }
            }}
          />
        </div>
        <div className="mb-3">
          {fields.map((field, index) => (
            <img
              key={index}
              src={field.url}
              alt={`Product Image ${index + 1}`}
              style={{ width: '100px', height: '100px', marginRight: '10px' }}
            />
          ))}
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default AddProduct;