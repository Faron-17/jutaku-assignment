import { Role } from '@prisma/client'

export const users = [
  {
    username: '山田 太郎',
    email: 'yamadataro@example.com',
    password: 'password',
    role: Role.USER
  },
  {
    username: '伊藤 直樹',
    email: 'itonaoki@example.com',
    password: 'password',
    role: Role.USER
  },
  {
    username: '鈴木花子',
    email: 'suzukihanako@example.com',
    password: 'password',
    role: Role.USER
  },
  {
    username: '高橋 結衣',
    email: 'takahashiyui@example.com',
    password: 'password',
    role: Role.USER
  },
  {
    username: '中村 美咲',
    email: 'nakamuramisaki@example.com',
    password: 'password',
    role: Role.USER
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
