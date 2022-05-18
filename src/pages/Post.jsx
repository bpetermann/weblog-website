import React, { useState, useEffect } from 'react';
import Alert from '../components/shared/Alert';
import { useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import SinglePost from '../components/posts/SinglePost';
import Spinner from '../components/shared/Spinner';

const Post = () => {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, 'posts', params.postId);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists && docSnap.data() !== undefined) {
        setPost({
          ...docSnap.data(),
          time: docSnap.data().timestamp.toDate().toDateString(),
        });
        setIsLoading(false);
      } else {
        toast.error('Could not fetch post');
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [params.postId]);

  if (post === null) {
    return <Alert>No post found</Alert>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <SinglePost
      title={post.title}
      author={post.author}
      time={post.time}
      imgUrl={post.imgUrl}
      tag={post.tag}
      text={post.text}
    />
  );
};

export default Post;
