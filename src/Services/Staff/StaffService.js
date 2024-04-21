import { apiClient } from '../../Api/ApiClient'

export const getStaffByWard = async (wardNo) => {
  try {
    const response = await apiClient.get(`/show-staff/${wardNo}`)
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
