import React, { useState, useEffect, useRef } from 'react';
import classes from './AddPost.module.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import { toast } from 'react-toastify';
// import { db } from '../firebase.config';
import { useNavigate } from 'react-router-dom';

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
      isMounted.curren = false;
    };
    // eslint-disable-next-line
  }, [isMounted]);

  const onChangeHandler = (e) => {
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        image: e.target.files,
      }));
    }

    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
    }
    console.log(formData);
  };

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

    const imgUrls = await Promise.all(
      [...image].map((img) => storeImage(img))
    ).catch(() => {
      setLoading(false);
      toast.error('Image not uploaded');
      return;
    });

    console.log(imgUrls);

    setLoading(false);
  };

  if (loading) {
    return <p>...Loading</p>;
  }

  return (
    <div className={classes['container']}>
      <header>
        <h1>Write a Post</h1>
      </header>
      <form className={classes['form']} onSubmit={onSubmit}>
        <input
          type='text'
          className={classes['titleInput']}
          placeholder='Title'
          id='title'
          value={title}
          onChange={onChangeHandler}
          required
        />
        <textarea
          type='text'
          className={classes['textInput']}
          placeholder='Text'
          id='text'
          value={text}
          onChange={onChangeHandler}
          required
        />
        <input
          type='tag'
          className={classes['tagInput']}
          placeholder='Tag'
          id='tag'
          value={tag}
          onChange={onChangeHandler}
        />

        <label className={classes['image-label']}>Image</label>
        <input
          className={classes['imageInput']}
          type='file'
          id='image'
          onChange={onChangeHandler}
          max='1'
          accept='.jpg,.png,.jpeg'
        />
        <button type='submit' className={classes['submit-button']}>
          Add Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
