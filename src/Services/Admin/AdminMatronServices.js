import { apiClient } from '../../Api/ApiClient'

export const addMatron = async (values) => {
  try {
    const response = await apiClient.post('/admin/matron/add', values)
    console.log(response)
    return response
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const getMatronDetails = async () => {
  try {
    const response = await apiClient.get('/admin/matron/get')
    console.log(response)
    return response
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const deleteMatron = async (nic) => {
  try {
    const response = await apiClient.delete(`/admin/matron/delete/${nic}`)
    console.log(response)
    return response
  } catch (err) {
    return err
  }
}
