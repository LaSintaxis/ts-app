import AsyncStorage from "@react-native-async-storage/async-storage";
import apiService from "./api";
import { LoginCredentials, loginResponse, User, ChangePasswordData, ApiResponse } from '../types';

class AuthService {
    private readonly TOKEN_KEY = 'token';
    private readonly USER_KEY = 'user';

    // autentica el usuario y guarda los datos en el almacenamiento local
    async login(credentials: LoginCredentials): Promise<LoginResponse> {
        try {
            const response = await apiService.post<LoginResponse['data']>('/auth/login', credentials);

            //verificar respuesta
            if (response.success && response.data) {
                await AsyncStorage.setItem(this.TOKEN_KEY, response.data.token);
                await AsyncStorage.setItem(this.USER_KEY, JSON.stringify(response.data.user));

                return {
                    success: true,
                    message: response.message || 'login exitoso',
                    data: response.data
                }
            } else {
                throw new Error(response.message || 'Error en el login')
            }
        } catch (error: any) {
            throw {
                success: false,
                message: error.message || 'Error de conexion',
                data: null
            }
        }
    }

    //funcion de logout
    async logout():Promise<void> {
        try {
            await apiService.post('/auth/logout')
        } catch (error) {
            console.warn('[services/auth.ts] Error en logout del servidor', error)
        } finally {
            await AsyncStorage.multiRemove([this.TOKEN_KEY, this.USER_KEY])
        }
    }

    //obtener token almacenado
    async getToken(): Promise<string | null> {
        try{
            return await AsyncStorage.getItem(this.TOKEN_KEY)
        } catch (error) {
            console.warn('Error obteniendo token', error);
            return null
        }
    }

    //obtener usuario almacenado
    async getUser(): Promise<User | null> {
        try{
            const userString = await AsyncStorage.getItem(this.USER_KEY)
            return userString ? JSON.parse(userString) : null
        } catch (error) {
            console.warn('Error obteniendo usuario', error);
            return null
        }
    }

    //verificar si el usuario esta autenticado
    async isAuthenticated(): Promise<boolean> {
        const token = await this.getToken();
        const user = await this.getUser();
        return !!(token && user)
    }

    //obtener informacion del usuario del servidor
    async getCurrentUser():Promise<User>{
        try{
            const response = await apiService.get<User>('/auth/me')
            if (response.success && response.data) {
                await AsyncStorage.setItem(this.USER_KEY, JSON.stringify(response.data));
                return response.data;
            } else {
                throw new Error (response.message || 'Error obteniendo usuario')
            }
        }catch (error: any) {
            throw new Error(error.message || 'Error de conexion')
        }
    }
}