"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { redirect } from "next/navigation";
import { CldUploadButton } from "next-cloudinary";
const ProductForm = ({
  _id,
  Pname: ePname,
  description: edescription,
  price: eprice,
  images: eimages,
  category: ecategory,
  properties: eproperties,
}) => {
  const [Pname, setPname] = useState(ePname || "");
  const [description, setdescription] = useState(edescription || "");
  const [price, setPrice] = useState(eprice || "");
  const [gotoProducts, setGotoProducts] = useState(false);
  const [images, setImages] = useState(eimages || []);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(ecategory || "");
  const [productProp, setproductProp] = useState(eproperties || {});
  const url = [];
  const properties = [];
  if (categories.length > 0 && category) {
    let info = categories.find(({ _id }) => _id == category);
    properties.push(...info.properties);
    while (info?.parent?._id) {
      let pinfo = categories.find(({ _id }) => _id == info.parent._id);
      properties.push(...pinfo.properties);
      info = pinfo;
    }
  }
  useEffect(() => {
    const getAllCategories = async () => {
      const res = await axios.get("/api/categories").then((result) => {
        setCategories(result.data);
      });
    };
    getAllCategories();
  }, []);
  const SaveProduct = async (e) => {
    e.preventDefault();
    const data = { Pname, description, price, images, category, productProp };
    if (_id) {
      await axios.put("/api/products", { ...data, _id });
    } else {
      await axios.post("/api/products", data);
    }
    setGotoProducts(true);
  };
  if (gotoProducts) {
    return redirect("/products");
  }
  const uploadImages = async (event) => {};
  const handleProductProp = (propName, value) => {
    setproductProp((prev) => {
      const newProp = { ...prev };
      newProp[propName] = value;
      return newProp;
    });
  };
  return (
    <form action="" onSubmit={SaveProduct}>
      <label htmlFor="">Product Name</label>
      <input
        type="text"
        placeholder="Name of the product"
        value={Pname}
        onChange={(e) => setPname(e.target.value)}
      />
      <label htmlFor="">Description</label>
      <textarea
        name=""
        id=""
        cols="30"
        rows="5"
        placeholder="Description of the product"
        value={description}
        onChange={(e) => setdescription(e.target.value)}
      ></textarea>
      <label htmlFor="">Price (in Rupee)</label>
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <label htmlFor="">Category</label>
      <select
        name=""
        id=""
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      >
        <option value="">No category selected</option>
        {categories &&
          categories.map((category) => (
            <option value={category?._id}>{category?.name}</option>
          ))}
      </select>

      {properties.length > 0 &&
        properties.map((p) => (
          <div className="flex gap-1">
            <div>{p.name}</div>
            <select
              name=""
              id=""
              value={productProp[p.name]}
              onChange={(e) => handleProductProp(p.name, e.target.value)}
            >
              {p.value.map((p) => (
                <option value={p}>{p}</option>
              ))}
              ))
            </select>
          </div>
        ))}
      <label htmlFor="">Images</label>
      <div className="mb-2">
        <div className="flex gap-1 mb-2">
          {!!images?.length &&
            images.map((link) => (
              <div className="">
                <img
                  src={link}
                  alt=""
                  srcset=""
                  className="h-16 w-full rounded-sm"
                />
              </div>
            ))}
        </div>

        <CldUploadButton
          options={{ multiple: true, sources: ["local"] }}
          uploadPreset="ECommerce"
          signatureEndpoint="/api/auth/cloudinary"
          onUpload={(result, widget) => {
            url.push(result?.info.secure_url);
            setImages((oldImages) => {
              return [...oldImages, ...url];
            });
          }}
        >
          <div className=" rounded-lg w-20 h-20 bg-slate-300 flex flex-col justify-center items-center shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
              />
            </svg>
            <span className="text-sm font-semibold  ">Upload</span>
          </div>
        </CldUploadButton>

        {!images?.length && <div>No Images available of this product</div>}
      </div>

      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
};

export default ProductForm;
