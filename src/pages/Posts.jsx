import React, { useEffect, useState } from 'react';
import classes from './Posts.module.css';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';

const Posts = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsRef = collection(db, 'posts');

        const q = query(postsRef, orderBy('timestamp', 'desc'), limit(10));

        const querySnap = await getDocs(q);

        const fetchedPosts = [];

        querySnap.forEach((doc) => {
          return fetchedPosts.push({
            id: doc.id,
            data: doc.data(),
            time: doc.data().timestamp.toDate().toDateString(),
          });
        });

        setPosts(fetchedPosts);
        setLoading(false);
      } catch (error) {
        toast.error('Could not fetch posts');
        setLoading(false);
      }
    };

    fetchPosts();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <p>...Loading</p>;
  }

  return (
    <div>
      <div className={classes['posts-container']}>
        {posts.map((post) => (
          <div key={post.id} className={classes['post']}>
            <img
              src={post.data.imgUrl}
              alt={post.data.title}
              className={classes['post-image']}
            />
            <div className={classes['posts-content']}>
              <h1>{post.data.title}</h1>
              <p className={classes['posts-credentials']}>
                Published by: {post.data.author} on {post.time}
              </p>
              <p className={classes['posts-category']}>{post.data.tag}</p>

              <p>{post.data.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
