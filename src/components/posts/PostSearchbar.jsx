import classes from './PostSearchbar.module.css';
import { AiOutlineSearch } from 'react-icons/ai';

const PostSearchbar = ({ onChangeSearchTerm }) => {
  const searchTermHandler = (event) => {
    onChangeSearchTerm(event.target.value);
  };

  return (
    <div className={classes.container}>
      <form className={classes['search-form']}>
        <AiOutlineSearch size={32} className={classes['search-icon']} />
        <input
          type='text'
          placeholder='Search by Tag'
          className={classes.searchbar}
          onChange={searchTermHandler}
        />
      </form>
    </div>
  );
};

export default PostSearchbar;
