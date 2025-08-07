import { api } from 'library'

const baseUrl = '/external'

export const verifyRecaptcha = async (token: string) => {
  const { data } = await api.post(`${baseUrl}/token?token=${token}`)
  return data
}
