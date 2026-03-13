import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Profiles() {

    const [profile, setProfile] = useState(null);
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        axios.get('https://instagramclone-fhdt.onrender.com/profile').
        then(data => setProfile(data.data)).
        catch(err => console.log(err))

        axios.get('https://instagramclone-fhdt.onrender.com/followers').
        then(data => setFollowers(data.data)).
        catch(err => console.log(err))
    },[]);

    function HandleOnChange(e){
        setProfile(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleUpdate = async () => {
        axios.put('https://instagramclone-fhdt.onrender.com/profile',profile).
        then(console.log("Updated")).
        catch(err => console.log(err))
    }

    const handleUnFollow = async (id) => {
        axios.delete(`https://instagramclone-fhdt.onrender.com//followers/${id}`)
        .then(alert("UnFollwed..."))
        .catch(err => console.log(err))
    }

  return (
    <div className='m-5'>
        { profile ? (
            <div>
                <img src={profile.profilePic} className='profile rounded-circle' />
                <h5>{profile.username}</h5>

                <input type="text"
                       name='username'
                       value={profile.username}
                       className='form-control my-4'
                       onChange={HandleOnChange}
                 />

                 <input type="text"
                        name='profilePic'
                        value={profile.profilePic}
                        className='form-control my-4'
                        onChange={HandleOnChange}
                  />

                  <button className='btn btn-primary my-4'
                          onClick={handleUpdate}
                  >
                    Update
                  </button>
            </div>
        ) : (
            <div>Profile Loading...</div>
        )}

        { followers.length>0 ? (
            followers.map(follwer => (
                <div key={follwer.id} className='d-flex my-2'>
                    {follwer.username}
                    <button className='btn btn-danger ms-auto' onClick={() => {handleUnFollow(follwer.id)}}>UnFollow</button>
                </div>
            ))
        ) : (
            <div>Loading Followers...</div>
        )}
    </div>
  )
}

export default Profiles