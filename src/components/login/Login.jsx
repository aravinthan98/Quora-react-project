import React, { useReducer, useState } from "react";
import "./Login.scss";
import {MdArrowForwardIos} from 'react-icons/md';
import {RxCross2} from 'react-icons/rx';
import { useNavigate } from "react-router-dom";

import { Modal } from "@mui/material";
import { useCurrentContext } from "../../context/currentContext";


// import {
//   auth,
//   googleProvider,
//   facebookProvider,

// } from "./firebase";
// import { signInWithPopup } from "firebase/auth";
const Login = () => {
  const{setLogin,profile,setProfile}=useCurrentContext();
  const[userName,setUserName]=useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const[openModal,setOpenModal]=useState(false);
    const navigate=useNavigate();


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
        token:`${result.token}`
        })
        var myObject = {
            userName: `${result.data.user.name}`,
            image:"",
            token:`${result.token}` 
        };

          localStorage.setItem('userLogin', JSON.stringify(myObject));
        
          return navigate('/')
        }
        else{
 
      }

})
.catch(error => console.log('error', error));
}  
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
          token:`${result.token}`
          })
          var myObject = {
              userName: `${result.data.name}`,
              image:"",
              token:`${result.token}` 
          };
  
            localStorage.setItem('userLogin', JSON.stringify(myObject));
            console.log("result.token",result.token)
            console.log("result",result)
            return navigate('/')
        }
        else{
            // setMessage(result.message);
            // setError(true)
        }
      
    })
      .catch(error => console.log('error', error));
  }   
    function isValidEmail(mail) {
      return /\S+@\S+\.\S+/.test(mail);
    }
const handleSignUpClick=()=>{
    console.log("called");
  if( email && password&&userName){
      if(!isValidEmail(email)){      
        console.log("emailinvali");
     }

     else if(password.length<8){
      console.log("passwordlength");
     }      
     else{
      fetchSignup();
     }
  }
  else{   

  }
  
}
const handleLoginClick=()=>{
   
  if( email && password){
     if(!isValidEmail(email)){       
          
     }
     else if(password.length<8){

     }
     else{
      fetchLogin()
     }
        
  }
  else{   
    
  }
 
  
}



  // const signInWithGoogle = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, googleProvider);
  //     setProfile({
  //       ...profile,
  //   userName: `${result.user.displayName}`,
  //   image:`${result.user.photoURL}`,
  //   token:`${result.user.accessToken}`
  //   })
  //   var myObject = {
  //       userName: `${result.user.displayName}`,
  //       image:`${result.user.photoURL}`,
  //       token:`${result.user.accessToken}`
  //   };

  //   localStorage.setItem('userLogin', JSON.stringify(myObject));
  
  //   return navigate('/')
      
  //   } catch (err) {
  //     alert(err.message);
  //     return false;
  //   }
  // };

  // const signInWithFacebook = async () => {
  //   try {
  //     const res = await signInWithPopup(auth, facebookProvider);
  //     console.log(res);
  //   } catch (err) {
  //     alert(err.message);
  //     return false;
  //   }
  // };

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
                    <div className="signup-btn" onClick={()=>setOpenModal(true)}>SignUp</div>

                </div>
                <Modal
                    open={openModal}
                    onClose={() => setOpenModal(false)}  
                >
                    <div className="signup-section">  
                        <div className="signup-section-main"> 
                            <div className="signup-close-icone">
                                <RxCross2 onClick={()=>setOpenModal(false)}/>
                            </div> 
                            <div className="signup-container">
                                <h3>Sign up</h3>
                                <div className="sign-auth">
                                    <label htmlFor="">Username</label>
                                    <input type="text" id="username"
                                     value={userName}
                                     onChange={(e) => setUserName(e.target.value)}
                                    />
                                </div>
                                <div className="sign-auth">
                                    <label htmlFor="email">Email</label>
                                    <input type="text" id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="sign-auth">
                                    <label htmlFor="password">Password</label>
                                    <input type="text" id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                                <div className="sign-auth-btn-sec">
                                <button className="sign-auth-btn" 
                                onClick={handleSignUpClick}
                                >Sign Up</button>
                                </div>
                            </div>
                        </div>   
                    </div>
                </Modal>
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
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            placeholder="Your email"
                            />
                        </div>
                        <div className="login__inputField">
                            <label htmlFor="password">Password</label>
                            <input
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Your password"
                            />
                        </div>
                    </div>

                    <div className="login__forgButt">
                    <small>Forgot Password?</small>
                    <button 
                    onClick={handleLoginClick}
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
            <p>About</p>
            <p>Languages</p>
            <p>Careers</p>
            <p>Businesses</p>
            <p>Privacy</p>
            <p>Terms</p>
            <p>Contact</p>
            <p>&copy; Quora Clone Inc. 2023</p>
            </div>
        </div>
    </div>
  );
};

export default Login;
