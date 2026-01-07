import api from "./interceptors"

// import axios from 'axios';

// const api = axios.create({
//   baseURL: import.meta.env.VITE_APP_URL || '',
//    timeout: 10000
// });


interface loginProps {
 emailAddress:string;
 password:string;

}
interface otpProps {
  emailAddress: string;
  otp: string;
}

// interface createUserProps{
// fullName: string;
// email: string;
// isInternal: boolean;
// roleType: string;
// createdBy: string;
// }

// interface updateUserProps{
// fullName?: string;
// email?: string;
// isActive?: boolean;
// roleType?: string;
// updatedBy?: string;
// }

export const login = async (data: loginProps) => {
  // eslint-disable-next-line no-useless-catch
  try {
  const response = await api.post(`https://10.21.21.246/EChannelsStructuredDbService/api/Authentication/login`, data);
  return response.data;
  } catch (error) {
    throw error;
  }
};

export const otp = async (data: otpProps) => {
  try {
    const response = await api.post(`/Admin/verify-token`, data);
    return response.data;
  } catch (error) {
    return error;
  }
};
// export const createUser = async (data: createUserProps) => {
//   const response = await api.post('/users', data);
//   return response.data;
// }

// export const editUser = async (userId: string, data: updateUserProps) => {
//   const response = await api.put(`/users/${userId}`, data);
//   return response.data;
// }

