import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classes from './Profile.module.css';
import { getAuth } from 'firebase/auth';
import {
  collection,
  getDocs,
  where,
  orderBy,
  query,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';

const Profile = () => {
  const auth = getAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState(null);

  const name = auth.currentUser.displayName;
  const email = auth.currentUser.email;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserPosts = async () => {
      const postsRef = collection(db, 'posts');
      const q = query(
        postsRef,
        where('userRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      );

      const querySnap = await getDocs(q);

      const posts = [];

      querySnap.forEach((doc) => {
        return posts.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setPosts(posts);
      setIsLoading(false);
    };

    fetchUserPosts();
  }, [auth.currentUser.uid]);

  const logoutHander = () => {
    auth.signOut();
    navigate('/');
  };

  const onDeleteHandler = async (postId) => {
    await deleteDoc(doc(db, 'posts', postId));
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
    toast.success('Post deleted');
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={classes['container']}>
      <header>
        <h1>{name}'s Profile</h1>
      </header>
      <p>{email}</p>
      <Link className={classes['add-post-link']} to='/add-post'>
        Add Post
      </Link>
      <button className={classes['logout-button']} onClick={logoutHander}>
        Logout
      </button>
      {posts.map((post) => (
        <div className={classes['user-posts']}>
          <p>{post.data.tag}</p>
          <p>{post.data.title}</p>
          <button onClick={() => onDeleteHandler(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Profile;
