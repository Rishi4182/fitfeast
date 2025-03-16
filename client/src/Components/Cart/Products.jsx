import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import Product from './Product'
import axios from 'axios'

function Products() {

  const [products, setProducts] = useState([]);
  

  useEffect(() => {
    // Fetching products from the API
    axios
      .get(`http://localhost:4000/product-api/product`)
      .then((res) => {
        // Assuming the products are in res.data.payload (check your API response structure)
        setProducts(res.data.payload);
      })
      .catch((err) => {
        console.log("Some Error occurred", err);
      });
  }, []); // Empty dependency array ensures the API call happens once after the initial render

  return (
    <div className="container mx-auto mt-5 mb-2">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-gap-3">
        {products.map((probj) => (
          <div className="col" key={probj.id}>
            {/* Displaying each product in a Product component */}
            <Product p={probj} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products