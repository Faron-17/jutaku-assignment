import { Title } from '@mantine/core'
import styles from './page.module.css'
import { SigninForm } from '@/app/_component/SigninForm'

export default async function Home() {
  return (
    <main className={styles.main}>
      <Title order={2} style={{ textAlign: 'center', marginBottom: '1rem' }}>
        ログイン
      </Title>
      <SigninForm />
    </main>
  )
}
