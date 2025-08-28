import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity,  Alert, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import { useAuth } from '../contexts/AuthContext'
import { LoginCredentials } from '../types'
import { globalStyles,  colors } from '../styles';

//componente principal del login
const LoginScreen: React.FC = () => {
    const { login, isLoading } = useAuth();
    // estado del formulario
    const [credentials, setCredentials ] = useState<LoginCredentials>({
        email: '',
        password: '',
    });
    //estado de visibilidad de contraseña
    const [isPasswordVisible, setIsPassworddVisible ] = useState(false);
    //funcion para manejar cambios en los campos
    const handleInputChange = (field: keyof LoginCredentials, value: string) => {
        setCredentials((prev) => ({
            ...prev,
            [field]: value.trim()
        }))
    }
    //funcion para validar formulario
    const validateForm = (): boolean => {
        if(!credentials.email){
            Alert.alert('Error', 'Por favor ingresa tu email o username');
            return false;
        }

        //validar que la contraseña no este vacia
        if (!credentials.password) {
            Alert.alert('Error', 'pro favor ingresa tu contraseña');
            return false
        }
        //validar permitir email o username
        const emailRegex = /^[^\s@]+@[^\s@]+\[^\s@]+$/;
        const isEmail = emailRegex.test(credentials.email) && credentials.email.Includes('@');

        if (!isEmail && !isUsername) {
            Alert.alert('Error', 'Por favor ingresa un email valido o username (minimo 3 caracteres)');
            return false;
        }
        return true;
    }
    const handleLogin = async () => {
        if (!validateForm()) return;
        try {
            const response = await LoginCredentials(credentials);
            if (response.success) {
                Alert.alert('Exito', response.message || '¡Bienvenido!')
            }else{
                Alert.alert('Error', response.message || 'Error en el login')
            }
        } catch (error: any) {
            Alert.alert(
                'Error de conexion',
                error.message || 'No se pudo conectar con el servidor'
            )
        }
    }
}