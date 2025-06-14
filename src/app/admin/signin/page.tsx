import { Title } from '@mantine/core'
import styles from '@/app/page.module.css'
import { AdminSigninForm } from '@/app/admin/signin/_component/AdminSigninForm'

export default function Home() {
  return (
    <main className={styles.main}>
      <Title order={2} style={{ textAlign: 'center', marginBottom: '1rem' }}>
        管理者ログイン
      </Title>
      <AdminSigninForm />
    </main>
  )
}
