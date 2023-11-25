import Title from "./components/Title/Title";
import styles from "./styles/app.module.css";

function App() {
  return (
    <>
      <main className={styles.app}>
        <header>
          <Title name="Akash Agarwal" />
        </header>
      </main>
    </>
  );
}

export default App;
