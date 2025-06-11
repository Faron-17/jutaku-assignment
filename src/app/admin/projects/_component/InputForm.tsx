'use client'

import React from 'react'
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
import type { pageTypeProps } from '~/@types'

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

export function InputForm({ pageType }: pageTypeProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<InputFormData>({
    resolver: zodResolver(inputSchema)
  })

  const onInputSubmit = async (data: InputFormData) => {}

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
              data={['Next', 'Supabase', 'Typescript', 'React', 'Node.js']}
              searchable
              clearable
              required
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

            <Button type="submit" loading={isSubmitting} mt={30}>
              {pageType === 'NEW' ? '登録' : '保存'}
            </Button>
          </Stack>
        </form>
      </Card>
    </>
  )
}
