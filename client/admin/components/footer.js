
import styles from "./footer.module.css"
import ProTip from "../src/ProTip"
import Copyright from "../src/Copyright"

export default function Footer() {
  return (
    <footer className={styles.footer}>
        <ProTip />
        <Copyright />
    </footer>
  )
}
