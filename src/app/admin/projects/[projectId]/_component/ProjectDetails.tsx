'use client'

import dayjs from 'dayjs'
import { Box, Button, Table } from '@mantine/core'
import Link from 'next/link'
import { useDisclosure } from '@mantine/hooks'
import EntryList from './EntryList'
import DeleteProject from './DeleteProject'
import type { Projects } from '@prisma/client'
import { route } from 'nextjs-routes'

const ProjectDetails = ({ project }: { project: Projects }) => {
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
            <Table.Td>{project.title}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th bg="blue.1" ta="center" w="20rem">
              概要
            </Table.Th>
            <Table.Td>{project.summary}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th bg="blue.1" ta="center" w="20rem">
              必要なスキル
            </Table.Th>
            <Table.Td>{project.skills.join(', ')}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th bg="blue.1" ta="center" w="20rem">
              募集締切
            </Table.Th>
            <Table.Td>
              {dayjs(project.deadlineAt).format('YYYY/MM/DD')}
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th bg="blue.1" ta="center" w="20rem">
              単価
            </Table.Th>
            <Table.Td>{project.rate.toLocaleString()}円</Table.Td>
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
        <Button
          type="button"
          component={Link}
          href={route({
            pathname: '/admin/projects/[projectId]/edit',
            query: { projectId: project.id }
          })}
        >
          編集する
        </Button>
        <EntryList />
        <DeleteProject projectId={project.id} pageType={PageType.DETAIL} />
      </Box>
    </>
  )
}

export default ProjectDetails
