import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiResponse } from '../types';

class ApiService {
    private instance: AxiosInstance;
    private baseURL: string;

    constructor() {
        // Cambia según si estás en emulador o dispositivo físico
        this.baseURL = __DEV__ ? 'http://10.0.2.2:5000/api' : 'http://TU_IP_LOCAL:5000/api';
        
        this.instance = axios.create({
            baseURL: this.baseURL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.setupInterceptors();
    }

    private setupInterceptors() {
        // Request
        this.instance.interceptors.request.use(
            async (config) => {
                try {
                    const token = await AsyncStorage.getItem('token');
                    if (token && config.headers) {
                        config.headers.Authorization = `Bearer ${token}`;
                    }
                    if (__DEV__) {
                        console.log('[API] Request:', (config.baseURL || '') + (config.url || ''));
                        console.log('[API] Data:', config.data || config.params || {});
                    }
                } catch (error) {
                    if (__DEV__) console.log('[API] Error obteniendo token:', error);
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Response
        this.instance.interceptors.response.use(
            (response: AxiosResponse) => {
                if (__DEV__) console.log('[API] Response:', response.status, response.data);
                return response;
            },
            async (error) => {
                if (__DEV__) console.log('[API] Error response:', error.response?.status, error.response?.data || error.message);

                if (error.response?.status === 401) {
                    await AsyncStorage.multiRemove(['token', 'user']);
                    // Aquí puedes redirigir a login si quieres
                }

                return Promise.reject(this.handleError(error));
            }
        );
    }

    // GET
    async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response = await this.instance.get(endpoint, config);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // POST
    async post<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response = await this.instance.post(endpoint, data, config);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // PUT
    async put<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response = await this.instance.put(endpoint, data, config);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // PATCH
    async patch<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response = await this.instance.patch(endpoint, data, config);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // DELETE
    async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response = await this.instance.delete(endpoint, config);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Manejo de errores
    private handleError(error: any) {
        let errorInfo;
        if (error.response) {
            const { status, data } = error.response;
            errorInfo = {
                success: false,
                message: data?.message || `Error ${status}`,
                errors: data?.errors || [],
                status,
            };
        } else if (error.request) {
            errorInfo = {
                success: false,
                message: 'Sin conexión al servidor. Verifica tu conexión a internet',
                errors: ['NETWORK_ERROR'],
            };
        } else {
            errorInfo = {
                success: false,
                message: error.message || 'Error desconocido',
                errors: ['UNKNOWN_ERROR'],
            };
        }

        const customError = new Error(errorInfo.message);
        (customError as any).success = errorInfo.success;
        (customError as any).errors = errorInfo.errors;
        (customError as any).status = errorInfo.status;

        return customError;
    }

    // Cambiar base URL en tiempo de ejecución
    setInstance(url: string) {
        this.baseURL = url;
        this.instance.defaults.baseURL = url;
    }

    // Obtener instancia directa de Axios
    getInstance(): AxiosInstance {
        return this.instance;
    }
}

export const apiService = new ApiService();
export default apiService;
