'use client'

import { Button, Modal, Flex, Text, Box } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

const DeleteProject = () => {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Button type="button" color="red" mt="1.25rem" onClick={open}>
        この案件を削除する
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
              <Text size="sm" fw={600}>
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
