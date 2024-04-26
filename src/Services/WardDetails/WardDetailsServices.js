import { responsiveProperty } from '@mui/material/styles/cssUtils'
import { apiClient } from '../../Api/ApiClient'
import { showSuccessAlert, showUnsuccessAlert } from '../../Component/ShowAlert'

export const retriveAllWards = async () => {
  try {
    const response = await apiClient.get('/wards')
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

//==============================ADD NEW WARD============================
//add a new ward
export const addWard = async (value) => {
  try {
    const response = await apiClient.post('/ward/add-ward', value)
    return response.status
  } catch (err) {
    throw new Error("Couldn't add a new ward")
  }
}

//retirve available matrons
export const retrieveMatronNics = async () => {
  try {
    const response = await apiClient.get('/ward/get-all-matrons')
    return response.data
  } catch (err) {
    throw new Error("Couldn't retrieve matron nics")
  }
}

//=======================ADD A STAFF MEMBER==============================

//add a new staff member
export const addStaff = async (value) => {
  try {
    const response = await apiClient.post('/add-staff', value)
  } catch (err) {
    console.error(err)
  }
}

//retrieve all ward numbers to add a staff member
export const retrieveWardNumbers = async () => {
  try {
    const response = await apiClient.get('/get-ward-numbers')
    return response.data
  } catch (err) {
    throw new Error("Couldn't retieve ward numbers")
  }
}

//existing user data retrieve
export const retrieveExistingUser = async (nic) => {
  try {
    console.log(nic)
    const response = await apiClient.get(`/get-existing-user/${nic}`)
    console.log(response.data)
    return response.data
  } catch (err) {
    throw new Error("Couldn't retieve user data")
  }
}

export const retrieveAllUserNics = async () => {
  try {
    const response = await apiClient.get('/get-all-users-nics')
    return response.data
  } catch (err) {
    throw new Error("Couldn't retieve user data")
  }
}

//=========================BASIC WARD DETAILS===========================

//retieve all ward names relevant to a matron
export const retrieveWardNames = async (username) => {
  try {
    const response = await apiClient.get(`/get-ward-names/${username}`)
    return response.data
  } catch (err) {
    throw new Error("Couldn't retrieve ward names")
  }
}

//retreive selected basic ward data
export const retrieveWardData = async (wardName) => {
  try {
    const response = await apiClient.get(`/show-ward/${wardName}`)
    return response.data
  } catch (err) {
    throw new Error("Couldn't retrieve selected ward data")
  }
}

//retreive basic ward data of the logged user
export const retrieveWardDataOfLoggedUser = async (username) => {
  try {
    const response = await apiClient.get(`/show-logged-user-ward/${username}`)
    return response.data
  } catch (err) {
    throw new Error("Couldn't retrieve selected ward data")
  }
}

//======================SISTER DATA=============================

//retrieve sister details when logged user position not matron
export const retrieveSisterDetailsForOther = async (wardNo) => {
  try {
    const response = await apiClient.get(`/get-sister-details/${wardNo}`)
    return response.data
  } catch (err) {
    throw new Error("Couldn't retrieve sister details")
  }
}

//retrieve sister details for all posiitons
export const retrieveSisterDetails = async (wardName) => {
  try {
    const response = await apiClient.get(
      `/get-sister-details-matron/${wardName}`
    )
    console.log(response.data)
    return response.data
  } catch (err) {
    throw new Error("Couldn't retrieve sister details")
  }
}

//send edited sister details values when matron logged
export const sendEditedSisterDetailsForMatron = async (values) => {
  try {
    const response = await apiClient.put(
      '/update-sister-details-matron',
      values
    )
    return response.data
  } catch (err) {
    throw new Error("Couldn't edit ward details")
  }
}

//=========================EDIT WARD DATA==============================

//retrive full ward details for edit
export const retrieveBasicWardData = async (wardName) => {
  try {
    const response = await apiClient.get(`/show-fullward/${wardName}`)
    return response.data
  } catch (err) {
    throw new Error("Couldn't retrieve selected ward data")
  }
}

//retrive full ward details for edit when sister log
export const retrieveBasicWardDataSister = async (username) => {
  try {
    const response = await apiClient.get(`/show-fullward-By-Sister/${username}`)
    return response.data
  } catch (err) {
    throw new Error("Couldn't retrieve selected ward data")
  }
}

//send edited ward details values
export const sendEditedWardDetails = async (values) => {
  try {
    const response = await apiClient.put('/ward-sister-update', values)
    if (response.status === 200) {
      return true
    } else {
      return false
    }
  } catch (err) {
    throw new Error("Couldn't edit ward details")
  }
}

//retirve available sisters
export const retrieveSistersNics = async (username) => {
  try {
    const response = await apiClient.get('/show-available-sisters')
    return response.data
  } catch (err) {
    throw new Error("Couldn't retrieve sister nics")
  }
}

//===============TABLE RELATED FUNCTIONS=================

//Retrieve all nurses related to the ward
export const retrieveAllStaffMembers = async (wardNo) => {
  try {
    console.log('service file')
    const response = await apiClient.get(`/show-staff/${wardNo}`)
    console.log('Response from API:', response.data)

    return response.data
  } catch (error) {
    if (error.response) {
      console.error('Error Response:', error.response.data)
      showUnsuccessAlert(error.response.data)
      return null
    } else if (error.request) {
      console.error('Error Request:', error.request)
      showUnsuccessAlert('No response from server')
      return null
    } else {
      console.error('Error Message:', error.message)
      showUnsuccessAlert('Error: ' + error.message)
      return null
    }
  }
}

//Retrieve nurse details for edit
export const retrieveNurseData = async (nic) => {
  try {
    const response = await apiClient.get(`/get-nurse-details/${nic}`)
    return response.data
  } catch (err) {
    throw new Error("Couldn't retrieve nurse data")
  }
}

//send edited nurse details values when matron logged
export const sendEditedNurseDetails = async (values) => {
  try {
    const response = await apiClient.put('/update-nurse-details', values)
    console.log(response.data)
    return response.data
  } catch (err) {
    throw new Error("Couldn't edit ward details")
  }
}

//delete staff member
export const deleteNurseFromWard = async (nic) => {
  try {
    const response = await apiClient.delete(`/delete-nurse/${nic}`)
    showSuccessAlert(response.data)
    return response.data
  } catch (err) {
    throw new Error("Couldn't delete nurse ")
  }
}

export const retrieveAllWardNames = async (username) => {
  try {
    const response = await apiClient.get('/wards/names')
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
