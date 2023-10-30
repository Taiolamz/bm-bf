import { SearchIcon } from "../../../../assets/icons/icons";
import { EventChange } from "../../../types/types";
import "./search.css";

interface SearchProps {
  handleSearchTable: (searchText: string) => void;
  searchValue: string;
  placeholder?: string;
  className?: string;
}

const Search = ({
  handleSearchTable,
  searchValue,
  placeholder,
  className,
}: SearchProps) => {
  return (
<div className={`search-container`}>
      {/* search start */}
      <div className="search-wrap">
        <input
          type="text"
          value={searchValue}
          placeholder={placeholder || "search user or activity keyword"}
          id="search"
          className={`search-input ${className}`}
          onChange={(e: EventChange) => handleSearchTable(e.target.value)}
        />
        <label htmlFor="search" className="label">
          <figure className="icon">{SearchIcon}</figure>
        </label>
      </div>
      {/* search end */}
    </div>
  );
};
export default Search;
