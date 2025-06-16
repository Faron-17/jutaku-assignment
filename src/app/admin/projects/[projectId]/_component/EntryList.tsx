'use client'

import { Button, Modal, Flex, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

const EntryList = () => {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Button type="button" mt="1.25rem" onClick={open}>
        この案件のエントリー一覧を見る
      </Button>
      <Modal
        opened={opened}
        onClose={close}
        centered
        title={
          <Text fw={600} size="md">
            エントリー一覧
          </Text>
        }
      >
        <Flex
          direction="column"
          align="center"
          justify="center"
          gap="md"
          pb={50}
        >
          <Text size="md">吉田 一郎</Text>
          <Text size="md">田中 次郎</Text>
          <Text size="md">加藤 三朗</Text>
          <Text size="md">東京 四郎</Text>
        </Flex>
      </Modal>
    </>
  )
}

export default EntryList
