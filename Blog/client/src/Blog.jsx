import React from 'react'
import { format } from 'date-fns';
import { formatISO9075 } from 'date-fns';
import {Link} from 'react-router-dom'

const Blog = ({_id, title, summary, content, cover, createdAt, author}) => {
  return (
    <div className="post">
        <div className="image">
          <Link to={`/post/${_id}`}>
            <img src={'http://localhost:4000/'+cover} alt="" />
          </Link>
        </div>
        <div className="text">
          <Link to={`/post/${_id}`}>
            <h2>{title}</h2>
          </Link>
          <p className="info">
            <a className="author">{author.username}</a>
            {/* <time>{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time> */}
            <time>{formatISO9075(new Date(createdAt))}</time>
          </p>
          <p className='summary'>{summary}</p>
        </div>
    </div>
  )
}

export default Blog


// import React from 'react';
// import { format, formatISO9075 } from 'date-fns';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

// const Blog = ({ _id, title, summary, content, cover, createdAt, author }) => {
//   return (
//     <div className="post">
//       <Link to={`/post/${_id}`}>
//         <div className="image">
//           <img src={'http://localhost:4000/' + cover} alt={title} />
//         </div>
//       </Link>
//       <div className="text">
//         <Link to={`/post/${_id}`}>
//           <h2>{title}</h2>
//         </Link>
//         <p className="info">
//           <a className="author">{author?.username || 'Unknown Author'}</a>
//           <time>{createdAt ? formatISO9075(new Date(createdAt)) : 'Date not available'}</time>
//         </p>
//         <p className="summary">{summary}</p>
//       </div>
//     </div>
//   );
// };

// Blog.propTypes = {
//   _id: PropTypes.string.isRequired,
//   title: PropTypes.string.isRequired,
//   summary: PropTypes.string.isRequired,
//   content: PropTypes.string,
//   cover: PropTypes.string.isRequired,
//   createdAt: PropTypes.string.isRequired,
//   author: PropTypes.shape({
//     username: PropTypes.string,
//   }),
// };

// export default Blog;
