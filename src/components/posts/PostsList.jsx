import React from 'react';
import classes from './PostsList.module.css';
import { Link } from 'react-router-dom';

const PostsList = ({ posts, loading }) => {
  if (loading) {
    return <p>...Loading</p>;
  }

  return (
    <div className={classes['posts-container']}>
      {posts.map((post) => (
        <div key={post.id} className={classes['post']}>
          <Link to={`/${post.id}`} className={classes['image-link']}>
            <img
              src={post.imgUrl}
              alt={post.title}
              className={classes['post-image']}
            />
          </Link>

          <div className={classes['posts-content']}>
            <h1>{post.title}</h1>
            <p className={classes['posts-credentials']}>
              Published by: {post.author} on {post.time}
            </p>
            <p className={classes['posts-tag']}>{post.tag}</p>
            <p>{post.text} […]</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostsList;
