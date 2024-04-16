import { apiClient } from '../../Api/ApiClient'
import { showUnsuccessAlert } from '../../Component/ShowAlert'

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
    console.log(response.data)
    return response
  } catch (error) {
    if (error.response) {
      console.error('Error Response:', error.response.data)
      showUnsuccessAlert(error.response.data)
    } else if (error.request) {
      console.error('Error Request:', error.request)
      showUnsuccessAlert('No response from server')
    } else {
      console.error('Error Message:', error.message)
      showUnsuccessAlert('Error: ' + error.message)
    }
  }
}
