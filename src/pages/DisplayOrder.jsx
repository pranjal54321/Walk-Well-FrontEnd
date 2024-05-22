import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createURL } from "../constant";
import axios from "axios";
import { setAuthToken } from "./Productview";
import { Navbar, Footer } from "../components";
import CheckUser from './CheckUser';
 
const DisplayOrder = () => {

  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [orderDate, setorderDate] = useState(null);
  const [bill, setBill] = useState(null);
  const token = sessionStorage.getItem("token");
 
 
 
  useEffect(() => {
 
    if(token == undefined){
      navigate("/PageNotFound");
      return
    }
 
    else
    {
      var role = CheckUser(token);
      if ( role != "Customer") {
      navigate("/PageNotFound");
      return ;
    }
   
    }
    getOrders();
  }, [navigate]);
 
  const getOrders = () => {
    setAuthToken(sessionStorage.getItem("token"));
    const url = createURL(`api/Orders/MyOrders`);
    axios.get(url).then((res) => {
      setOrders(res.data);
    });
  };
 
 
  return (
    <>
      <Navbar />
       
 
      <div className="table-responsive">
      <h3 style={{ textAlign: "center" }}  >My Orders</h3>
      <div style={{ margin: "10px 80px 10px 80px " }}>
     
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">S.N.</th>
              <th scope="col">Order Id</th>
              <th scope="col">Product Name</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{order.orderId}</td>
                <td>{order.productName}</td>
                <td>Rs. {order.totalAmount}</td>
                <td>
          
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
 
      </div>
 
      <Footer />
    </>
  );
};
 
export default DisplayOrder;