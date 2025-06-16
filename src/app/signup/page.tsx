import { Title } from '@mantine/core'
import styles from '../page.module.css'
import { SignupForm } from './_component/SignupForm'

export default function Page() {
  return (
    <main className={styles.main}>
      <Title order={2} style={{ textAlign: 'center', marginBottom: '1rem' }}>
        新規登録
      </Title>
      <SignupForm />
    </main>
  )
}
