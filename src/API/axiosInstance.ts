import axios from 'axios';

const UNAUTHORIZED = 401;

const axiosInstance = axios.create({
    baseURL: 'http://localhost:9000',
    headers: {
        'Content-Type': 'application/json',
    },
});
async function refreshAccessToken() {
    const refreshToken = localStorage.getItem('refreshToken');

    try {
        const response = await axios.get('auth/refresh-token', {
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            },
        });

        const { newAccessToken } = response.data;
        localStorage.setItem('accessToken', newAccessToken);
    } catch (error) {
        throw error;
    }
}
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === UNAUTHORIZED && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const newAccessToken = refreshAccessToken();
                axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

                return axiosInstance(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    },
);

export default axiosInstance;
