import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Viewstory() {

  const { id, tot } = useParams();
  const [story, setStory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://instagram-backend-pd7t.onrender.com/story/${id}`)
      .then(res => res.json())
      .then(data => setStory(data))
      .catch(err => console.log(err));
  }, [id]);

  if(id > tot || id<=0){
    navigate('/');
  }

  return (
    <div className="storycom d-flex justify-content-center align-items-center">

      <Link to={`/story/${Number(id)-1}/${tot}`}>
        <i className="back-icon1 bi bi-arrow-left-circle-fill fs-1 text-info"></i>
      </Link>

      {story ? (
        <video
          className="storypost"
          src={`/${story.video}`}
          controls
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <div>Loading...</div>
      )}

      <Link to={`/story/${Number(id)+1}/${tot}`}>
        <i className="back-icon2 bi bi-arrow-right-circle-fill fs-1 text-info"></i>
      </Link>

    </div>
  );
}

export default Viewstory;