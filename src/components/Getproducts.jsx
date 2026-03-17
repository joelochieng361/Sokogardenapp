import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from  './Loader'

const Getproducts = () => {

  //Initialize hooks to help you manage the state of your application
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //Below we specify the image base URL
  const img_url = "https://kbenkamotho.alwaysdata.net/static/images/"
  //create a function that will create an interaction with api
  const fetchProduct = async() => {
    try{
      //Update the loading hook
      setLoading(true)
      //Interact with end point for fetching the products
      const response = await axios.get("https://kbenkamotho.alwaysdata.net/api/get_products")

      //Update the product hook with the response given from the API
      setProducts(response.data)

      //set the loading hook back to default
      setLoading(false)
        }
    catch(error){
      //If there is an error
      //Set the loading back to default
      setLoading(false)

      //Update the error hook with a message
      setError(error.message)

    }
  }

  //We shall use the useEffect hook to automatically rerender new features incase of any changes
  useEffect(() => {
    fetchProduct()
  }, [])

  // console.log(products)
  return (
    <div className='row'>
      <h3 className="text-primary">Available products</h3>

      {loading && <Loader /> }
      <h4 className="text-danger">{error}</h4>
      
      {/* Map the products fetched fromthe API to the user interface */}

      {products.map((product) => (<div className="justify-content-center col-md-3 mb-3">
        <div className="card shadow">
          <img src={img_url + product.product_photo}
           alt="product name" className='product_img' />

          <div className="card-body">
            <h5 className="text-primary">{product.product_name}</h5>
            <p className="text-dark">{product.product_description.slice(0, 69)}...</p>
            <h4 className="text-info">kes {product.product_cost}</h4>
          </div>
        </div>
      </div>))}
    </div>
  )
}

export default Getproducts;
