'use client'

import Link from 'next/link'
import { Box, Button, Title, Table, Group } from '@mantine/core'
import type { Projects } from '@prisma/client'
import type { RoleType } from '@/types'
import { route } from 'nextjs-routes'

type ProjectListProps = {
  roleType: RoleType
  projects: Projects[]
}

export function ProjectList({ roleType, projects }: ProjectListProps) {
  const isAdmin = roleType === 'ADMIN'
  return (
    <>
      <Title order={2} ta="center" mb="lg">
        案件一覧
      </Title>
      <Box mb="lg">
        <Button
          ml="auto"
          mr="0"
          display={'block'}
          type="button"
          style={{ width: '12.25rem' }}
          component={Link}
          href={isAdmin ? '/admin/projects/new' : '/entry-list'}
        >
          {isAdmin ? '新規案件作成' : 'エントリー一覧'}
        </Button>
      </Box>

      <Table verticalSpacing="sm" withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th bg="blue.1" ta="center">
              案件作成日
            </Table.Th>
            <Table.Th bg="blue.1" ta="center">
              案件名
            </Table.Th>
            <Table.Th bg="blue.1" ta="center">
              概要
            </Table.Th>
            <Table.Th bg="blue.1" ta="center">
              必要なスキル
            </Table.Th>
            <Table.Th bg="blue.1" ta="center">
              詳細
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {projects.map((project) => (
            <Table.Tr key={project.id}>
              <Table.Td>{project.createdAt.toLocaleDateString()}</Table.Td>
              <Table.Td>{project.title}</Table.Td>
              <Table.Td>{project.summary}</Table.Td>
              <Table.Td>{project.skills.join(', ')}</Table.Td>
              <Table.Td>
                <Group gap="sm" justify="center">
                  <Button
                    type="button"
                    component={Link}
                    href={route({
                      pathname: isAdmin
                        ? '/admin/projects/[projectId]'
                        : '/projects/[projectId]',
                      query: { projectId: project.id }
                    })}
                  >
                    詳細
                  </Button>
                  {isAdmin && (
                    <>
                      <Button
                        type="button"
                        component={Link}
                        href={route({
                          pathname: '/admin/projects/[projectId]/edit',
                          query: { projectId: project.id }
                        })}
                      >
                        編集
                      </Button>
                      <Button type="button" color="red">
                        削除
                      </Button>
                    </>
                  )}
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </>
  )
}
