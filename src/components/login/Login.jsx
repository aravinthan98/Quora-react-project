import React, { useState } from "react";
import "./Login.scss";
import {MdArrowForwardIos} from 'react-icons/md';
import { useNavigate } from "react-router-dom";
import { BiInfoCircle } from "react-icons/bi";
import { useCurrentContext } from "../../context/currentContext";
import SignUp from "./signUp";

const Login = () => {
  const{setLogin,profile,setProfile}=useCurrentContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");   
  const navigate=useNavigate();
  const[emailError,setEmailError]=useState(null);
  const[pwdError,setPwdError]=useState(null);
  const[openModal,setOpenModal]=useState(false);
   const[loginBtn,setLoginBtn]=useState(true);

   function isValidEmail(mail) {
    return /\S+@\S+\.\S+/.test(mail);
  }
  const handleLoginClick=async()=>{
    try {
      if (isValidEmail(email) && password.length >= 8) {   
        const response=await fetchLogin(); 
        if(response.status=="success"){
          setLogin(true);
          const{data, token}=response;
          const userProfile={
            userName: data.name,
            image:"",
            token,
            id:data._id
          }
          localStorage.setItem('userLogin', JSON.stringify(userProfile));
          setProfile(userProfile)
          navigate('/')
        }
        else{
            setPwdError(response.message);
        } 
      }
      else{  
        if(!isValidEmail(email)){   
          setEmailError("No account found for this email. Retry, or Sign up for Quora.")          
        }
        else if(password.length<8){
        setPwdError('Password must be 8 characters');
        }      
      }
    }
    catch(error){
      console.error('Error during login:', error)
    } 
  }
  const fetchLogin=async()=>{
    var requestOptions = {
      method: 'POST',
      headers: {
        "projectId": "f104bi07c490",
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        email,
        password,
        "appType": "quora"
      }),
      redirect: 'follow'
    };
    
    const response=await fetch("https://academics.newtonschool.co/api/v1/user/login", requestOptions)
    return await response.json();
  }  

const handleEmail=(e)=>{
 const emailValue = e.target.value;
 setEmail(emailValue);
 setEmailError(!isValidEmail(emailValue) ? "No account found for this email. Retry, or Sign up for Quora." : null);
 setLoginBtn(!(emailValue&&password&&isValidEmail(emailValue)&&password.length>=8));
}
const handlePwd=(e)=>{
  const passwordValue = e.target.value;
  setPassword(passwordValue);
  setPwdError(passwordValue.length < 8 ? "Password must be at least 8 characters." : null);
  setLoginBtn(!(email&&passwordValue&&isValidEmail(email)&&passwordValue.length>=8));
}

const handleClickModel=()=>{
  setOpenModal(!openModal)
}

  return (
    <div className="login">
        <div className="login__container">
            <div className="login__logo">
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Quora_logo_2015.svg/250px-Quora_logo_2015.svg.png"
                alt=""
            />
            </div>
            <div className="login__desc">
            <p>A Place to Share knowledge and better understand the world</p>
            </div>
            <div className="login__auth">
                <div className="login__authOptions">
                    <div className="login_authText">
                    By continuing you indicate that you agree to Quora’s{" "}
                    <a href="https://www.quora.com/about/tos" target="_blank">
                        Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="https://www.quora.com/about/privacy" target="_blank">
                        Privacy Policy.
                    </a>
                    </div>
                    <div className="login__authOption"
                    //  onClick={signInWithGoogle}
                     >
                    <img
                        className="login__googleAuth"
                        src="https://media-public.canva.com/MADnBiAubGA/3/screen.svg"
                        alt=""
                    />
                    <p >
                        Continue With Google
                    </p>
                    </div>
                    <div
                    className="login__authOption"
                    // onClick={signInWithFacebook}
                    >
                    <img
                        className="login__googleAuth"
                        src="https://www.edigitalagency.com.au/wp-content/uploads/Facebook-logo-blue-circle-large-transparent-png.png"
                        alt=""
                    />
                    <p>Continue With Facebook</p>
                    </div>
                    <div className="signup-btn" onClick={handleClickModel}>SignUp</div>
                </div>
               {openModal&&
                <SignUp onModelClick={handleClickModel} val={openModal} />
               }
                <div className="login__emailPass">
                    <div className="login__label">
                    <h4>Login</h4>
                    </div>

                    <div className="login__inputFields">
                        <div className="login__inputField">
                            <label htmlFor="email">Email</label>
                            <input
                            id="email"
                            value={email}
                            onChange={(e) => handleEmail(e)}
                            type="text"
                            placeholder="Your email"
                            />
                            {emailError&&
                            <div className="flex w-5/6 gap-1">
                              <div className="text-red-600 mt-1 "><BiInfoCircle /></div>
                              <div className=" text-[13px] text-red-600">{emailError}</div>
                            </div>
                            }
                        </div>
                        <div className="login__inputField">
                            <label htmlFor="password">Password</label>
                            <input
                            id="password"
                            value={password}
                            onChange={(e) => handlePwd(e)}
                            type="password"
                            placeholder="Your password"
                            />
                            {pwdError&&
                              <div className="flex w-5/6 gap-1">
                                <div className="text-red-600 mt-1"><BiInfoCircle /></div>
                                <div className="text-[13px] text-red-600">{pwdError}</div>
                              </div>
                            }                            
                        </div>
                    </div>
                    <div className="login__forgButt">
                    <small></small>
                    <button 
                    onClick={handleLoginClick}
                    disabled={loginBtn}
                    className={`hover:bg-blue-300 ${loginBtn?"bg-blue-300":"bg-blue-600"}`}
                    >
                        Login
                    </button>
                    </div>                 
                </div>
            </div>
            <div className="login__lang">
            <a href="https://hi.quora.com/" target="_top">हिन्दी</a>
            <MdArrowForwardIos fontSize="small" />
            </div>
            <div className="login__footer">
            <a href="https://www.quora.com/about" >About</a>
            <a href="https://www.careers.quora.com/" >Careers</a>
            <a href="https://www.quora.com/about/privacy">Privacy</a>
            <a href="https://www.quora.com/about/tos">Terms</a>
            <a href="https://help.quora.com/hc/en-us/requests/new" target="_blank">Contact</a>
            <a href="https://www.quora.com/about/languages" target="_blank">Languages</a>
            <a href="https://www.quora.com/about/your_ad_choices">Your Ad choices</a>
            <a href="https://www.quora.com/press">Press</a>
            <p>&copy; Quora Clone Inc. 2024</p>
            </div>
        </div>
    </div>
  );
};

export default Login;
