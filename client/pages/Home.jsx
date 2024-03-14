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

    const fetchSavedPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3005/posts/savedPosts/${userID}`
        );
        const savedPostsData = response.data.savedPosts;
        const savedState = savedPostsData.reduce((acc, post) => {
          acc[post._id] = true;
          return acc;
        }, {});
        setIsPostSaved(savedState);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPosts();
    fetchSavedPosts();
  }, [userID]);

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
      setIsPostSaved(prevState => ({
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

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <div>
              <h2>{post.name}</h2>
              <button
                onClick={() => savePost(post._id)}
                disabled={isPostSaved[post._id]} // Disable button if post is already saved
              >
                {isPostSaved[post._id] ? "Saved" : "Save"}
              </button>
              {post.imageUrl && (
                <img
                  src={`http://localhost:3005/api/assets/uploads/${post.imageUrl}`}
                  alt={post.name}
                />
              )}
              <div>{post.description}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
