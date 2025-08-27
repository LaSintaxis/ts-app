import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext'
//importar de react-navigation
import { useNavigation } from "@react-navigation/native";
//importacioness de servicios y estilos
import { apiService } from '../services/api';
import { globalStyles, componentStyles, colors, spacing } from '../styles';

//interfaz de estadisticas del dashboard
interface DashboardStats {
    totalUsers: number;
    totalCategories: number;
    totalSubcategories: number;
    totalProducts: number;
}
//componente principal de la pantalla home
const HomeScreen: React.FC = () => {
    const { user, logout, hasRole } = useAuth();
    const navigation = useNavigation();

    //estado de las estadisticas
    const [stats, setStats] = useState<DashboardStats>({
        totalUsers: 0,
        totalCategories: 0,
        totalSubcategories: 0,
        totalProducts: 0
    });
    //Estado de carga y refresh
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    //Efecto para cargar datos al montar en componente
    useEffect(() => {
        loadDashboardData();
    }, [])
    //obtiene las estadisticas de usuarios, categorias, subcategorias y productos
    const loadDashboardData = async () => {
        try {
            const promises = [];

            //solo admin puede ver estadisticas de los usuarios
            if (hasRole('admin')) {
                promises.push(apiService.get('/users'));
            }
            //cargar datos principales de categorias subcategorias y productos
            promises.push( 
                apiService.get('/categories'),
                apiService.get('/subcategories'),
                apiService.get('/products')
            );
            //ejecutar todas consultas en paralelo
            const results = await Promise.all(promises);
            let userCount = 0;
            let resultIndex = 0;

            //procesar resultado de los usuarios si es admin
            if (hasRole('admin')) {

            }

        } catch (error) { }
    }

}