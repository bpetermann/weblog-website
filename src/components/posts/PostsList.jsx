import React, { useState } from 'react';
import classes from './PostsList.module.css';
import PostSearchbar from './PostSearchbar';
import Spinner from '../shared/Spinner';
import Button from '../shared/Button';
import { Link } from 'react-router-dom';

const PostsList = ({ posts, loading, onLoadMorePosts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  if (loading) {
    return <Spinner />;
  }

  const searchTermChangeHandler = (text) => {
    setSearchTerm(text);
  };

  let filteredItems = posts.filter((post) => {
    return post.tag.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <PostSearchbar onChangeSearchTerm={searchTermChangeHandler} />
      <div className={classes['posts-container']}>
        {filteredItems.map((post) => (
          <div key={post.id} className={classes['post']}>
            <Link to={`/posts/${post.id}`} className={classes['image-link']}>
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
      <div className={classes['button-container']}>
        <Button onClick={onLoadMorePosts}> Load More</Button>
      </div>
    </>
  );
};

export default PostsList;
