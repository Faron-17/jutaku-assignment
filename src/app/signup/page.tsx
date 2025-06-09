import styles from '../page.module.css'
import { SignupForm } from './_component/SignupForm'

export default function Page() {
  return (
    <main className={styles.main}>
      <SignupForm />
    </main>
  )
}
