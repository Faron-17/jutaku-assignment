'use client'

import { Card, Button, Title, Text, Box, Modal, Flex } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

export function ProjectDetails() {
  const [opened, { open, close }] = useDisclosure(false)

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
          2024/03/12
        </Text>
      </Box>
      <Box>
        <Title order={5}>案件名</Title>
        <Text size="md" mt={8}>
          開発マッチングアプリ作成依頼
        </Text>
      </Box>
      <Box>
        <Title order={5}>概要</Title>
        <Text size="md" mt={8}>
          アプリ開発したい人と開発してほしい人をマッチングし 雇用を促進したい
        </Text>
      </Box>
      <Box>
        <Title order={5}>必要なスキル</Title>
        <Text size="md" mt={8}>
          Next, Typescript, Supabase
        </Text>
      </Box>
      <Box>
        <Title order={5}>募集締切</Title>
        <Text size="md" mt={8}>
          2024/04/20
        </Text>
      </Box>
      <Box>
        <Title order={5}>単価</Title>
        <Text size="md" mt={8}>
          30,000円
        </Text>
      </Box>
      <Button type="submit" mt={20} onClick={open}>
        <Text size="md" fw={600}>
          この案件にエントリーする
        </Text>
      </Button>
      <Modal opened={opened} onClose={close} mt={100} centered>
        <Flex direction="column" align="center" justify="center" gap="md">
          <Text size="md">エントリーしました</Text>
          <Button
            type="submit"
            mt={20}
            mb={34}
            onClick={close}
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
