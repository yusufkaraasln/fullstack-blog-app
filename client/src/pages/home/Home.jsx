import { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.scss";
import axios from "axios";
import { useLocation } from "react-router-dom";
import LoadingPosts from "../../components/loadingPosts/LoadingPost";
function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search);
      setPosts(res.data);
      setLoading(false);
    };
    fetchPosts();
  }, [search]);

  return (
    <>
      <Header></Header>

      <div className="home">
        {loading ? <LoadingPosts></LoadingPosts> : <Posts posts={posts}></Posts>}

        <Sidebar></Sidebar>
      </div>
    </>
  );
}

export default Home;
