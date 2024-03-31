import {RxCross2} from 'react-icons/rx';
import { Modal } from "@mui/material";
import { useCurrentContext } from "../../context/currentContext";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import React,{useState} from 'react';
import { BiInfoCircle } from 'react-icons/bi';
function SignUp({onModelClick,val}){
  const navigate=useNavigate();
  const{setLogin,profile,setProfile}=useCurrentContext();
  const[userName,setUserName]=useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");    
  const[userNameError,setUserNameError]=useState(null);
  const[emailError,setEmailError]=useState(null);
  const[pwdError,setPwdError]=useState(null);
  const[signUpBtn,setSignUpBtn]=useState(true);

  function isValidEmail(mail) {
    return /\S+@\S+\.\S+/.test(mail);
  }
  const handleEmail=(e)=>{
    const emailValue=e.target.value;
    setEmail(emailValue);    
    setEmailError(!isValidEmail(emailValue)?"No account found for this email. Retry, or Sign up for Quora.":null)         
    handleSignUpBtn(userName,emailValue,password)  
  }
  const handlePwd=(e)=>{
    const passwordValue=e.target.value;
    setPassword(passwordValue);
    setPwdError(passwordValue.length<8?'Password must be 8 characters':null)
    handleSignUpBtn(userName,email,e.target.value) 
  }
  const handleUserName=(e)=>{
    const nameValue=e.target.value;
    setUserName(nameValue)
    setUserNameError(nameValue.trim().length < 3?'Username must be at least 3 characters.' : null)
    handleSignUpBtn(nameValue,email,password)
  }
  const handleSignUpBtn=(userName, email, password)=>{  
    setSignUpBtn(!(userName&&email&&password&&isValidEmail(email)&&password.length>=8&&userName.trim().length>=3))  
  }
  const fetchSignup=async()=>{
    var requestOptions = {
      method: 'POST',
      headers: {
        "projectId": "f104bi07c490",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "name": userName,
        email,
        password,
        "appType": "quora"
      }),
      redirect: 'follow'
    };
    try{
      const response=await fetch("https://academics.newtonschool.co/api/v1/user/signup", requestOptions)
      if(!response.ok){
        throw new Error('Failed to Signup');
      }
      return await response.json();
    }
    catch(error){
      throw error;
    }
   
  } 

const handleSignUpClick=async()=>{
  try {
    if (isValidEmail(email) && password.length >= 8) {   
      const response=await fetchSignup(); 
      if(response.status=="success"){
        setLogin(true);
        const{data, token}=response;
        const userProfile={
          userName: data.user.name,
          image:"",
          token,
          id:data.user._id
        }
        localStorage.setItem('userLogin', JSON.stringify(userProfile));
        setProfile(userProfile)
        navigate('/')
      }
      else{
        setEmailError(response.message)
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
    return(
        <Modal
        open={val}
        onClose={onModelClick}  
    >
        <div className="signup-section">  
            <div className="signup-section-main"> 
                <div className="signup-close-icone">
                    <RxCross2 onClick={onModelClick}/>
                </div> 
                <div className="signup-container">
                    <h3>Sign up</h3>
                    <div className="sign-auth">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username"
                         value={userName}
                         onChange={(e) => handleUserName(e)}
                        />
                        {userNameError&&
                            <div className="flex w-5/6 gap-1">
                              <div className="text-red-600 mt-1"><BiInfoCircle /></div>
                              <div className="text-[13px] text-red-600">{userNameError}</div>
                            </div>
                          }
                    </div>
                    <div className="sign-auth">
                        <label htmlFor="email">Email</label>
                        <br/>
                        <input type="email" 
                        id="email"
                        value={email}
                        onChange={(e) => handleEmail(e)}
                        />
                         {emailError&&
                            <div className="flex w-5/6 gap-1">
                              <div className="text-red-600 mt-1"><BiInfoCircle /></div>
                              <div className="text-[13px] text-red-600">{emailError}</div>
                            </div>
                          }
                    </div>
                    <div className="sign-auth">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password"
                        value={password}
                        onChange={(e)=>handlePwd(e)}/>
                         {pwdError&&
                            <div className="flex w-5/6 gap-1">
                              <div className="text-red-600 mt-1"><BiInfoCircle /></div>
                              <div className="text-[13px] text-red-600">{pwdError}</div>
                            </div>
                          }
                    </div>
                    <div className="sign-auth-btn-sec">
                    <button className={`sign-auth-btn hover:bg-blue-300 ${signUpBtn?"bg-blue-300":"bg-blue-600"}`} 
                    onClick={handleSignUpClick}
                    disabled={signUpBtn}
                    >Sign Up</button>
                    </div>
                </div>
            </div>   
        </div>
    </Modal>
    )
}
export default SignUp;