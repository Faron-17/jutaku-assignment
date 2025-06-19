'use client'

import Link from 'next/link'
import { Box, Button, Title, Table, Group } from '@mantine/core'
import type { Projects } from '@prisma/client'
import { formatDate } from '~/util'

export const EntryProjectList = ({ projects }: { projects: Projects[] }) => {
  return (
    <>
      <Box mb="2.5rem" style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          display={'block'}
          type="button"
          component={Link}
          href="/projects"
          style={{ width: '7rem' }}
        >
          戻る
        </Button>
      </Box>
      <Table verticalSpacing="sm" withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th bg="blue.1" ta="center">
              エントリー日
            </Table.Th>
            <Table.Th bg="blue.1" ta="center">
              案件名
            </Table.Th>
            <Table.Th bg="blue.1" ta="center">
              単価
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {projects.map((project) => (
            <Table.Tr key={project.id}>
              <Table.Td>{formatDate(project.createdAt)}</Table.Td>
              <Table.Td>{project.title}</Table.Td>
              <Table.Td>{project.rate?.toLocaleString()}円</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </>
  )
}
