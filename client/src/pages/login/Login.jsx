import axios from "axios";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./login.scss";

function Login() {


  const userRef = useRef()
  const passwordRef = useRef()
  const { dispatch,isFetching} = useContext(Context)

  const handleSubmit = async(e) => {
    e.preventDefault();
    dispatch({type:"LOGIN_START"})
    try{
        const res = await axios.post("/auth/login",{
          username:userRef.current.value,
          password:passwordRef.current.value
        })

        dispatch({type:"LOGIN_SUCCESS",payload:res.data})
    }catch(e){
      dispatch({type:"LOGIN_FAILURE"})
    }
  };

 
  return (
    <div className="login">
      <span className="login-title">Giriş Yap</span>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>Kullanıcı Adı</label>
        <input type="text" ref={userRef} placeholder="Kullanıcı adınızı giriniz..." />

        <label>Şifre</label>
        <input type="password" ref={passwordRef} placeholder="Şifrenizi giriniz..." />
       <div className="buttons">
       <button type="submit"  disabled={isFetching} className="login-form-button">
          Giriş Yap
        </button>
        <button className="login_register-button">
        <Link to="/register">Kayıt Ol</Link>
      </button>
       </div>
      </form>
      
    </div>
  );
}

export default Login;
