import Swal from 'sweetalert2'

export const showSuccessAlert = (message) => {
  Swal.fire({
    text: message,
    icon: 'success',
    confirmButtonColor: '#243e4f',
  })
}

export const showUnsuccessAlert = (message) => {
  Swal.fire({
    text: message,
    icon: 'error',
    confirmButtonColor: '#243e4f',
  })
}
