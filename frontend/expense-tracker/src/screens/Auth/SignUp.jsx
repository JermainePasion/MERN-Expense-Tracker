import React, {useContext, useState} from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import {Link, useNavigate} from 'react-router-dom'
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';
import uploadImage from '../../utils/uploadImage';


function SignUp() {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const  { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
        e.preventDefault();

        
        let profileImageUrl = "";

        if(!fullName) {
          setError("Please enter your name");
          return;
        }

        if(!validateEmail((email))){
          setError("Please enter a valid email address.");
          return;
        }
    
        if(!password){
          setError("Incorrect Password");
          return;
        }
    
        setError("");

        //api call


        try{
          //upload image
          if (profilePic) {
            const imgUploadRes = await uploadImage(profilePic);
            profileImageUrl = imgUploadRes.imageUrl || "";
          }
          const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
              fullName,
              email,
              password,
              profileImageUrl
          });

          const {token, user} = response.data;

          if (token) {
            localStorage.setItem("token", token);
            updateUser(user);
            navigate("/login")
          }
        }catch(error){
          if(error.response && error.response.data.message){
            setError(error.response.data.message);
          } else{
            setError("Something went wrong. Please try again.")
          }

        }
  }

  return (
    
      <div className=' w-full lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center items-center mx-auto'>
        <h2 className=' mt-20 text-xl font-semibold text-black'>Create An Account</h2>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Enter your details below</p>

        <form onSubmit={handleSignup} className='w-full max-w-2xl'>

          <ProfilePhotoSelector image={profilePic} setImage = {setProfilePic}/>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 m-3 '>
            <Input
            value = {fullName}
            onChange = {({ target }) => setFullName(target.value)}
            label = "Full Name"
            placeholder="John Doe"
            type="text"
            />
            <Input
          value = {email}
          onChange = {({ target }) => setEmail(target.value)}
          label = "Email Address"
          placeholder="sample@gmail.com"
          type="text"
          />
          <div className='col-span-2'>
            <Input
            value = {password}
            onChange = {({ target }) => setPassword(target.value)}
            label = "Password"
            placeholder="Enter your password"
            type="password"
            />
          </div>
          </div>
          {error && <p className='text-red-500 text-xs pb-2.5 '>{error}</p>}
                    <button type = "submit" className='btn-primary ' >
                      Sign Up
                    </button>
          
                    <p className='text-[13px] text-slate-800 mt-3'>
                      Already have an account?{" "}
                      <Link className='font-medium text-primary underline' to="/login" >
                      Login
                      </Link>
                    </p>
        </form>

      </div>

  )
}

export default SignUp