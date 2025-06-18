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

const inputSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  skills: z.string().min(1),
  deadline: z.date(),
  rate: z.coerce
    .number({
      required_error: '数値を入力してください',
      invalid_type_error: '数値を入力してください（文字列は使えません）'
    })
    .min(0, { message: '0以上の値を入力してください' })
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
          skills: project.skills.join(','),
          deadline: new Date(project.deadlineAt),
          rate: project.rate
        }
      : undefined
  })

  // スキルの初期値を設定
  React.useEffect(() => {
    if (project?.skills) {
      setValue('skills', project.skills.join(','))
    }
  }, [project, setValue])

  const onInputSubmit = async (data: InputFormData) => {
    try {
      if (pageType === PageType.EDIT && project) {
        await editProject({
          id: project.id,
          title: data.title,
          summary: data.summary,
          skills: data.skills.split(','),
          rate: data.rate,
          deadlineAt: data.deadline
        })
        startTransition(() => {
          // @ts-ignore
          router.replace(`/admin/projects/${project.id}`)
        })
      }
      if (pageType === PageType.NEW) {
        await createProject({
          title: data.title,
          summary: data.summary,
          skills: data.skills.split(','),
          rate: data.rate,
          deadlineAt: data.deadline
        })
        startTransition(() => {
          router.replace('/admin/projects')
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
          href="/admin/projects"
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
                </Text>
              }
              placeholder="案件名"
              {...register('title')}
              error={errors.title?.message}
              disabled={isSubmitting}
              required
            />
            <TextInput
              label={
                <Text size="sm" fw={600} component="label">
                  概要
                </Text>
              }
              placeholder="概要"
              {...register('summary')}
              error={errors.summary?.message}
              disabled={isSubmitting}
              required
            />
            <MultiSelect
              label={
                <Text size="sm" fw={600} component="label">
                  必要なスキル
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
              required
              defaultValue={project?.skills}
              onChange={(value) => setValue('skills', value.join(','))}
            />
            <DateInput
              valueFormat="YYYY/MM/DD"
              label={
                <Text size="sm" fw={600} component="label">
                  募集締切日
                </Text>
              }
              placeholder="募集締切日"
              required
              defaultValue={
                project?.deadlineAt ? new Date(project.deadlineAt) : undefined
              }
              onChange={(value) => setValue('deadline', value || new Date())}
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
                  単価<span style={{ color: 'red', marginLeft: 4 }}>*</span>
                </span>
              }
              placeholder="例: 300000"
              type="number"
              {...register('rate')}
              error={errors.rate?.message}
              disabled={isSubmitting}
              required={false}
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
