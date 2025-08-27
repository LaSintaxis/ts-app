//Contexto global de autenticacion

//importa dependencias
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { authService } from '../services/auth'; //servicio de autenticacion
import { User, LoginCredentials, LoginResponse } from '../types'; //tipos TypeScript

//Interfaz de contexto
interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;

    // funciones de autenticacion
    login: (credentials: LoginCredentials) =>
        Promise<LoginResponse>;
    logout: () => Promise<void>;
    refresh: () => Promise<void>;
    //verificar permisos
    canDelete: () => boolean;
    canEdit: () => boolean;
    hasRole: (role: 'admin' | 'coordinador') => boolean;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            setIsLoading(true);
            const isAuth = await authService.isAuthenticated();
            if (isAuth) {
                const isValidToken = await authService.verifyToken();
                if (isValidToken) {
                    const userData = await authService.getCurrentUser();
                    setUser(userData);
                } else {
                    await authService.clearAuthData();
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error('[contexts/AuthContext.tsx] Error verificando autenticacion: ', error);
            await authService.clearAuthData();
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }

    //proceso de inicio de sesion del login
    const login = async (credentials: LoginCredentials):
    Promise<LoginResponse> => {
        try {
            setIsLoading(true);

            const response = await authService.login(credentials);
            if (response.success && response.data) {
                setUser(response.data.user)
            }
            return response;
        } catch ( error: any ) {
            throw error;
        } finally {
            setIsLoading(false)
        }
    }

    // cierre de sesion de usuario
    const logout = async (): Promise<void> => {
        try {
            setIsLoading(true);
            await authService.logout();
            setUser(null);
        } catch (error) {
            console.warn('[contexts/AuthContext.tsx] Error en logout: ', error);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }
    //refresca los datos de usuario actual sin hacer login de nuevo
    const refreshUser = async (): Promise<void> => {
        try {
            if (user) {
                const userData = await authService.getCurrentUser();
                setUser(userData);
            }
        } catch (error) {
            console.warn('[contexts/AuthContext.tsx] Error refrescando usuario: ', error);
            await logout();
        }
    }

    //Permisoso de eliminar - solo admin
    const canDelete = (): boolean => {
        return user?.role === 'admin';
    }
    //permisos de edicion
    const canEdit = (): boolean => {
        return user?.role === 'admin' || user?.role === 'coordinador';
    }
    //verificar rol especifico
    const hasRole = (role: 'admin' | 'coordinador'): boolean => {
        return user?.role === role;
    }
    const isAuthenticated = !!user;

    //datos de las funciones que estaran disponibles en app
    const value: AuthContextType = {
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        refreshUser,
        canDelete,
        canEdit,
        hasRole
    }
}
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('[contexts/AuthContext.tsx] useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
}
export { AuthContext };
export default AuthProvider;