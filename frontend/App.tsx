//componente principal de la aplicacion
//esta es la pagina principal de toda la aplicacion
import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/contexts/AuthContext'
import AppNavigator from './src/navegation/AppNavigator';

export default function App() {
    return (
        <SafeAreaProvider>
            <AuthProvider>
                <AppNavigator>

                </AppNavigator>
                <StatusBar style='auto'/>
            </AuthProvider>
        </SafeAreaProvider>
    )
}
