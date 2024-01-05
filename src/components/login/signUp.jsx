import {RxCross2} from 'react-icons/rx';
import { Modal } from "@mui/material";
import { useCurrentContext } from "../../context/currentContext";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import React,{useState} from 'react';
import { BiInfoCircle } from 'react-icons/bi';
function SignUp({onModelClick,val}){
    const{setLogin,profile,setProfile}=useCurrentContext();
    const[userName,setUserName]=useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");   
    const navigate=useNavigate();
    const[userNameError,setUserNameError]=useState(null);
    const[emailError,setEmailError]=useState(null);
    const[pwdError,setPwdError]=useState(null);
    const[signUpBtn,setSignUpBtn]=useState(true);

    
  const fetchSignup=()=>{
    var myHeaders = new Headers();
    myHeaders.append("projectId", "f104bi07c490");
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "name": `${userName}`,
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
    
    fetch("https://academics.newtonschool.co/api/v1/user/signup?projectId=f104bi07c490&Content-Type=application/json", requestOptions)
    .then((response) => response.json())
    .then((result) =>{
     
      if(result.status=="success"){
      
          setLogin(true);
       
          setProfile({
            ...profile,
        userName: `${result.data.user.name}`,
        image:"",
        token:`${result.token}`,
        id:`${result.data.user_id}`
        })
        var myObject = {
            userName: `${result.data.user.name}`,
            image:"",
            token:`${result.token}`,
            id:`${result.data.user._id}`
        };

          localStorage.setItem('userLogin', JSON.stringify(myObject));
        
          return navigate('/')
        }
        else{
         
          setEmailError(result.message);

      }

})
.catch(error => console.log('error', error));
} 
  function isValidEmail(mail) {
    return /\S+@\S+\.\S+/.test(mail);
  }

  const handleSignUpBtn=(val1,val2,val3)=>{
    if(val1&&val2&&val3){
      setSignUpBtn(false)
    }
    else{
      setSignUpBtn(true);
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
    handleSignUpBtn(userName,e.target.value,password)
   
  }
  const handlePwd=(e)=>{
    setPassword(e.target.value);
    if(e.target.value.length<8){
      setPwdError('Password must be 8 characters')
    } 
    else{
      setPwdError(null);
    }
    handleSignUpBtn(userName,email,e.target.value) 
  }
  const handleUserName=(e)=>{
    setUserName(e.target.value)
    handleSignUpBtn(e.target.value,email,password)
  }
const handleSignUpClick=()=>{
  
  if( email && password&&userName){
      if(!isValidEmail(email)){   
        setEmailError("No account found for this email. Retry, or Sign up for Quora.")          
     }
     else if(password.length<8){
      setPwdError('Password must be 8 characters');
     }      
     else{   
        fetchSignup();        
     }
  }
  else{   
    setEmailError("No account found for this email. Retry, or Sign up for Quora.");
    setPwdError('Password must be 8 characters');
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