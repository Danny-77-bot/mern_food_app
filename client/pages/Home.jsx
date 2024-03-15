import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../src/hooks/useGetUserId";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isPostSaved, setIsPostSaved] = useState({});
  const userID = useGetUserID();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3005/posts");
        setPosts(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPosts();
  }, []);

  const savePost = async (postId) => {
    try {
      console.log("Post ID:", postId);
      console.log("User ID:", userID);

      const response = await axios.put("http://localhost:3005/posts", {
        postId,
        userID
      });

      console.log("Response from server:", response.data);

      // Update local state
      setIsPostSaved((prevState) => ({
        ...prevState,
        [postId]: true
      }));

      // Update local storage
      localStorage.setItem("savedPosts", JSON.stringify({
        ...isPostSaved,
        [postId]: true
      }));
    } catch (error) {
      console.error("Error while saving post:", error);
    }
  };


      const deleteCreatedPost = async (postId) => {
  try {
    const response = await axios.delete("http://localhost:3005/posts/deletePost", {
      data: { userID, postId } // Send userID and postId as an object
    });
    console.log(response.data);

    // Remove the deleted post from the local state
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <div className="home-post-box">
              <h2>{post.name}</h2>
              <div>{post.description}</div>
              <div className="home-btn">
                <button
                  onClick={() => savePost(post._id)}
                  disabled={isPostSaved[post._id]} // Disable button if post is already saved
                >
                  {isPostSaved[post._id] ? "Saved" : "Save"}
                </button>
                {post.userOwner === userID && (
                  <button onClick={() => deleteCreatedPost(post._id)}>X</button>
                )}
              </div>
              {post.imageUrl && (
                <img
                  src={`http://localhost:3005/api/assets/uploads/${post.imageUrl}`}
                  alt={post.name}
                />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;