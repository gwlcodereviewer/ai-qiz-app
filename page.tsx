import Image from "next/image";
import styles from "./page.module.css";
import QuizScreen from "./components/QuizScreen";

export default function Home() {
  return (
    <main className={styles.main}>
      <QuizScreen />
    </main>
  );
}
