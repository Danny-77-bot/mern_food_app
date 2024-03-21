import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useGetUserID } from '../hooks/useGetUserId';

export default function Conversations() {
  const [profiles, setProfiles] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchProfile = async () => {
      const profilesResponse = await axios.get("http://localhost:3005/profiles");
      setProfiles(profilesResponse.data);
    }
    fetchProfile();
  }, []);

  return (
    <div className='conversation'>
      <div className="conversation-content">
        {profiles.map((profile) => {
          if (profile.userOwner !== userID) {
            return (
              <div className="profile" key={profile._id}>
                <img src={`http://localhost:3005/api/assets/uploads/${profile.imageUrl}`} alt={profile.name} />
                <h2>{profile.name}</h2>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}