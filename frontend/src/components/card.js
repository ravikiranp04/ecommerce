import React, { isValidElement, useState } from "react";
import { CiShare1 } from "react-icons/ci";
import { BsCart3 } from "react-icons/bs";
import { BiBookmarkPlus } from "react-icons/bi";
import CardDetail from "./cardDetail";
export default function Card({ products }) {
  const [checkedItems, setCheckedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleCardpopup = (product) => {
    setSelectedProduct(product);
  };

  const handleClosePopup = () => {
    setSelectedProduct(null);
  };
  const Category = [
    { id: 1, value: 'fashion' },
    { id: 2, value: 'trend' },
    { id: 3, value: 'dashing' },
    { id: 4, value: 'stylist' }
  ];

  const handleChange = (value) => {
    // Check if the item is already checked
    const isChecked = checkedItems.includes(value);

    // If checked, remove it from the checkedItems array
    if (isChecked) {
      setCheckedItems(checkedItems.filter(item => item !== value));
    } else {
      // If not checked, add it to the checkedItems array
      setCheckedItems([...checkedItems, value]);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = checkedItems.length === 0 || checkedItems.includes(product.category);
    const matchesSearchQuery = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearchQuery;
  });

  return (
    <div className="d-flex justify-content-center carousel-inner " >
      <div className="d-flex flex-column p-3" style={{ width: "20%" }}>
        <h5>Sort By</h5>
        {Category.map((cat) => (
          <li className="d-flex mx-auto m-1" key={cat.id}>
            <input
              type="checkbox"
              id={cat.id}
              value={cat.value}
              onChange={() => handleChange(cat.value)}
              className="m-1"
            />
            <label htmlFor={cat.id}>{cat.value}</label>
          </li>
        ))}
      </div>
      <div style={{ width: "80%" }}>
        <div className="" >
          <form className="d-flex mt-2">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              value={searchQuery}
              aria-label="Search"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-outline-success text-white bg-success" type="button">
              Search
            </button>
          </form>
        </div>
        <div className="d-flex justify-content-center flex-wrap">
          {filteredProducts.map((product) => (
            <div
              key={product.productid}
              className="card-body border bg-light border-primary m-4 shadow"
              style={{ maxWidth: "250px", height: "450px" }}
            >
              <img src={product.image} alt={product.title} className="w-100 mb-3 h-50" />
              <div>
                <div>
                  <p className="text-center mb-1">{product.category}</p>
                </div>
                <div>
                  <p className="text-center mb-1 fs-4">
                    <b>{product.title}</b>
                  </p>
                </div>
                <div>
                  <p className="text-center">
                    <span className="text-decoration-line-through">${product.price}</span>
                    <h5>${product.priceAfterDiscount}</h5>
                  </p>
                </div>
                {
                  isHovered?<div className="text-center d-flex justify-content-around" onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}>
                   <BiBookmarkPlus className=""/>
                  <BsCart3 className="" />
                  <CiShare1 className="" onClick={()=>handleCardpopup(product)}/>
                 
                </div>:<div className="text-center position-relative" onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}>
                <BiBookmarkPlus className="position-absolute"/>
                  <BsCart3 className="position-absolute "/>
                  <CiShare1 className="position-absolute " onClick={()=>handleCardpopup(product)}/>
                  
                </div>
                }
                
              </div>
            </div>
          ))}
        </div>
      </div>
          { selectedProduct && (<CardDetail  show={selectedProduct} handleClose={handleClosePopup}/>)

          }
    </div>
  );
}
