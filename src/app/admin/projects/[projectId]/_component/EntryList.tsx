'use client'

import { getEntry } from '@/serverActions/entries'
import { Button, Modal, Flex, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useState } from 'react'

const EntryList = ({ projectId }: { projectId: string }) => {
  const [opened, { open, close }] = useDisclosure(false)
  const [users, setUsers] = useState<{ id: string; name: string }[]>([])
  const [loading, setLoading] = useState(false)

  const handleGetEntry = async () => {
    try {
      setLoading(true)
      const users = await getEntry({ projectId })
      setUsers(users)
      open()
    } catch (error) {
      console.log(error)
      console.error('取得に失敗しました:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button
        type="button"
        my="1.25rem"
        onClick={handleGetEntry}
        loading={loading}
      >
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
          {users.length > 0 ? (
            users.map((user) => (
              <Text key={user?.id} size="md">
                {user?.name}
              </Text>
            ))
          ) : (
            <Text size="md">エントリーがありません</Text>
          )}
        </Flex>
      </Modal>
    </>
  )
}

export default EntryList
