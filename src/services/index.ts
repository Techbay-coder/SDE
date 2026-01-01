// import axios from 'axios';

// const api = axios.create({
//   baseURL: import.meta.env.VITE_APP_URL || '',
//    timeout: 10000
// });


// interface loginProps {
//  email:string;
//  password:string;

// }

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

// export const login = async (data: loginProps) => {
//   const response = await api.post('/auth/login', data);
//   return response.data;
// };

// export const createUser = async (data: createUserProps) => {
//   const response = await api.post('/users', data);
//   return response.data;
// }

// export const editUser = async (userId: string, data: updateUserProps) => {
//   const response = await api.put(`/users/${userId}`, data);
//   return response.data;
// }

