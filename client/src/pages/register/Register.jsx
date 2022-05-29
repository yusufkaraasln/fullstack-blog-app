import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.scss";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });

      res.data && window.location.replace("/login");
    } catch (e) {
      setError(true);
    }
  };

  return (
    <div className="register">
      <span className="register-title">Kayıt Ol</span>
      <form onSubmit={handleSubmit} className="register-form">
        <label>Kullanıcı Adı</label>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Kullanıcı Adınızı giriniz..."
        />

        <label>E-Mail</label>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-Mail adresinizi giriniz..."
        />

        <label>Şifre</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Şifrenizi giriniz..."
        />
       <div className="buttons">
       <button type="submit" className="register-form-button">
          KAYIT OL
        </button>
      <button className="register_login-button">
        <Link to="/login">Giriş Yap</Link>
      </button>
       </div>
      </form>
      {error && (
        <span
          style={{ color: "white", textAlign: "center", marginTop: "10px" }}
        >
          Bazı şeyler ters gitti ve Kayıt İşlemi Gerçekleşemedi.
        </span>
      )}
    </div>
  );
}

export default Register;
