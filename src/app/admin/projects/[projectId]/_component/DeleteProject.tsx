'use client'

import { deleteProject } from '@/serverActions/delete'
import { PageType } from '@/types'
import { Button, Modal, Flex, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

type Props = {
  pageType: PageType
  projectId: string
}

const DeleteProject = ({ pageType, projectId }: Props) => {
  const [opened, { open, close }] = useDisclosure(false)

  const handleDelete = async () => {
    try {
      await deleteProject(projectId)
    } catch (error) {
      console.log(error)
      console.error('削除に失敗しました:', error)
    }
  }

  return (
    <>
      <Button type="button" color="red" onClick={open}>
        {pageType === PageType.LIST ? '削除' : 'この案件を削除する'}
      </Button>
      <Modal opened={opened} onClose={close} mt={100} centered>
        <Flex direction="column" align="center" justify="center" gap="md">
          <Text size="md">この案件を削除します。よろしいですか？</Text>
          <Flex justify="right" style={{ width: '100%' }}>
            <Button
              type="button"
              mt={20}
              pl={16}
              pr={16}
              onClick={close}
              style={{ width: '4.625rem' }}
              variant="outline"
              color="gray"
            >
              <Text size="sm" fw={600}>
                いいえ
              </Text>
            </Button>
            <Button
              type="button"
              mt={20}
              onClick={close}
              style={{ width: '4.625rem' }}
              color="red"
              ml={16}
            >
              <Text size="sm" fw={600} onClick={handleDelete}>
                はい
              </Text>
            </Button>
          </Flex>
        </Flex>
      </Modal>
    </>
  )
}

export default DeleteProject
