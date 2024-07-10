"use client";
import Layout from "@components/Layout";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const page = () => {
  const MySwal = withReactContent(Swal);
  const [isEditCategory, setisEditCategory] = useState(null);
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentcategory] = useState("");
  const [properties, setProperties] = useState([]);
  const saveCategory = async (e) => {
    e.preventDefault();
    const data = {
      name,
      parentCategory,
      properties: properties.map((p) => ({
        name: p.name,
        value: p.value.split(","),
      })),
    };
    if (isEditCategory) {
      await axios.put(`/api/categories/${isEditCategory._id}`, data);
      setisEditCategory(null);
    } else {
      await axios.post("/api/categories", data);
    }
    setName("");
    setParentcategory("");
    setProperties([]);
    getAllCategories();
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  const getAllCategories = async () => {
    await axios.get("/api/categories").then((response) => {
      setCategories(response.data);
    });
  };
  const deleteCategory = async (category) => {
    MySwal.fire({
      title: <p>Are you sure?</p>,
      text: `do you want to delete ${category.name}?`,
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Yes, Delete!",
      reverseButtons: true,
      confirmButtonColor: "#FF0000",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`/api/categories/${category._id}`);
        getAllCategories();
      }
    });
  };
  const editCategory = async (category) => {
    setisEditCategory(category);
    setName(category.name);
    setProperties(
      category?.properties.map(({ name, value }) => ({
        name,
        value: value.join(","),
      }))
    );
    setParentcategory(category.parent?._id);
  };
  const AddProperties = () => {
    if (name.length == 0) {
      alert("Name should not be empty");
      return;
    }
    setProperties((prev) => {
      return [...prev, { name: "", value: "" }];
    });
  };
  const handlepropNameChange = (index, property, newName) => {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  };
  const handlepropValuesChange = (index, property, newValues) => {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].value = newValues;
      return properties;
    });
  };
  const removeProperty = (index) => {
    setProperties((prev) => {
      const Properties = [...prev].filter((p, pIndex) => {
        return index !== pIndex;
      });
      return Properties;
    });
  };
  return (
    <Layout>
      <h1 className="font-bold text-slate-800 text-xl mb-2">Categories</h1>
      <label htmlFor="">
        {isEditCategory
          ? `Edit Category ${isEditCategory.name}`
          : "Create New Category"}
      </label>
      <form onSubmit={saveCategory} className="">
        <div className="flex gap-1">
          <input
            type="text"
            placeholder="New category"
            onChange={(e) => setName(e.target.value)}
            className=""
            value={name}
          />
          <select
            name=""
            id=""
            className=""
            value={parentCategory}
            onChange={(e) => setParentcategory(e.target.value)}
          >
            <option value=""> No Parent Category</option>
            {categories.length > 0 &&
              categories.map((category) => (
                <option value={category._id}>{category.name}</option>
              ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="" className="block ">
            Properties
          </label>
          <button
            type="button"
            onClick={AddProperties}
            className="bg-slate-500 text-sm p-1 text-white rounded-lg "
          >
            Add new Properties
          </button>
          {properties.length > 0 &&
            properties.map((property, index) => (
              <div className="flex gap-1 mt-2 mb-2">
                <input
                  type="text"
                  value={property.name}
                  placeholder="Property name (ex: color)"
                  className="mb-0"
                  onChange={(e) =>
                    handlepropNameChange(index, property, e.target.value)
                  }
                />
                <input
                  type="text"
                  value={property.value}
                  placeholder="Property value (ex: black,red)"
                  className="mb-0"
                  onChange={(e) =>
                    handlepropValuesChange(index, property, e.target.value)
                  }
                />
                <button
                  type="button"
                  onClick={() => removeProperty(index)}
                  className="bg-slate-500 text-sm p-1 rounded-lg text-white "
                >
                  Remove
                </button>
              </div>
            ))}
        </div>
        <div className="flex gap-1">
          {isEditCategory && (
            <button
              type="button"
              onClick={() => {
                setisEditCategory(null);
                setName("");
                setParentcategory("");
                setProperties([]);
              }}
              className="bg-slate-500  text-white rounded-lg p-1"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="bg-slate-700 text-white py-1 rounded-lg px-4 "
          >
            Save
          </button>
        </div>
      </form>
      {!isEditCategory && (
        <table className="basic_styling mt-2">
          <thead>
            <tr>
              <td>Categories</td>
              <td>Parent Category</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 &&
              categories.map((category) => (
                <tr>
                  <td>{category.name}</td>
                  <td>{category?.parent?.name}</td>
                  <td className="flex">
                    <button
                      onClick={() => editCategory(category)}
                      className="bg-slate-100  text-slate-700 rounded-sm ml-1 px-1 py-[0.15rem] border border-slate-600  flex items-center text-sm gap-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-4 h-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCategory(category)}
                      className="bg-slate-100  text-slate-700 rounded-sm ml-1 px-1 py-[0.15rem] border border-slate-600 flex items-center  text-sm gap-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-4 h-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
};

export default page;
