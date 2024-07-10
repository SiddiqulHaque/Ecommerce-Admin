"use client";
import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const pathname = usePathname();
  const id = pathname.split("/")[3];
  const [productInfo, setproductInfo] = useState(null);
  useEffect(() => {
    
    const getProduct = async () => {
      console.log(id);
      await axios.get(`/api/products/${id}`).then((response) => {
        console.log(response.data)
        setproductInfo(response.data);
      });
    };
    if (id) {
      getProduct();
    }
  }, [id]);
  return (
    <Layout>
      <h1 className="text-2xl text-slate-800 font-bold">Edit Product</h1>
       {productInfo && (<ProductForm {...productInfo}></ProductForm>)}
    </Layout>
  );
};

export default page;
