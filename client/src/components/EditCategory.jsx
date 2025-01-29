import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/UploadImage';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError';

const EditCategory = ({close, fetchData,data : CategoryData}) => {
    const [data,setData] = useState({
        _id : CategoryData._id,
        name : CategoryData.name,
        image : CategoryData.image
    })
    console.log(`this is dtaa ${data._id} `)
    const [loading,setLoading] = useState(false)
    const [imagePreview,setPreview] = useState(null)
    

    const handleOnChange = (e)=>{
        const {name,value} = e.target

        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!data.name || !data.image) {
          toast.error("Please provide both category name and image.");
          return;
        }
    
        try {
          setLoading(true);
    
          // Create FormData and append fields
          const formData = new FormData();
          formData.append("name", data.name);
          formData.append("_id", data._id);
           

                
        if (data.image && data.image instanceof File) {
            // If it's a file, append it to FormData
            formData.append("image", data.image);
            
       
        }

          const response = await Axios({
            ...SummaryApi.updateCategory, // Use your API configuration
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
          });
    
          const { data: responseData } = response;
    
          if (responseData.success) {
            toast.success(responseData.message);
            close();
            fetchData(); // Refresh data
          } else {
            toast.error("Failed to update category.");
          }
        } catch (error) {
          toast.error(error.message || "An error occurred.");
        } finally {
          setLoading(false);
        }
      };



  const handleUploadCategoryImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
     
    const imageURL = URL.createObjectURL(file);

    setData((prev) => ({
      ...prev,
      image: file, // Store the file object for later upload
    }));
    

    setPreview(imageURL);
  };


  return (
    <section className='fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center'>
    <div className='bg-white max-w-4xl w-full p-4 rounded'>
        <div className='flex items-center justify-between'>
            <h1 className='font-semibold'>Update Category</h1>
            <button onClick={close} className='w-fit block ml-auto'>
                <IoClose size={25}/>
            </button>
        </div>
        <form className='my-3 grid gap-2' onSubmit={handleSubmit}>
            <div className='grid gap-1'>
                <label id='categoryName'>Name</label>
                <input
                    type='text'
                    id='categoryName'
                    placeholder='Enter category name'
                    value={data.name}
                    name='name'
                    onChange={handleOnChange}
                    className='bg-blue-50 p-2 border border-blue-100 focus-within:border-primary-200 outline-none rounded'
                />
            </div>
            <div className='grid gap-1'>
                <p>Image</p>
                <div className='flex gap-4 flex-col lg:flex-row items-center'>
                    <div className='border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded'>
                        {
                            typeof data.image === "string" ? (
                                <img
                                    alt='category'
                                    src= {"http://localhost:5000/"+(data.image)}
                                    className='w-full h-full object-scale-down'
                                />
                            ) : (
                                <img
                                alt='category'
                                src= {imagePreview}
                                className='w-full h-full object-scale-down'
                            />
                            )
                        }
                        
                    </div>
                    <label htmlFor='uploadCategoryImage'>
                        <div  className={`
                        ${!data.name ? "bg-gray-300" : "border-primary-200 hover:bg-primary-100" }  
                            px-4 py-2 rounded cursor-pointer border font-medium
                        `}>
                            {
                                loading ? "Loading..." : "Upload Image"
                            }
                           
                        </div>

                        <input disabled={!data.name} onChange={handleUploadCategoryImage} type='file' id='uploadCategoryImage' className='hidden'/>
                    </label>
                    
                </div>
            </div>

            <button
                className={`
                ${data.name && data.image ? "bg-primary-200 hover:bg-primary-100" : "bg-gray-300 "}
                py-2    
                font-semibold 
                `}
            >Update Category</button>
        </form>
    </div>
    </section>
  )
}

export default EditCategory
