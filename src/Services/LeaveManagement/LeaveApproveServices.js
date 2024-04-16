import { apiClient } from '../../Api/ApiClient'
import { showUnsuccessAlert } from '../../Component/ShowAlert'

export const getWardList = async (nic) => {
  const wards = []
  try {
    const response = await apiClient.get(`/show-ward/matron/${nic}`)
    return response.data
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
