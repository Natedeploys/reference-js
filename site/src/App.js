import React from "react";
import styles from "./App.module.scss";

const App = () => {
  return (
    <div className={styles.Container}>
      <nav className={styles.Menu}>
        <div className={styles.Logo}>
          <div className={styles.Sign} />
          <span>Reference JS</span>
        </div>
      </nav>
      <div className={styles.Banner}>
        <h2>We make Reference conversion easy!</h2>
        <span>All-in-one easy-to-use online reference tools</span>
      </div>
      <div className={styles.Cards}>
        <div className={styles.Card}>
          <h4>Bibtex-to-JSON</h4>
          <span>Convert Bibtex .bib files to JSON</span>
        </div>
        <div className={styles.Card}>
          <h4>JSON-to-Bibtex</h4>
          <span>Convert JSON to Bibtex .bib files</span>
        </div>
      </div>
      <div className={styles.Footer}>
        <span>Open source made with ♥ for the people of the internet</span>
      </div>
    </div>
  );
};

export default App;
