import React from 'react';
import classes from './UserProfile.module.css';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import Spinner from '../shared/Spinner';

const UserProfile = ({
  isLoading,
  name,
  email,
  posts,
  onDeleteHandler,
  logoutHander,
}) => {
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={classes['container']}>
      <header className={classes['header']}>
        <h1>Profile</h1>
        <button className={classes['logout-button']} onClick={logoutHander}>
          Logout
        </button>
      </header>
      <div className={classes['user-details']}>
        <h3 className={classes['user-name']}>{name}</h3>
        <p className={classes['user-email']}>{email}</p>
      </div>
      <Link className={classes['add-post-link']} to='/add-post'>
        Add Post
      </Link>
      <h3 className={classes['posts-title']}>Your Posts</h3>
      {posts.map((post) => (
        <div key={post.id} className={classes['user-posts']}>
          <img
            src={post.data.imgUrl}
            alt={post.title}
            className={classes['post-image']}
          />
          <div className={classes['post-content']}>
            <h3 className={classes['post-title']}>{post.data.title}</h3>
            <p className={classes['post-tag']}>{post.data.tag}</p>
            <p>{post.preview}[...]</p>
            <FaTrashAlt
              size={20}
              className={classes['delete']}
              onClick={() => onDeleteHandler(post.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserProfile;
