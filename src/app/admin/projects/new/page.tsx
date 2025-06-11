import { Title } from '@mantine/core'
import { InputForm } from '@/app/admin/projects/_component/InputForm'

export default function NewProject() {
  return (
    <>
      <Title order={2} ta="center" mb="lg">
        新規案件作成
      </Title>
      <InputForm pageType="NEW" />
    </>
  )
}
