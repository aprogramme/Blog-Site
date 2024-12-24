// import React from 'react'
// import Blog from '../Blog'
// import { useEffect, useState } from 'react'

// const IndexPage = () => {
//   const [posts, setPosts] = useState([])
//   useEffect(() => {
//     fetch('http://localhost:4000/post').then(response => {
//       response.json().then(posts => {
//         setPosts(posts);
//       });
//     })

//   }, [])
  
//   return (
//     <>
//       {posts.length > 0 && posts.map(post => {
//         <Blog {...post}/>
//       })}
//     </>
//   )
// }

// export default IndexPage



import React, { useEffect, useState } from 'react';
import Blog from '../Blog';

const IndexPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/post')
      .then(response => response.json())
      .then(posts => {
        setPosts(posts);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  return (
    <>
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <Blog key={index} {...post} />
        ))
      ) : (
        <p>No posts available</p>
      )}
    </>
  );
};

export default IndexPage;
