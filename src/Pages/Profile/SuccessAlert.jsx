import Swal from "sweetalert2";

const showSuccessAlert = () => {
  handleClose();
  Swal.fire({
    text: "Successfully Changed!",
    icon: "success",
    confirmButtonColor: "#243e4f",
  });
};
