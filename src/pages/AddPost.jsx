import React, { useState, useEffect, useRef } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { toast } from 'react-toastify';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import { useNavigate } from 'react-router-dom';
import AddPostForm from '../components/posts/AddPostForm';

const AddPost = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    tag: '',
    image: '',
  });

  const { title, text, tag, image } = formData;
  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({
            ...formData,
            author: user.displayName,
            userRef: user.uid,
          });
        } else {
          navigate('/login');
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line
  }, [isMounted]);

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${auth.currentUser.uid}-${image.name}`;

        const storageRef = ref(storage, 'images/' + fileName);

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
              default:
                break;
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    const imgUrl = await Promise.all(
      [...image].map((img) => storeImage(img))
    ).catch(() => {
      setLoading(false);
      toast.error('Image not uploaded');
      return;
    });

    const formDataCopy = {
      ...formData,
      imgUrl: imgUrl[0],
      timestamp: serverTimestamp(),
    };
    delete formDataCopy.image;

    const docRef = await addDoc(collection(db, 'posts'), formDataCopy);
    toast.success('Post saved');
    setLoading(false);
    navigate(`/${docRef.id}`);
  };

  return (
    <AddPostForm
      onSubmit={onSubmit}
      loading={loading}
      title={title}
      text={text}
      tag={tag}
      setFormData={setFormData}
    />
  );
};

export default AddPost;
