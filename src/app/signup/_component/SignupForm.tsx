'use client'
import React from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signup } from '@/serverActions/supabaseAuth'

import {
  Card,
  Button,
  TextInput,
  PasswordInput,
  Stack,
  Text
} from '@mantine/core'

const signupSchema = z
  .object({
    username: z.string().min(1, { message: '無効なメールアドレスです' }),
    email: z.string().email({ message: '無効なメールアドレスです' }),
    password: z
      .string()
      .min(8, { message: 'パスワードは必須です' })
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)/, {
        message: 'パスワードは英字と数字の両方を含めてください'
      }),
    passwordConfirm: z.string()
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'パスワードが一致しません'
  })
type SignupFormData = z.infer<typeof signupSchema>

export function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema)
  })

  const onSignupSubmit = async (data: SignupFormData) => {
    const { email, password } = data
    await signup({ email, password })
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
      <form onSubmit={handleSubmit(onSignupSubmit)}>
        {/* MantineのStackで要素を縦に並べ、styleで間隔を指定する */}
        <Stack style={{ gap: '1.875rem' }}>
          <div>
            <TextInput
              label={
                <Text size="sm" fw={600} component="label">
                  お名前
                </Text>
              }
              placeholder="お名前"
              {...register('username')}
              // React Hook Form のエラーを Mantine 側のerrorプロップに渡す
              error={errors.username?.message}
              disabled={isSubmitting}
              required
            />
          </div>
          <div>
            <TextInput
              label={
                <Text size="sm" fw={600} component="label">
                  メールアドレス
                </Text>
              }
              placeholder="email"
              {...register('email')}
              // React Hook Form のエラーを Mantine 側のerrorプロップに渡す
              error={errors.email?.message}
              disabled={isSubmitting}
              required
            />
          </div>
          <div>
            <PasswordInput
              label={
                <Text size="sm" fw={600} component="label">
                  パスワード
                </Text>
              }
              placeholder="password"
              {...register('password')}
              error={errors.password?.message}
              disabled={isSubmitting}
              required
            />
          </div>
          <div>
            <PasswordInput
              label={
                <Text size="sm" fw={600} component="label">
                  パスワード(確認)
                </Text>
              }
              placeholder="password confirm"
              {...register('passwordConfirm')}
              error={errors.passwordConfirm?.message}
              disabled={isSubmitting}
              required
            />
          </div>
          <Button type="submit" loading={isSubmitting} mt={64}>
            登録
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
    </Card>
  )
}
