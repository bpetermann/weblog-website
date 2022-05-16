import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import PostsList from '../components/posts/PostsList';

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
            author: doc.data().author,
            title: doc.data().title,
            imgUrl: doc.data().imgUrl,
            tag: doc.data().tag,
            text: doc.data().text.slice(0, 100),
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

  return <PostsList posts={posts} loading={loading} />;
};

export default Posts;
