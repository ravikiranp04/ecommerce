import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../port";

function AdminProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const [checkedItems, setCheckedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [err, setErr] = useState("");
  const [message, setMessage] = useState(location.state?.message || "");

  const handleCardpopup = (product) => {
    navigate(`/admin-profile/${product.productid}`, { state: { product } });
  };

  const handleAddProduct = () => {
    navigate("add-product");
  };
  const Category = [
    { id: 1, value: "footwear" },
    { id: 2, value: "fashion" },
    { id: 3, value: "sports" },
    { id: 4, value: "food" },
  ];

  const handleChange = (value) => {
    setCheckedItems((prevCheckedItems) =>
      prevCheckedItems.includes(value)
        ? prevCheckedItems.filter((item) => item !== value)
        : [...prevCheckedItems, value]
    );
  };

  const displayProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin-api/products`);
      if (res.data.message === "Products are") {
        setProducts(res.data.payload);
      } else {
        setErr(res.data.message);
      }
    } catch (error) {
      setErr("Failed to fetch products");
    }
  };

  useEffect(() => {
    displayProducts();
    if (message) {
      setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
    }
  }, [location]);

  const filteredProducts = products.filter((product) => {
    const matchesSearchQuery = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      checkedItems.length === 0 || checkedItems.includes(product.category);
    return matchesSearchQuery && matchesCategory;
  });

  return (
    <div className="container mt-4">
      {message && <div className="alert alert-success">{message}</div>}
      <div className="mb-4">
        <button className="btn btn-success" onClick={handleAddProduct}>
          Add Product
        </button>
      </div>
      <div className="row">
        <div className="col-md-3">
          <h5>Sort By</h5>
          {Category.map((cat) => (
            <div className="form-check" key={cat.id}>
              <input
                type="checkbox"
                id={cat.id}
                value={cat.value}
                onChange={() => handleChange(cat.value)}
                className="form-check-input"
              />
              <label className="form-check-label" htmlFor={cat.id}>
                {cat.value}
              </label>
            </div>
          ))}
        </div>
        <div className="col-md-9">
          <form className="d-flex mb-3" onSubmit={(e) => e.preventDefault()}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              value={searchQuery}
              aria-label="Search"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="btn btn-outline-success text-white bg-success"
              type="button"
            >
              Search
            </button>
          </form>
          <div className="row">
            {filteredProducts.map((product) => (
              <div
                className="col-md-4 mb-4 p-2"
                key={product.productid}
              >
                <div className="card shadow-sm h-100">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-center">{product.title}</h5>
                    <p className="card-text text-center text-muted">
                      {product.category}
                    </p>
                    <div className="d-flex justify-content-center mb-2">
                      <span className="text-decoration-line-through me-2">
                        ${product.price}
                      </span>
                      <span className="h5">${product.priceAfterDiscount}</span>
                    </div>
                    <div className="d-flex justify-content-center mb-2">
                      <button
                        className="btn btn-outline-success btn-sm me-2"
                        onClick={() => handleCardpopup(product)}
                      >
                        Edit
                      </button>
                      {product.display_status === false ? (
                        <button className="btn btn-danger me-2" disabled>
                          Disabled
                        </button>
                      ) : (
                        <button className="btn btn-success me-2" disabled>
                          Enabled
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
