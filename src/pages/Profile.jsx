import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import UserProfile from '../components/user/UserProfile';

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
          preview: doc.data().text.slice(0, 25),
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

  return (
    <UserProfile
      isLoading={isLoading}
      name={name}
      email={email}
      posts={posts}
      onDeleteHandler={onDeleteHandler}
      logoutHander={logoutHander}
    />
  );
};

export default Profile;
