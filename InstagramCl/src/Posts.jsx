import React, { useEffect, useState } from 'react'

function Posts() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('https://instagramclone-fhdt.onrender.com/reels').
            then((data) => data.json()).
            then((data => setPosts(data))).
            catch(err => console.log(err))
    }, []);

    return (
        <div className='d-flex justify-content-center'>
            {posts.length > 0 ? (
                <div>
                    {posts.map((post) => (
                        <div className='my-3' key={post.id}>
                            <div className='dp d-flex'>
                                <img className='rounded-circle' src={post.profilePic} alt="ProfilePic" />
                                <h5>{post.username}</h5>
                            </div>
                            <video className="vidpost" controls autoPlay muted loop playsInline>
                                <source src={post.video} type="video/mp4" />
                            </video>
                            <div>
                                <i className="bi bi-heart"></i>
                                <i className="bi bi-chat"></i>
                                <i className="bi bi-send"></i>
                            </div>
                            <div>
                                <b>{post.likes} Likes</b>
                            </div>
                            <p>{post.caption}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div>Loading Posts</div>
            )}
        </div>
    )
}

export default Posts