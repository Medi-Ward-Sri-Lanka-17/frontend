import { apiClient } from "../../Api/ApiClient"

export const sendCustomerDetails=(values)=>apiClient.post('/customer-support',values)