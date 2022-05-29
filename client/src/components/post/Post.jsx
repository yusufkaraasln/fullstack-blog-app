import "./post.scss";
import { Link } from "react-router-dom";

function post({ post }) {
  const PF = "http://localhost:5000/images/";
  return (
    <div className="post">
      {post.photo && <img src={PF + post.photo} alt="" className="post-img" />}
      <div className="post-info">
        <div className="post-categories">
          {post.categories.map((c) => {
            <span className="post-categorie">{c.name}</span>;
          })}
        </div>

        <Link to={`/post/${post._id}`}>
          <span className="post-title">{post.title}</span>
        </Link>
        <hr />
        <span className="post-date">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="post-description">{post.desc}</p>
    </div>
  );
}

export default post;
