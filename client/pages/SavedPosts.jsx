import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../src/hooks/useGetUserId";

export default function SavedRecipes() {
  const [savedPosts, setSavedPosts] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3005/posts/savedPosts/${userID}`
        );
        setSavedPosts(response.data.savedPosts);
      } catch (err) {
        console.error("Error fetching saved posts:", err);
      }
    };
    fetchSavedPosts();
  }, [userID]); // Include userID as a dependency for useEffect

  const deleteSavedPost = async (postID) => {
    try {
      await axios.delete(`http://localhost:3005/posts/deleteSaved/${postID}`);
      setSavedPosts(savedPosts.filter((post) => post._id !== postID));
    } catch (error) {
      console.error("Error deleting saved post", error);
    }
  };

  return (
    <div>
      <h1>Saved Posts</h1>
      <ul>
        {savedPosts.map((post) => (
          <li key={post._id}>
            <div>
              <button onClick={() => deleteSavedPost(post._id)}>X</button>
              <h2>{post.name}</h2>
            </div>
            <p>{post.description}</p>
            {post.imageUrl && (
              <img src={`http://localhost:3005/api/assets/uploads/${post.imageUrl}`} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}