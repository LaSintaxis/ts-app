import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiResponse } from '../types';

class ApiService {
    private instance: AxiosInstance;
    private baseURL: string = 'https://0.0.0.0:5000/api'; //IP publica del backend

    constructor() {
        this.instance = axios.create({
            baseURL: this.baseURL,
            timeout: 10000,
            headers: {
                "Content-Type": 'application/json'
            }
        })
        this.setupInterceptors();
    }

    private setupInterceptors() {
        this.instance.interceptors.request.use(
            async (config) => {
                if (__DEV__) {
                    console.log('[services/api.ts] Debug - enviando petición a: ', (config.baseURL || '') + (config.url || ''));
                    console.log('[services/api.ts] Debug')
                }
                try {
                    const token = await AsyncStorage.getItem("token");
                    if(token && config.headers) {
                        config.headers.Authorization = `Bearer ${token}`
                    }
                }catch (error) {
                    if (__DEV__) {
                        console.log( '[services/api.ts] Error obteniendo token: ',error)
                    }
                }
                return config;
            },
            (error) => {
                if(__DEV__) {
                    console.log('[services/api.ts] Error en la interacción request: ', error)
                }
                return Promise.reject(error)
            }
        );
        this.instance.interceptors.response.use(
            (response: AxiosResponse) => {
                if (__DEV__) {
                    console.log('[services/api.ts] Respuesta recibida', response.status, response.data)
                }
                return response
            },
            async (error) => {
                if (__DEV__) {
                    console.log('[services/api.ts] Error en respuesta: ', error.response?.status, error.response?.data || error.message)
                }
                if (error.response?.status === 401) {
                    await AsyncStorage.multiRemove(['token' , 'user'])
                }
                return Promise.reject(error)
            }
        )
    }

    //metodo generico para peticiones GET
    async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response = await this.instance.get(endpoint, config);
            return response.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    }

    //metodo generico para peticiones post
    async post<T>(endpoint: string, data: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response = await this.instance.post(endpoint, data, config);
            return response.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    }

    //metodo generico para peticiones put
    async put<T>(endpoint: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response = await this.instance.put(endpoint, config);
            return response.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    }

    //metodo generico para peticiones delete
    async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response = await this.instance.delete(endpoint, config);
            return response.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    }

    //metodo generico para peticiones patch
    async patch<T>(endpoint: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response = await this.instance.patch(endpoint, config);
            return response.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    }

    //manejo de errores
    private handleError(error: any) {
        let errorInfo;
        if (error.response) {
            const {status, data} = error.message;
            errorInfo = {
                success: false,
                message: data.message || `Error ${status}`,
                errors: data.errors || [],
                status
            }
        } else if (error.request) {
            errorInfo = {
                success: false,
                message: 'Sin conexion al servidor. Verifica tu conexion a internet',
                errors: ['NETWORK_ERROR']
            }
        } else {
            errorInfo = {
                success: false,
                message: error.message || 'Error desconocido',
                errors: ['UNKNOWN_ERROR']
            }
        }
        //crea un error personalizado con la información recolectada
        const customError = new Error(errorInfo.message);
        (customError as any).success = errorInfo.success
        (customError as any).errors = errorInfo.errors
        (customError as any).status = errorInfo.status

        return customError
    }

    //metodo para cambiar la base de url
    setIntance(url: string){
        this.baseURL = url;
        this.instance.defaults.baseURL = url
    }

    //metodo para obtener la instancia de axios
    getInstance(): AxiosInstance {
        return this.instance;
    }
}

export const apiService = new ApiService();
export default apiService;