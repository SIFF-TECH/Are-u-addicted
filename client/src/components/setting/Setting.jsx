import "./Setting.css";
import React, { useState } from 'react';
export default function Setting() {
  const [profilePic, setProfilePic] = useState('http://res.cloudinary.com/dikpupfzu/image/upload/v1525474876/profile_avatar.png');

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const newProfilePic = e.target.result;
        setProfilePic(newProfilePic);
      };

      reader.readAsDataURL(file);
    }
  };
  return (
    <div className='Info'>
         
        <div class="right11">
        <h2>Profile Settings</h2><br /><br /><br />
        <div className="edit-pic">
          <img className="avatar11" src={profilePic} alt="" />
          
          <input type="file" id="profilePicInput" onChange={handleProfilePicChange} accept="image/*" style={{ display: 'none' }} />

          <button onClick={() => document.getElementById('profilePicInput').click()}>Change Picture</button>
        </div>
        
        <div class="form11">
          <div>
            
            <div class="field11">
              <label className="label11" for="">Email</label>
              <input class="full_name11"
                     type="text"
                     name="email" />
            </div>
            <div class="field11">
              <label className="label11" for="">Password</label>
              <input class="full_name11"
                     type="text"
                     name="password" />
            </div>
            <div class="field11">
              <label className="label11" for="">Confirme Password</label>
              <input class="full_name11"
                     type="text"
                     name="full-name" />
            </div>
          </div>
        </div>
        <div class="bottom11">
          <a href="#"><button class="button11 button_left" type="submit" name="button">Save Changes</button></a>
          <a href="#"><button class="button11 button_right" type="cancel" name="button">Cancel</button></a>
        </div>
      </div>
          
    </div>
  );
}
