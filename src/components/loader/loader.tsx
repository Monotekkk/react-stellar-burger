import styles from "../app/app.module.css";

export function Loader() {
    return (
        <main className={`${styles.contentLoader} mt-1`}>
            <div className={styles.loader}></div>
        </main>
    )
}