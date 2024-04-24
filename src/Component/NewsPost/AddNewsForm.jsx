import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './NewsPost.css'
import { postNews } from '../../Services/News/PostNews';
import Swal from 'sweetalert2';
import { useAuth } from '../../Security/AuthContext';

const AddNewsForm = () => {

    const AuthContext=useAuth()
    const nic=AuthContext.nic;

  const formik = useFormik({
    initialValues: {
      newsHeader: '',
      newsDescription: '',
      imgUrl: null,
      proImgUrl: null,
    },
    validationSchema: Yup.object({
      newsHeader: Yup.string().required('News header is required').max(255, 'News header is too long'),
      newsDescription: Yup.string().required('News description is required').max(5000, 'News description is too long'),
    }),
    onSubmit: async (values) => {

      try {
        console.log(values)
        console.log(nic)
        const response = await postNews(values,nic)
        if (response.status === 200) {
            showSuccessAlert(response.data)  
          } else {
        
            console.error("Update failed:", response.statusText);
          }
      } catch (error) {
        console.error('Error adding news:', error);
            showErrorAlert(error)
      }
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    formik.setFieldValue(event.target.name, file);
  };


  //............
  const showSuccessAlert = (message) => {
    Swal.fire({
      text: message,
      icon: "success",
      confirmButtonColor: "#243e4f",
    });
  };


  //.............................
  const showErrorAlert = (message) => {
    Swal.fire({
      text: message,
      icon: "error",
      confirmButtonColor: "#243e4f",
    });
  };

  return (
  
        <form onSubmit={formik.handleSubmit}>
        <div className='post-container'> 
        <label htmlFor="newsHeader">News Header</label>
        <input
            id="newsHeader"
            name="newsHeader"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newsHeader}
            className='newheader'
        />
        {formik.touched.newsHeader && formik.errors.newsHeader ? (
            <div className='error'>{formik.errors.newsHeader}</div>
        ) : null}

        <label htmlFor="newsDescription">News Description</label>
        <textarea
            id="newsDescription"
            name="newsDescription"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newsDescription}
            rows={6}
        />
        {formik.touched.newsDescription && formik.errors.newsDescription ? (
            <div className='error'>{formik.errors.newsDescription}</div>
        ) : null}

        <label htmlFor="imgUrl">Image URL</label>
        <input
            id="imgUrl"
            name="imgUrl"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className='choose-file'
        />

        <button className='button' type="submit">Submit</button> 
        </div>
        </form>
   
  );
};

export default AddNewsForm