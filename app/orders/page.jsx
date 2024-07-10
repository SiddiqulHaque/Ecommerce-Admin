"use client";
import Layout from "@/components/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const getorders = async () => {
      await axios.get("/api/orders").then((response) => {
        setOrders(response.data);
        console.log(response.data);
      });
      // await axios.delete("/api/orders")
    };
    getorders();
  }, []);
  return (
    <Layout>
      <h1 className="text-3xl font-bold px-4 py-2">Orders</h1>
      <table className="basic_styling">
        <thead>
          <tr>
            <th>Date</th>
            <th>Payment Status</th>
            <th>Reciepent</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {orders?.length > 0 &&
            orders.map((order) => (
              <tr>
                {/* <td>{order._id}</td>
                 */}
                <td>{new Date(order?.createdAt).toLocaleString()}</td>
                <td className="text-center  ">{order.paid ? "Yes" : "NO"}</td>
                <td>
                  Name : {order.name}
                  <br></br> Email : {order.email} <br></br>
                  Address : {order.address} {order.pCode}
                </td>
                <td>
                  {order?.line_items.map((li) => (
                    <>
                      {li?.price_data?.product_data.name} X {li?.quantity}
                      <br></br>
                    </>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default page;
