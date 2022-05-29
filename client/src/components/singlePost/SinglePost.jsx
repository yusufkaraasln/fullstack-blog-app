import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../../context/Context";
import "./singlePost.scss";

function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMod, setUpdateMod] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setDesc(res.data.desc);
      setTitle(res.data.title);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete("/posts/" + path, {
        data: {
          username: user.username,
        },
      });
      window.location.replace("/");
    } catch (e) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put("/posts/" + path, {
        username: user.username,
        title,
        desc,
      });
      // window.location.reload();
      setUpdateMod(false);
    } catch (e) {}
  };

  return (
    <div className="singlePost">
      <div className="singlePost-wrapper">
        {post.photo && (
          <img src={PF + post.photo} className="singlePost-wrapper__img" />
        )}

        {updateMod ? (
          <input
            type="text"
            className="singlePost-wrapper__input"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePost-wrapper__title">
            {title}

            {post.username === user?.username && (
              <div className="singlePost-wrapper__title__edit">
                <i
                  className="singlePost-icon far fa-edit"
                  onClick={() => setUpdateMod(true)}
                ></i>
                <i
                  className="singlePost-icon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}

       

        {updateMod ? (
          <textarea
            className="singlePost-wrapper__description__input"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
         <>
         
         <p className="singlePost-wrapper__description">{desc}</p>
          <div className="singlePost-wrapper__info">
          <span className="singlePost-wrapper__info__author">
            Yazar:
            <Link to={`/?user=${post.username}`}><b>@{post.username}</b>
            </Link>
          </span>
          <span className="singlePost-wrapper__info__date">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
         
         </>
        )}

        {updateMod && (
          <button className="singlePost-wrapper__button" onClick={handleUpdate}>
            Gönder
          </button>
        )}
      </div>
    </div>
  );
}

export default SinglePost;
