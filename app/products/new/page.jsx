"use client";
import Layout from "@/components/Layout";
import React, { useState } from "react";
import axios from "axios";
import { redirect } from "next/navigation";
import ProductForm from "@/components/ProductForm";
const page = () => {
  return (
    <Layout>
      <h1 className="text-2xl text-slate-800 font-bold">New Products</h1>
      <ProductForm></ProductForm>
    </Layout>
  );
};

export default page;
