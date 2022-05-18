import React, { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import PostsList from '../components/posts/PostsList';

const Posts = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastPost, setlastPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsRef = collection(db, 'posts');

        const q = query(postsRef, orderBy('timestamp', 'desc'), limit(5));

        const querySnap = await getDocs(q);

        const lastFetched = querySnap.docs[querySnap.docs.length - 1];
        setlastPost(lastFetched);

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

  const loadMorePostsHandler = async () => {
    try {
      const postsRef = collection(db, 'posts');

      const q = query(
        postsRef,
        orderBy('timestamp', 'desc'),
        startAfter(lastPost),
        limit(5)
      );

      const querySnap = await getDocs(q);

      const lastFetched = querySnap.docs[querySnap.docs.length - 1];
      setlastPost(lastFetched);

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

      setPosts((prevState) => [...prevState, ...fetchedPosts]);
      setLoading(false);
    } catch (error) {
      toast.success('No more posts to show');
      setLoading(false);
    }
  };

  return (
    <PostsList
      posts={posts}
      loading={loading}
      onLoadMorePosts={loadMorePostsHandler}
    />
  );
};

export default Posts;
