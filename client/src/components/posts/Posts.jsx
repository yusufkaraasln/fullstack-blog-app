import Post from "../post/Post"
import "./posts.scss"

function Posts({posts}) {
  return (
    <div className="posts">

       {posts.map((p,i)=>(
         <Post key={i} post={p}></Post>

       )
       )}


    </div>
  )
}

export default Posts