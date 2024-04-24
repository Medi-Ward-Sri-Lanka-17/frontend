import { apiClient } from '../../Api/ApiClient'
import { showSuccessAlert, showUnsuccessAlert } from '../../Component/ShowAlert'

export const getWardList = async (nic) => {
  const wards = []
  try {
    const response = await apiClient.get(`/show-ward/matron/${nic}`)
    return response.data
  }    catch (error) {
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

export const getRequestLeaveDetails = async (
  nic,
  positionFilter,
  wardFilter
) => {
  var requestLeaveList = []

  try {
    const response = await apiClient.get(`/leaveApprove/${nic}`, {
      params: {
        positionFilter: positionFilter,
        wardFilter: wardFilter,
      },
    })
    requestLeaveList = response.data
    return requestLeaveList
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

// Approve Leaves by Sister Service

export const approveLeaveBySister = async (leaveID) => {
  try {
    const response = await apiClient.put(`/leaveApprove/sister`, leaveID)
    showSuccessAlert(response.data)
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

// Approve Leaves by Sister Service

export const approveLeaveByMatron = async (leaveID) => {
  try {
    const response = await apiClient.put(`/leaveApprove/matron`, leaveID)
    showSuccessAlert(response.data)
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
