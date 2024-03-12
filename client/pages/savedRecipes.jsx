import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../src/hooks/useGetUserId";

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes); // Use response.data.savedRecipes here
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, [userID]);

  const deleteSavedRecipes = async (id, index) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/recipes/removeFromSave/${userID}/${id}/${index}`
      );

      if (response.status === 200) {
        // Update the savedRecipes state only if the deletion was successful
        setSavedRecipes(savedRecipes.filter(recipe => recipe._id !== id));
        console.log(response.data); // Log the response if needed
      } else {
        console.log(`Error deleting saved recipe. Status: ${response.status}`);
        console.log("the request is not found");
        // Handle the error, show a message, or perform other actions as needed
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteAllSavedRecipes=async ()=>{
       try {
          const response=await axios.delete(`http://localhost:3001/recipes/removeAllFromSave/${userID}`)
          setSavedRecipes(response.data.savedRecipes);
       } catch (error) {
        console.log(error);
       }
  }

  return (
    <div>
    <div className="first-desc">
    <h1>Saved Recipes</h1>
      <button onClick={deleteAllSavedRecipes}>clearALl</button>
    </div>
      <ul className="list-group">
        {savedRecipes.map((recipe,index) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
            </div>
            <p>{recipe.instructions}</p>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <div className="delete_recipe">
              <p>Cooking Time: {recipe.cookingTime} minutes</p>
              <button onClick={() => deleteSavedRecipes(recipe._id,index)}>delete</button>
            
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedRecipes;
