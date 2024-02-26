import { apiClient } from '../../Api/ApiClient'

export const addMatron = async (values) => {
  const response = null
  try {
    response = await apiClient.post('/admin/matron/add', values)
  } catch (err) {
    console.error(err)
  }

  return response
}
