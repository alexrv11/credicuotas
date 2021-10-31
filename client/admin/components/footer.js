
import styles from "./footer.module.css"
import ProTip from "./ProTip"
import Copyright from "./Copyright"

export default function Footer() {
  return (
    <footer className={styles.footer}>
        <ProTip />
        <Copyright />
    </footer>
  )
}
