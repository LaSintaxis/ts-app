//Pantalla de carga se muestra mientras se realiza una accion
import React from "react";
import {View, Text, ActivityIndicator } from 'react-native'
import { globalStyles, colors } from "../styles";

//componentes de pantalla de carga
const LoadingScreen: React.FC = () => {
    return (
        //contenido principal ocupa toda la pantalla
        <View style={globalStyles.loadingScreenContainer}>
            <View style={globalStyles.loadingContent}>
                <Text style={globalStyles.appLogo}>Logo</Text>
                <Text style={globalStyles.appName}>Mi app</Text>
                <Text style={globalStyles.appSubtitle}>Sistema de gestión</Text>
                <View style={globalStyles.loadingIndicatorText}>
                    <ActivityIndicator
                        size='large' 
                        color={colors.primary}
                    />
                    <Text style={globalStyles.loadingIndicatorText}>Cargando...</Text>
                </View>
            </View>
        </View>
    )
}
export default LoadingScreen;