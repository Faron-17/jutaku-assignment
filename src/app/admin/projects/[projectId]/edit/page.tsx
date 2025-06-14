import { Title } from '@mantine/core'
import { InputForm } from '@/app/admin/projects/_component/InputForm'
import { PageType } from '@/types'

export default function EditProject() {
  return (
    <>
      <Title order={2} ta="center" mb="lg">
        案件編集
      </Title>
      <InputForm pageType={PageType.EDIT} />
    </>
  )
}
