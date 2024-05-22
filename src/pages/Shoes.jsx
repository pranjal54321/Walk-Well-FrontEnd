import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "./AdminHeader";
import { createURL } from "../constant";
import AuthGuard from './AuthGuard';
 
export default function Shoes() {
  const [product, setProduct] = useState([]);
  const [shoesId, setshoesId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [category, setCategory] = useState([]);
  const [addUpdateFlag, setAddUpdateFlag] = useState(true);

 
  useEffect(() => {
    getData();
    getAllCategory();
  }, []);
 

  const getData = () => {
    const url=createURL('api/Products');
    axios
      .get(url)
      .then((result) => {
       
        if (result.status === 200) {
         
          setProduct(result.data);
          
        }
      })
      .catch((error) => {
        console.log("error"+error);
      });
 
  };
 
  const deleteShoes = (e, id) => {
   
    e.preventDefault();
   
    const url = createURL(`api/Products/${id}`);
    axios
     
      .delete(url)
      .then((result) => {
        console.log(result);
        
        if (result.status === 200) {
          getData();
          alert("product deleted successfully");
        }
      })
      
  };
 
  const editShoes = (e, id) => {
    e.preventDefault();
    setAddUpdateFlag(false);
 
    const url = createURL(`api/Products/${id}`);
    axios
      .get(url)
      .then((result) => {
        const data = result.data;
          setshoesId(id);
          setName(data.productName);
          setDescription(data.productDescription);
          setUnitPrice(data.price);
          setStock(data.stock);
          setImageUrl(data.imageURL);

      })
      .catch((error) => {
        console.log(error);
      });
  };
 

 
  const getAllCategory = () => {
    const url = createURL('api/Categories');
    axios
      .get(url)
      .then((response) => {
        setCategory(response.data);
      
      })
  }
  const addProduct = () => {
    const data = {
      productName: name,
      productDescription: description,
      price: unitPrice,
      stock: stock,
      imageURL: imageUrl,
     
      categoryId: categoryId,
 
    };
    const url = createURL('api/Products');
    axios
      .post(url, data)
      .then((result) => {
 
        console.log(result);
        if (result.status === 200) {
          alert("Product added successfully!");
          getData();
         
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
 
  const updateShoes = () => {
    
    
    const data = {
      productId:shoesId,
      productName: name,
      productDescription: description,
      price: unitPrice,
      stock: stock,
      imageURL: imageUrl,
    
 
      categoryId: categoryId,
    };
    const url = createURL(`api/Products/${shoesId}`);
    axios
      .put(url, data)
      .then((result) => {
        console.log(result);
        const dt = result.data;
        console.log(dt);
        if (result.status === 200) {
          alert("data updated successfully");
          getData();
         
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
 
 
  return (
    <Fragment>
      <AdminHeader />
      <br></br>
      <div>
        <div
          className="form-row"
          style={{ width: "80%", backgroundColor: "white",  margin: " auto" }}
        >
          <div className="form-group col-md-12">
            <h3>WalkWell Management</h3>
          </div>
          <div className="form-group col-md-6">
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="form-control"
              required
              value={name}
            />
          </div>
          <div className="form-group col-md-6">
            <input
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="form-control"
              required
              value={description}
            />
          </div>
 
          <div className="form-group col-md-6">
            <input
              type="text"
              className="form-control"
              id="validationTextarea"
              placeholder="UnitPrice"
              onChange={(e) => setUnitPrice(e.target.value)}
              required
              value={unitPrice}
            ></input>
          </div>
          <div className="form-group col-md-6">
            <input
              type="text"
              onChange={(e) => setStock(e.target.value)}
              placeholder="Stock"
              className="form-control"
              required
              value={stock}
            />
          </div>
          <div className="form-group col-md-6">
            <input
              type="link"
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Image Url"
              className="form-control"
              required
              value={imageUrl}
            />
          </div>
          
          <div className="form-group col-md-6">
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          <option value="">Select a category</option>
          {category.map((cat, index) => (
            <option key={index} value={cat.categoryId}>
              {cat.categoryName}
            </option>
          ))}
        </select>
      </div>
         
          <div className="form-group col-md-6">
 
            {addUpdateFlag ? (
              <button
                className="btn btn-primary"
                style={{ width: "150px", float: "left" }}
                // onClick={(e) => uploadFile(e)}
                onClick={addProduct}
              >
                Add
              </button>
            ) : (
              <button
                className="btn btn-primary"
                style={{ width: "150px", float: "left" }}
               onClick={() => updateShoes()}
              >
                Update
              </button>
            )}
            <button
              className="btn btn-danger"
              style={{ width: "150px" }}
            // onClick={(e) => Clear(e)}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      {product ? (
        <table
          className="table stripped table-hover mt-4"
          style={{ backgroundColor: "white", width: "80%", margin: "0 auto" }}
        >
          <thead className="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">UnitPrice</th>
              <th scope="col">Stock</th>
              <th scope="col">Image</th>
            
             
              <th scope="col" colSpan="2">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {product.map((val, index) => {
              return (
                <tr key={index}>
                  <td scope="row">{index + 1}</td>
                  <td>{val.productName}</td>
                  <td>{val.productDescription}</td>
                  <td>{val.price}</td>
                  <td>{val.stock}</td>
                  <td>
                    <img
                      src={val.imageURL}
                      style={{ width: "70px", borderRadius: "11px" }}
                    />
                   
                  </td>
                
                 
                  <td>
                    <button
                     onClick={(e) => editShoes(e, val.productId)}
                    >
                      Edit
                    </button>{" "}
                  </td>
                  <td>
                    <button
                    onClick={(e) => deleteShoes(e, val.productId)}
                    >
                      Delete
                    </button>{" "}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        "No data found"
      )}
      <AuthGuard/>
    </Fragment>
  );
 
}