import { Title } from '@mantine/core'
import { EntryProjectList } from '@/app/entry-list/_component/EntryProjectList'

export default function EntryList() {
  return (
    <>
      <Title order={2} ta="center" mb="lg">
        エントリー済み一覧
      </Title>
      <EntryProjectList />
    </>
  )
}
