import React, { useRef, useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage"
import { app } from '../firebase';

export default function Profile() {
  const [file, setFile] = useState(null);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setfileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const fileRef=useRef();
  const {currentUser}=useSelector((state)=>state.user);

  // console.log(formData);
  // console.log(filePercentage);
  // console.log(fileUploadError);

  useEffect(() => {
    if(file){
      handleFile(file);
    }
  }, [file]);

  const handleFile=(file)=>{
    const storage=getStorage(app);
    const fileName= new Date().getTime() + file.name;
    const storageRef=ref(storage,fileName);
    const uploadTask=uploadBytesResumable(storageRef,file);

    uploadTask.on('state_changed',
    (snapshot)=>{
        const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        // console.log("upload is ",progress,"% done");
        setFilePercentage(Math.round(progress));
      },
      (error)=>{
        setfileUploadError(true);
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then(
        (downloadURL)=>{
          setFormData({...formData,avatar:downloadURL});
        }
      )
    }
  );
  }
  return (
    <div className=' p-3 max-w-lg mx-auto'>
      <h1 className=' text-center text-3xl font-semibold my-7'>Profile</h1>
      <form className=' flex flex-col gap-4'>
        <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*'/>
        <img onClick={()=>fileRef.current.click()} className=' rounded-full h-24 w-24 object-cover cursor-pointer self-center' src={formData.avatar||currentUser.avatar} alt="profile" />
        <p className='text-center text-sm'>
        {
          (fileUploadError)?
          (<span className=' text-red-700'>File Upload Error Image must be lesser than 2mb</span>):(
            (filePercentage>0 && filePercentage<100)?(
              <span className=' text-slate-600'>{filePercentage} % uploaded</span>
            ): filePercentage===100?
            (<span className=' text-green-500'>File upload Success</span>):
            ""
          )
        }
        </p>
        <input type="text" id='username' placeholder='username' className='border p-3 rounded-lg'/>
        <input type="text" id='email' placeholder='email' className='border p-3 rounded-lg'/>
        <input type="password" id='password' placeholder='password' className='border p-3 rounded-lg'/>
        <button className=' bg-slate-800 text-white rounded-lg p-3 uppercase hover:opacity-90'>update</button>
      </form>
      <div className=" flex justify-between">
        <span className=' text-red-700 cursor-pointer'>Delete Account</span>
        <span className=' text-red-700 cursor-pointer'>Signout</span>
      </div>
    </div>
  )
}
