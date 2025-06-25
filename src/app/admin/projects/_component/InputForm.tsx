'use client'

import React, { useTransition } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DateInput } from '@mantine/dates'
import '@mantine/dates/styles.css'
import {
  Card,
  Button,
  TextInput,
  Stack,
  Box,
  Text,
  MultiSelect
} from '@mantine/core'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { PageType, type PageTypeProps } from '@/types'
import type { Projects } from '@prisma/client'
import { editProject } from '@/serverActions/edit'
import { createProject } from '@/serverActions/new'
import { route } from 'nextjs-routes'
import { URL_ADMIN_PROJECT, URL_ADMIN_PROJECT_LIST } from '@/const/config'

const inputSchema = z.object({
  title: z.string().min(1, { message: '案件名を入力してください' }),
  summary: z.string().min(1, { message: '案件概要を入力してください' }),
  skills: z
    .array(z.string())
    .min(1, { message: '必要なスキルを選択してください' }),
  deadline: z.date({
    required_error: '募集締切日を選択してください',
    invalid_type_error: '有効な日付を選択してください'
  }),
  rate: z.coerce
    .number({
      required_error: '単価を入力してください',
      invalid_type_error: '数値を入力してください（文字列は使えません）'
    })
    .min(1, { message: '値を入力してください' })
})
type InputFormData = z.infer<typeof inputSchema>

type Props = {
  pageType: PageType
  project?: Projects
}

export function InputForm({ pageType, project }: Props) {
  const [isPending, startTransition] = useTransition()

  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<InputFormData>({
    resolver: zodResolver(inputSchema),
    defaultValues: project
      ? {
          title: project.title,
          summary: project.summary,
          skills: project.skills,
          deadline: new Date(project.deadlineAt),
          rate: project.rate
        }
      : undefined
  })

  // スキルの初期値を設定
  React.useEffect(() => {
    if (project?.skills) {
      setValue('skills', project.skills)
    }
  }, [project, setValue])

  const onInputSubmit = async (data: InputFormData) => {
    try {
      if (pageType === PageType.EDIT && project) {
        await editProject({
          id: project.id,
          title: data.title,
          summary: data.summary,
          skills: data.skills,
          rate: data.rate,
          deadlineAt: data.deadline
        })
        startTransition(() => {
          startTransition(() => {
            router.push(
              route({
                pathname: URL_ADMIN_PROJECT,
                query: { projectId: project.id }
              })
            )
          })
        })
      }
      if (pageType === PageType.NEW) {
        await createProject({
          title: data.title,
          summary: data.summary,
          skills: data.skills,
          rate: data.rate,
          deadlineAt: data.deadline
        })
        startTransition(() => {
          router.replace(URL_ADMIN_PROJECT_LIST)
        })
      }
    } catch (error) {
      console.log(error)
      console.error('保存に失敗しました:', error)
    }
  }

  return (
    <>
      <Box mb="2.5rem" style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          display={'block'}
          type="button"
          component={Link}
          href={URL_ADMIN_PROJECT_LIST}
          style={{ width: '7rem' }}
        >
          戻る
        </Button>
      </Box>
      <Card
        withBorder
        shadow="sm"
        radius="md"
        padding="xl"
        style={{ width: '40.25rem', margin: 'auto' }}
      >
        <form onSubmit={handleSubmit(onInputSubmit)}>
          <Stack>
            <TextInput
              label={
                <Text size="sm" fw={600} component="label">
                  案件名
                  <Text color="red" display="inline" fw={700}>
                    *
                  </Text>
                </Text>
              }
              placeholder="案件名"
              {...register('title')}
              error={errors.title?.message}
              disabled={isSubmitting}
            />
            <TextInput
              label={
                <Text size="sm" fw={600} component="label">
                  概要
                  <Text color="red" display="inline" fw={700}>
                    *
                  </Text>
                </Text>
              }
              placeholder="概要"
              {...register('summary')}
              error={errors.summary?.message}
              disabled={isSubmitting}
            />
            <MultiSelect
              label={
                <Text size="sm" fw={600} component="label">
                  必要なスキル
                  <Text color="red" display="inline" fw={700}>
                    *
                  </Text>
                </Text>
              }
              placeholder="スキルを選択"
              data={[
                'Next.js',
                'Supabase',
                'TypeScript',
                'React',
                'Node.js',
                'Ruby',
                'Python',
                'AWS',
                'Prisma'
              ]}
              searchable
              clearable
              defaultValue={project?.skills}
              onChange={(value) => setValue('skills', value)}
              error={errors.skills?.message}
            />
            <DateInput
              valueFormat="YYYY/MM/DD"
              label={
                <Text size="sm" fw={600} component="label">
                  募集締切日
                  <Text color="red" display="inline" fw={700}>
                    *
                  </Text>
                </Text>
              }
              placeholder="募集締切日"
              defaultValue={
                project?.deadlineAt ? new Date(project.deadlineAt) : undefined
              }
              onChange={(value) => setValue('deadline', value || new Date())}
              error={errors.deadline?.message}
            />
            <TextInput
              label={
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    fontWeight: 600
                  }}
                >
                  単価
                  <Text color="red" display="inline" fw={700}>
                    *
                  </Text>
                </span>
              }
              placeholder="例: 300000"
              type="number"
              {...register('rate')}
              error={errors.rate?.message}
              disabled={isSubmitting}
            />

            <Button type="submit" loading={isSubmitting || isPending} mt={30}>
              {pageType === PageType.NEW ? '登録' : '保存'}
            </Button>
          </Stack>
        </form>
      </Card>
    </>
  )
}
