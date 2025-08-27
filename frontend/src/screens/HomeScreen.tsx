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
                const usersResponse = results[resultIndex];
                userCount = usersResponse.success && usersResponse.data && Array.isArray(usersResponse.data) ? usersResponse.data.length : 0;
                resultIndex++;
            }

            const categoriesResponse = results[resultIndex]
            const subcategoriesResponse = results[resultIndex + 1]
            const productsResponse = results[resultIndex + 2]

            setStats({
                totalUsers: userCount,
                totalCategories: categoriesResponse.success && categoriesResponse.data && Array.isArray(categoriesResponse.data) ? categoriesResponse.data.length : 0,

                totalSubcategories: subcategoriesResponse.success && subcategoriesResponse.data && Array.isArray(subcategoriesResponse.data) ? subcategoriesResponse.data.length : 0;

                totalProducts: productsResponse.success && productsResponse.data && Array.isArray(productsResponse.data) ? productsResponse.data.length : 0;
            })

        } catch (error) {
            console.warn('[screens/HomeScreenn.tsx] Error cargando estadisticas: ', error);
            Alert.alert('Error', 'No se pudieron cargar las estadisticas')
        } finally {
            setIsLoading(false);
            setIsRefreshing(false)
        }
    }
    const handleRefresh = () => {
        setIsRefreshing(true);
        loadDashboardData()
    }
    const handleLogout = () => {
        Alert.alert(
            'Cerrar sesión',
            '¿Estás seguro que deseas cerrar sesión?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Salir',
                    style: 'destructive',
                    onPress: logout
                }
            ]
        )
    }
    //componente para tarjetas de estadisticas
    const StatCard: React.FC<{
        title: string;
        value: number;
        color: string;
        iconName: string;
    }> = ({ title, value, color, iconName }) => {
        <View style={[globalStyles.homeCard, { borderLeftColor: color, borderLeftWidth: 4 }]}>
            <View style={globalStyles.homeCardHeader}>
                {/**icinis vectoriales dinamicos */}
                <Ionicons name={iconName as any} size={24} color={color} style={globalStyles.homeCardIcon} />
                <Text style={[globalStyles.homeCardTitle, { color }]}>{title}</Text>
                <Text style={[globalStyles.homeCardValue, { color }]}>{value}</Text>
            </View>
        </View>
    }

}