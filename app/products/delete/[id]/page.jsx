"use client";
import Layout from "@/components/Layout";
import { redirect, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
const page = () => {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split("/")[3];
  const [productInfo, setproductInfo] = useState(null);
  useEffect(() => {
    const getProduct = async () => {
      console.log(id);
      await axios.get(`/api/products/${id}`).then((response) => {
        console.log(response.data);
        setproductInfo(response.data);
      });
    };
    if (id) {
      getProduct();
    }
  }, [id]);
  function GoBack() {
    router.push("/products");
  }
  const deleteProduct = async () => {
    await axios.delete(`/api/products/${id}`).then(() => {
      router.push("/products");
    });
  };
  return (
    <Layout>
      <h1 className="text-center text-3xl">
        Do you want to delete <b> "{productInfo?.Pname}" ?</b>
      </h1>
      <div className="flex gap-2 justify-center">
        <Button
          onClick={() => deleteProduct()}
          className="bg-red-800 hover:bg-red-800 text-white px-4 py-1 rounded-md"
        >
          Yes
        </Button>
        <Button
          onClick={()=>GoBack()}
          className="bg-slate-700 text-white px-4  py-1 rounded-md"
        >
          No
        </Button>
      </div>
    </Layout>
  );
};

export default page;
