'use client'

import dayjs from 'dayjs'
import { Card, Button, Title, Text, Box, Modal, Flex } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import type { Projects } from '@prisma/client'
import { createEntry } from '../../../../serverActions/entries'
import { useRouter } from 'next/navigation'

export function ProjectDetails({
  project,
  userId
}: { project: Projects; userId: string }) {
  const [opened, { open, close }] = useDisclosure(false)
  const router = useRouter()

  // エントリー
  const handleEntry = async () => {
    try {
      await createEntry({
        projectId: project.id,
        userId
      })
      open()
    } catch (error) {
      console.error('エントリーに失敗しました:', error)
    }
  }

  const handleClose = () => {
    close()
    router.push('/entry-list')
  }

  return (
    <Card
      withBorder
      shadow="sm"
      radius="md"
      padding="xl"
      mb={50}
      style={{
        width: '40.25rem',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        rowGap: '1.875rem'
      }}
    >
      <Box>
        <Title order={5}>案件作成日</Title>
        <Text size="md" mt={8}>
          {dayjs(project.createdAt).format('YYYY/MM/DD')}
        </Text>
      </Box>
      <Box>
        <Title order={5}>案件名</Title>
        <Text size="md" mt={8}>
          {project.title}
        </Text>
      </Box>
      <Box>
        <Title order={5}>概要</Title>
        <Text size="md" mt={8}>
          {project.summary}
        </Text>
      </Box>
      <Box>
        <Title order={5}>必要なスキル</Title>
        <Text size="md" mt={8}>
          {project.skills.join(', ')}
        </Text>
      </Box>
      <Box>
        <Title order={5}>募集締切</Title>
        <Text size="md" mt={8}>
          {dayjs(project.deadlineAt).format('YYYY/MM/DD')}
        </Text>
      </Box>
      <Box>
        <Title order={5}>単価</Title>
        <Text size="md" mt={8}>
          {project.rate.toLocaleString()}円
        </Text>
      </Box>
      <Button type="submit" mt={20} onClick={handleEntry}>
        <Text size="md" fw={600}>
          この案件にエントリーする
        </Text>
      </Button>
      <Modal opened={opened} onClose={handleClose} mt={100} centered>
        <Flex direction="column" align="center" justify="center" gap="md">
          <Text size="md">エントリーしました</Text>
          <Button
            type="submit"
            mt={20}
            mb={34}
            onClick={handleClose}
            style={{ width: '19.625rem' }}
          >
            <Text size="md" fw={600}>
              OK
            </Text>
          </Button>
        </Flex>
      </Modal>
    </Card>
  )
}
