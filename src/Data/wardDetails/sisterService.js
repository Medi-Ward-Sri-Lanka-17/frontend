export const fetchSisterData = async () => {
  try {
    // const data = await response.json();

    const response = {
      fullName: "Dilki Hansapani",
      firstName: "Dilki",
      lastName: "Hansapani",
      serviceId: "199965500338",
      birthdate: "1999-06-03",
      email: "dilki99hansapani@gmail.com",
      position: "Sister",
      leaveNo: "715",
      mobileNo: "0766640472",
      serviceStartDate: "2021-02-15",
    };

    // response.birthday = new Date(response.birthday);
    // response.serviceStartDate = new Date(response.serviceStartDate);

    return response; // Directly return the response object
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};
