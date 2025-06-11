'use client'

import Link from 'next/link'
import { Box, Button, Title, Table, Group } from '@mantine/core'
import type { RoleTypeProps } from '~/@types'

export const ProjectList = ({ roleType }: RoleTypeProps) => {
  const isAdmin = roleType === 'ADMIN'

  return (
    <>
      <Title order={2} ta="center" mb="lg">
        案件一覧
      </Title>
      <Box mb="lg">
        <Button ml="auto" mr="0" display={'block'}>
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
          <Table.Tr>
            <Table.Td>2024/03/12</Table.Td>
            <Table.Td>案件マッチングアプリ</Table.Td>
            <Table.Td>アプリ開発したい方と開発したい人...</Table.Td>
            <Table.Td>Next.js、TypeScript、Supabase</Table.Td>
            <Table.Td>
              <Group gap="sm" justify="center">
                <Button type="button" component={Link} href="/">
                  詳細
                </Button>
                {isAdmin && (
                  <>
                    <Button type="button" component={Link} href="/">
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
        </Table.Tbody>
      </Table>
    </>
  )
}
