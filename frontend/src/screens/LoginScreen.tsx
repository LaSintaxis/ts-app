import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView, 
  ActivityIndicator 
} from 'react-native';
import { useAuth } from '../contexts/AuthContext'
import { LoginCredentials } from '../types'
import { globalStyles, colors } from '../styles';

//componente principal del login
const LoginScreen: React.FC = () => {
    const { login, isLoading } = useAuth();
    // estado del formulario
    const [credentials, setCredentials] = useState<LoginCredentials>({
        email: '',
        password: '',
    });
    //estado de visibilidad de contraseña
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    //funcion para manejar cambios en los campos (sin trim aquí)
    const handleInputChange = (field: keyof LoginCredentials, value: string) => {
        setCredentials((prev) => ({
            ...prev,
            [field]: value
        }))
    }

    //funcion para validar formulario
    const validateForm = (cleaned: LoginCredentials): boolean => {
        if (!cleaned.email) {
            Alert.alert('Error', 'Por favor ingresa tu email o username');
            return false;
        }

        if (!cleaned.password) {
            Alert.alert('Error', 'Por favor ingresa tu contraseña');
            return false
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmail = emailRegex.test(cleaned.email);
        const isUsername = cleaned.email.length >= 3; 

        if (!isEmail && !isUsername) {
            Alert.alert('Error', 'Por favor ingresa un email válido o username (mínimo 3 caracteres)');
            return false;
        }

        return true;
    }

    const handleLogin = async () => {
        // limpiamos solo antes de enviar
        const cleanedCredentials = {
            email: credentials.email.trim(),
            password: credentials.password
        };

        if (!validateForm(cleanedCredentials)) return;

        try {
            const response = await login(cleanedCredentials);

            if (response.success) {
                Alert.alert('Éxito', response.message || '¡Bienvenido!')
            } else {
                Alert.alert('Error', response.message || 'Error en el login')
            }
        } catch (error: any) {
            Alert.alert(
                'Error de conexión',
                error.message || 'No se pudo conectar con el servidor'
            )
        }
    }

    return (
        <KeyboardAvoidingView
            style={globalStyles.loginContainer} 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={globalStyles.loginScrollContainer}
                keyboardShouldPersistTaps='handled'
            >
                <View style={globalStyles.loginLogoContainer}>
                    <Text style={globalStyles.loginAppTitle}>Bienvenideee al sistema</Text>
                </View>

                <View style={globalStyles.loginFormContainer}>
                    <Text style={globalStyles.loginFormTitle}>Iniciar Sesión</Text>

                    <View style={globalStyles.inputContainer}>
                        <Text style={globalStyles.inputLabel}>Email o username</Text>
                        <TextInput 
                            style={globalStyles.textInput} 
                            value={credentials.email} 
                            onChangeText={(value: string) => handleInputChange('email', value)} 
                            placeholder="admin o admin@ejemplo.com" 
                            placeholderTextColor="#999" 
                            keyboardType="email-address" 
                            autoCapitalize="none" 
                            autoCorrect={false} 
                            editable={!isLoading} 
                        />
                    </View>

                    <View style={globalStyles.inputContainer}>
                        <Text style={globalStyles.inputLabel}>Contraseña</Text>
                        <View style={globalStyles.loginPasswordContainer}>
                            <TextInput 
                                style={globalStyles.textInput} 
                                value={credentials.password} 
                                onChangeText={(value: string) => handleInputChange('password', value)} 
                                placeholder="Tu contraseña" 
                                placeholderTextColor="#999" 
                                secureTextEntry={!isPasswordVisible} 
                                autoCapitalize="none" 
                                autoCorrect={false} 
                                editable={!isLoading} 
                            />
                            <TouchableOpacity
                                style={globalStyles.loginEyeButton} 
                                onPress={() => setIsPasswordVisible(!isPasswordVisible)} 
                                disabled={isLoading}
                            >
                                <Text style={globalStyles.loginEyeButtonText}>
                                    {isPasswordVisible ? 'Ocultar' : 'Mostrar'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <TouchableOpacity
                    style={[
                        globalStyles.loginButton,
                        isLoading && globalStyles.loginButtonDisabled
                    ]}
                    onPress={handleLogin}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color='#fff' size='small' />
                    ) : (
                        <Text style={globalStyles.loginButtonText}>Ingresar</Text>
                    )}
                </TouchableOpacity>

                <View style={globalStyles.loginInfoContainer}>
                    <Text style={globalStyles.loginInfoText}>Usa las credenciales del sistema</Text>
                </View>

                {/**Provisional mientras el desarrollo */}
                <Text style={globalStyles.loginDemoText}>
                    Admin: Admin / admin123{'\n'} 
                    Coordinador: coordinador / coord123
                </Text>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen;
