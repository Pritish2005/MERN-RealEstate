import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from '../firebase';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
} from '../redux/user/userSlice';

export default function Profile() {
  const [file, setFile] = useState(null);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setfileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const fileRef = useRef();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFile(file);
    }
  }, [file]);

  const handleFile = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
      },
      (error) => {
        setfileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(
          (downloadURL) => {
            setFormData({ ...formData, avatar: downloadURL });
          }
        )
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  
  console.log(formData);

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-center text-3xl font-semibold my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*' />
        <img onClick={() => fileRef.current.click()} className='rounded-full h-24 w-24 object-cover cursor-pointer self-center' src={formData.avatar || currentUser.avatar} alt="profile" />
        <p className='text-center text-sm'>
          {
            fileUploadError ?
              (<span className='text-red-700'>File Upload Error Image must be lesser than 2mb</span>) : (
                filePercentage > 0 && filePercentage < 100 ? (
                  <span className='text-slate-600'>{filePercentage} % uploaded</span>
                ) : filePercentage === 100 ?
                  (<span className='text-green-500'>File upload Success</span>) :
                  ""
              )
          }
        </p>
        <input
          type='text'
          placeholder='username'
          defaultValue={currentUser.username}
          id='username'
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='email'
          id='email'
          defaultValue={currentUser.email}
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          onChange={handleChange}
          id='password'
          className='border p-3 rounded-lg'
        />
        <button type='submit' disabled={loading} className='bg-slate-800 text-white rounded-lg p-3 uppercase hover:opacity-90'>
          {loading?"...loading":"Update"}
        </button>
      </form>
      <div className="flex justify-between">
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Signout</span>
      </div>
      <p className='text-red-700 mt-5'>{error ? error : ''}</p>
      <p className='text-green-700 mt-5'>
        {updateSuccess ? 'User is updated successfully!' : ''}
      </p>
    </div>
  )
}
