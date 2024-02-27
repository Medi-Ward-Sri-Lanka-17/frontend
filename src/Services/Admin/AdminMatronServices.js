import { apiClient } from '../../Api/ApiClient'

export const addMatron = async (values) => {
  try {
    const response = await apiClient.post('/admin/matron/add', values)
    return response
  } catch (err) {
    console.error(err)
    throw err
  }
}
