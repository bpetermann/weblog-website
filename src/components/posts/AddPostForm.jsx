import React from 'react';
import Spinner from '../shared/Spinner';
import classes from './AddPostForm.module.css';

const AddPostForm = ({ loading, onSubmit, title, text, tag, setFormData }) => {
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
  };

  if (loading) {
    return <Spinner />;
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

export default AddPostForm;
