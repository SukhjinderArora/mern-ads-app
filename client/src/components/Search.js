import { useState, useEffect } from "react";
import axios from "axios";

import styles from "./Search.module.css";
import useDebounce from "../hooks/useDebounce";

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const onSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsLoading(true);
      axios
        .get("/api/search", {
          params: {
            search: debouncedSearchTerm,
          },
        })
        .then((results) => {
          setSearchResults(results.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <div>
      <div>
        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Search for companies"
              className={styles.input}
              value={searchTerm}
              onChange={onSearchTermChange}
            />
            <button type="button" className={styles.button}>
              <span className="material-symbols-outlined">search</span>
            </button>
          </div>
        </form>
      </div>
      {isLoading && (
        <div className={styles.loader}>
          <span className={`material-symbols-outlined ${styles.loadingIcon}`}>
            autorenew
          </span>
        </div>
      )}
      {!isLoading && (
        <div>
          {searchTerm && (
            <div className={styles.grid}>
              {searchResults.map((result, index) => (
                <div key={index} className={styles.gridItem}>
                  <h1 className={styles.companyName}>{result.company.name}</h1>
                  <p className={styles.adText}>{result.primaryText}</p>
                  <div className={styles.imageContainer}>
                    <img
                      src={result.imageURL}
                      className={styles.adImage}
                      alt={result.company.name}
                    />
                  </div>
                  <div className={styles.ctaContainer}>
                    <div className={styles.adDescription}>
                      <h2 className={styles.adHeadline}>{result.headline}</h2>
                      <p>{result.description}</p>
                    </div>
                    <div className={styles.ctaButtonContainer}>
                      <button className={styles.ctaButton}>{result.cta}</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
