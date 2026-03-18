import React, { useState } from 'react'
import Loader from './Loader';
import axios from 'axios';

const Addproducts = () => {

  const [product_name, setProductName] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [product_cost, setProductCost] = useState("");
  const [product_photo, setProductPhoto] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handlesubmit = async (e) => {
    //prevent site from reloading
    e.preventDefault()

    //set loading that activates it
    setLoading(true)

    try{
      //create form data
      const formdata = new FormData()

      //append
      formdata.append("product_name", product_name);
      formdata.append("product_description", product_description);
      formdata.append("product_cost", product_cost);
      formdata.append("product_photos", product_photo)

      //interact with axios to help interact with post
      const response = await axios.post ("https://modcom2026a.alwaysdata.net/api/add_product",formdata)

      //set the loading
      setLoading(false)

      setSuccess(response.data.message)
      //clearing the hooks
      setProductName("");
      setProductDescription("");
      setProductCost("");
      setProductPhoto("");
      setTimeout(() => {

        setSuccess("");

      }, 5000);

    }
    catch{
      setLoading(false)

      //update error message
      setError(error.message)
    }
  }
  return (
    <div className="row justify-content-center mt-4">
      <div className="card shadow col-md-4 p-4">
        <h3>Welcome to adding a product</h3>
        {/* Bind the loading hook */}
        {loading && <Loader />}
        <h4 className="text-success">{success}</h4>
        <h4 className="text-danger">{error}</h4>


        <form onSubmit={handlesubmit}>
          <input type="text"
          placeholder='Enter the product name'
          className='form-control'
          required
          value={product_name}
          onChange={(e) => setProductName (e.target.value)} /> <br />

          <input type="text"
          placeholder='Enter product description'
          className='form-control'
          required
          value={product_description}
          onChange={(e) => setProductDescription (e.target.value)} /> <br />

          <input type="number"
          placeholder='Enter product cost'
          className='form-control'
          required
          value={product_cost}
          onChange={(e) => setProductCost(e.target.value)} /> <br />

          <label className='text-primary'>Enter photo</label>
          <input type="file"
          className='form-control'
          required
          accept="image/*"
          onChange={(e) => setProductPhoto(e.target.files[0])} /> <br />

          <input type="submit"
          value="Add Product"
          className='btn btn-outline-primary' />
        </form>
      </div>
    </div>
  )
}

export default Addproducts;
