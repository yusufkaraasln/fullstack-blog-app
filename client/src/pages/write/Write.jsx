import "./write.scss";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (e) {}
    }

    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (e) {}
  };

  return (
    <div className="write">
      {file && (
        <img className="write-img" src={URL.createObjectURL(file)} alt="" />
      )}

      <form className="write-form"
          onSubmit={handleSubmit}
      
      >
        <div className="write-form-group">
          <label htmlFor="file-input">
            <i className="write-icon fas fa-plus"></i>
          </label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            id="file-input"
            style={{ display: "none" }}
          />
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Başlık"
            className="write-form-group__input"
            autoFocus={true}
          />
        </div>

        <div className="write-form-group">
          <textarea
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Blog içeriği giriniz..."
            type="text"
            className="write-form-group__input_textarea"
          ></textarea>
        </div>

        <button
          className="write-form_submit"
          type="submit"
        >
          Gönder
        </button>
      </form>
    </div>
  );
}

export default Write;
