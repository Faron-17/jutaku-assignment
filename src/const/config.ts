// 設定値を定義する

import type { LinkProps } from 'next/link'
import {
  isProd,
  isPreview,
  isDevelopment,
  CORS_PROD_URL,
  CORS_PREV_URL,
  CORS_DEV_URL,
  CORS_LOCAL_URL
} from '~/util/env'

// Cookieの有効期限
export const SESSION_COOKIE_MAX_AGE = 60 * 60 * 24 * 7 * 1000

// 認証後のリダイレクト先
export const AFTER_SIGNIN_PATH = '/' satisfies LinkProps['href']
export const AFTER_SIGNOUT_PATH = '/' satisfies LinkProps['href']

export const AFTER_SIGNUP_PATH = '/' satisfies LinkProps['href']
export const AFTER_SIGNUP_FOR_DB_REGISTER_PATH =
  '/projects' satisfies LinkProps['href']
export const AFTER_ADMIN_SIGNUP_FOR_DB_REGISTER_PATH =
  '/admin/projects' satisfies LinkProps['href']
// ログイン済みチェックURLリスト
export function isLoginedCheckUrl(url: string): boolean {
  return url.startsWith('/my-page')
  // url.startsWith('/users')
}

export const AFTER_NOT_SIGNIN_PATH_ADMIN =
  '/admin/signin' satisfies LinkProps['href']

// ログイン済みチェックで失敗した際のリダイレクト先
export const LOGINED_CHECK_FAILED_REDIRECT_URL: string = '/'

// CORS設定用URL取得
export const getCorsUrl = () => {
  if (isProd === true) return CORS_PROD_URL
  if (isPreview === true) return CORS_PREV_URL
  if (isDevelopment) return CORS_DEV_URL

  return CORS_LOCAL_URL
}

export const URL_ADMIN_PROJECT_LIST = '/admin/projects'
export const URL_ADMIN_PROJECT = '/admin/projects/[projectId]'
export const URL_ADMIN_NEW = '/admin/projects/new'
export const URL_ADMIN_EDIT = '/admin/projects/[projectId]/edit'
export const URL_USER_PROJECT = '/projects/[projectId]'
export const URL_USER_PROJECT_LIST = '/projects'
export const URL_USER_ENTRY_LIST = '/entry-list'
