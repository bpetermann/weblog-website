import React from 'react';
import classes from './SinglePost.module.css';

const SinglePost = ({ title, author, time, imgUrl, tag, text }) => {
  return (
    <div className={classes['post']}>
      <header>
        <h1>{title}</h1>
        <p>
          Published by: {author} on {time}
        </p>
      </header>
      <main>
        <img src={imgUrl} alt={title} className={classes['post-image']} />
        <p className={classes['post-tag']}>{tag}</p>
        <p>{text}</p>
      </main>
    </div>
  );
};

export default SinglePost;
