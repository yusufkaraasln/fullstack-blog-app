import "./settings.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

function Settings() {
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const PF = "http://localhost:5000/images/"


  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (e) {}
    }

    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload:res.data});
    } catch (e) {
      dispatch({type:"UPDATE_FAILURE"})
    }
  };

  return (
    <div className="settings">
      <div className="settings-wrapper">
        <div className="settings-wrapper_title">
          <span className="settings-wrapper_title__update">
            Hesabını Güncelle
          </span>
        </div>
        <form onSubmit={handleSubmit} className="settings-form">
          <div className="settings-form_profile">
            <img
              id=""
              src={file ? URL.createObjectURL(file) : PF+user.profilePic}
              alt=""
              className="settings-form_image"
            />
            <label htmlFor="file-input">
            <i class="settings-form_profile-icon fa-solid fa-arrow-rotate-left"></i>
            </label>
            <input
              type="file"
              id="file-input"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
          </div>
          <label>Kullanıcı Adı</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>E-Posta</label>
          <input
            type="text"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Şifre</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settings-form_submit" type="submit">
            Güncelle
          </button>
          {success && <div className="message">
          <span style={{marginTop:"20px"}} >Hesabınız Başarı İle Güncellendi!</span>
            
            </div>}
        </form>
      </div>
    </div>
  );
}

export default Settings;
