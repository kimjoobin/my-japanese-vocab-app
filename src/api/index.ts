import axios, { AxiosInstance } from "axios";

// const API_URL = 'http://localhost:8080/api';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': '69420'
  }
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Response Error:', error);
    // 모바일에서 오류 확인을 위해 alert 추가
    if (error.response) {
      alert(`오류: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
    } else {
      alert(`네트워크 오류: ${error.message}`);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;