'use client'
import React, { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signin } from '@/serverActions/supabaseAuth'

import {
  Card,
  Button,
  TextInput,
  PasswordInput,
  Stack,
  Text
} from '@mantine/core'

const signinSchema = z.object({
  email: z.string().email({ message: '無効なメールアドレスです' }),
  password: z
    .string()
    .min(8, { message: 'パスワードは必須です' })
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)/, {
      message: 'パスワードは英字と数字の両方を含めてください'
    })
})
type SigninFormData = z.infer<typeof signinSchema>

export function SigninForm() {
  const [error, setError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema)
  })

  const onSigninSubmit = async (data: SigninFormData) => {
    try {
      const { email, password } = data
      const { error } = await signin({ email, password })
      if (error) {
        setError('ログインできませんでした。入力内容をお確かめください。')
      }
    } catch (error) {
      console.error('Signin error:', error)
      setError(
        '予期せぬエラーが発生しました。しばらくしてから再度ログインしてください。'
      )
    }
  }

  return (
    <Card
      withBorder
      shadow="sm"
      radius="md"
      style={{
        width: '40.25rem',
        margin: 'auto',
        padding: '2.875rem 2.5rem 5.5625rem 2.5rem',
        marginTop: '3.2rem'
      }}
    >
      <form onSubmit={handleSubmit(onSigninSubmit)}>
        <Stack style={{ gap: '1.875rem' }}>
          <div>
            <TextInput
              label={
                <Text size="sm" fw={600} component="label">
                  メールアドレス
                  <Text color="red" display="inline" fw={700}>
                    *
                  </Text>
                </Text>
              }
              placeholder="email"
              {...register('email')}
              error={errors.email?.message}
              disabled={isSubmitting}
            />
          </div>
          <div>
            <PasswordInput
              label={
                <Text size="sm" fw={600} component="label">
                  パスワード
                  <Text color="red" display="inline" fw={700}>
                    *
                  </Text>
                </Text>
              }
              placeholder="password"
              {...register('password')}
              error={errors.password?.message}
              disabled={isSubmitting}
            />
          </div>
          <Button type="submit" loading={isSubmitting} mt={64}>
            ログイン
          </Button>
        </Stack>
      </form>

      {/* エラーメッセージがあれば全体で拾う例（必要があれば使用） */}
      {errors.email?.message && (
        <Text color="red" size="sm" mt="sm">
          {errors.email.message}
        </Text>
      )}
      {errors.password?.message && (
        <Text color="red" size="sm">
          {errors.password.message}
        </Text>
      )}
      {error && (
        <Text color="red" size="sm">
          {error}
        </Text>
      )}
    </Card>
  )
}
