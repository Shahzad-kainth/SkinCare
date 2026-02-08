import axios from 'axios';
const axiosClient=axios.create(
{
  baseURL:"http://localhost:5000",
  withCredentials: true, // useful for cookies / auth
  headers: {
    "Content-Type": "application/json",
  },
}
)
export default axiosClient;