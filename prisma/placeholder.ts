import { Role } from '@prisma/client'

export const users = [
  {
    id: '4cf624a5-7b99-423d-8cba-303a56f3602e',
    username: '山田 太郎',
    email: 'yamadataro@example.com',
    role: Role.USER,
    password: 'password123'
  },
  {
    id: 'fb6fc9c6-7016-4bfc-a44c-7ff59aa72ef0',
    username: '伊藤 直樹',
    email: 'itonaoki@example.com',
    role: Role.ADMIN,
    password: 'password123'
  },
  {
    id: '64e27b63-2cb3-4569-873b-10f66d6b440a',
    username: '鈴木花子',
    email: 'suzukihanako@example.com',
    role: Role.USER,
    password: 'password123'
  },
  {
    id: 'bb669aa9-d3d4-417b-85b9-1d58acfe5e81',
    username: '高橋 結衣',
    email: 'takahashiyui@example.com',
    role: Role.USER,
    password: 'password123'
  },
  {
    username: '中村 美咲',
    email: 'nakamuramisaki@example.com',
    role: Role.ADMIN,
    password: 'password123'
  }
]

export const projects = [
  {
    title: 'プロジェクト1',
    summary: 'プロジェクト1の概要',
    skills: ['React', 'Next.js', 'TypeScript'],
    rate: 10000,
    deadlineAt: new Date('2025-06-01')
  },
  {
    title: 'プロジェクト2',
    summary: 'プロジェクト2の概要',
    skills: ['React', 'Next.js', 'TypeScript'],
    rate: 10000,
    deadlineAt: new Date('2025-06-01')
  },
  {
    title: 'プロジェクト3',
    summary: 'プロジェクト3の概要',
    skills: ['React', 'Next.js', 'TypeScript'],
    rate: 10000,
    deadlineAt: new Date('2025-06-01')
  },
  {
    title: 'プロジェクト4',
    summary: 'プロジェクト4の概要',
    skills: ['React', 'Next.js', 'TypeScript'],
    rate: 10000,
    deadlineAt: new Date('2025-06-01')
  },
  {
    title: 'プロジェクト5',
    summary: 'プロジェクト5の概要',
    skills: ['React', 'Next.js', 'TypeScript'],
    rate: 10000,
    deadlineAt: new Date('2025-06-01')
  },
  {
    title: 'プロジェクト6',
    summary: 'プロジェクト6の概要',
    skills: ['React', 'Next.js', 'TypeScript'],
    rate: 10000,
    deadlineAt: new Date('2025-06-01')
  }
]
