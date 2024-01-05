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

 
  const fetchLogin=()=>{
    var myHeaders = new Headers();
    myHeaders.append("projectId", "f104bi07c490");
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "email": `${email}`,
      "password": `${password}`,
      "appType": "quora"
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://academics.newtonschool.co/api/v1/user/login", requestOptions)
      .then((response) => response.json())
      .then((result) =>{
        if(result.status=="success"){
            setLogin(true);
           
            setProfile({
              ...profile,
          userName: `${result.data.name}`,
          image:"",
          token:`${result.token}`,
          id:`${result.data._id}`
          })
          var myObject = {
              userName: `${result.data.name}`,
              image:"",
              token:`${result.token}`,
              id:`${result.data._id}`
          };
  
            localStorage.setItem('userLogin', JSON.stringify(myObject));
            return navigate('/')
        }
        else{
     
            setPwdError(result.message);
            // setError(true)
        }
      
    })
      .catch(error => console.log('error', error));
  }   
    function isValidEmail(mail) {
      return /\S+@\S+\.\S+/.test(mail);
    }
    const handleLoginBtn=(val1,val2)=>{
        if(val1&&val2){
          setLoginBtn(false);
        }
        else{
          setLoginBtn(true);
        }
    }
    const handleEmail=(e)=>{
      setEmail(e.target.value);
      if(!isValidEmail(e.target.value)){   
        setEmailError("No account found for this email. Retry, or Sign up for Quora.")         
      }
      else{  

        setEmailError(null);
       
      }
     handleLoginBtn(e.target.value,password)
    }
    const handlePwd=(e)=>{
      const val=e.target.value
      setPassword(val);
      if(val.length<8){
        setPwdError('Password must be 8 characters')
      } 
      else{
        setPwdError(null);
      } 
      handleLoginBtn(email,e.target.value)
    }
   const handleClickModel=()=>{
    setOpenModal(!openModal)
   }


const handleLoginClick=()=>{
   
  if( email && password){
    if(!isValidEmail(email)){   
        setEmailError("No account found for this email. Retry, or Sign up for Quora.")          
    }
    else if(password.length<8){
    setPwdError('Password must be 8 characters');
    }      
    else{
    fetchLogin();
    } 
  }
  else{   
    setEmailError("No account found for this email. Retry, or Sign up for Quora.");
    setPwdError('Password must be 8 characters');
  }  
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
