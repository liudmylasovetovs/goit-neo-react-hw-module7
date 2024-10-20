import { useDispatch, useSelector } from "react-redux";
import { changeFilter, selectNameFilter } from "../../redux/filtersSlice";
import styles from "./SearchBox.module.css";

const SearchBox = () => {
  const filter = useSelector(selectNameFilter);
  const dispatch = useDispatch();

  const handleFilterChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={styles.searchBoxContainer}>
      <label htmlFor="filter">Find contacts by name</label>
      <input
        type="text"
        id="filter"
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  );
};

export default SearchBox;