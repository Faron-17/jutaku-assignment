'use client'

import { Box, Button, Table } from '@mantine/core'
import Link from 'next/link'
import { useDisclosure } from '@mantine/hooks'
import EntryList from './EntryList'
import DeleteProject from './DeleteProject'

const ProjectDetails = () => {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Box mb="2.5rem" style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          display={'block'}
          type="button"
          component={Link}
          href="/admin/projects"
          style={{ width: '7rem' }}
        >
          戻る
        </Button>
      </Box>
      <Table verticalSpacing="sm" withTableBorder withColumnBorders>
        <Table.Tbody>
          <Table.Tr>
            <Table.Th bg="blue.1" ta="center" w="20rem">
              案件名
            </Table.Th>
            <Table.Td>開発マッチングアプリ作成依頼</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th bg="blue.1" ta="center" w="20rem">
              概要
            </Table.Th>
            <Table.Td>
              アプリ開発したい方と開発いたい人とを繋ぎ、雇用を促進したい
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th bg="blue.1" ta="center" w="20rem">
              必要なスキル
            </Table.Th>
            <Table.Td>Next.js、Typescript、Supabase</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th bg="blue.1" ta="center" w="20rem">
              募集締切
            </Table.Th>
            <Table.Td>2024/04/20</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th bg="blue.1" ta="center" w="20rem">
              単価
            </Table.Th>
            <Table.Td>30,000円</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '30rem',
          margin: '2.5rem auto 0'
        }}
      >
        <Button type="button" component={Link} href="/">
          編集する
        </Button>
        <EntryList />
        <DeleteProject />
      </Box>
    </>
  )
}

export default ProjectDetails
