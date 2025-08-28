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

                totalSubcategories: subcategoriesResponse.success && subcategoriesResponse.data && Array.isArray(subcategoriesResponse.data) ? subcategoriesResponse.data.length : 0,

                totalProducts: productsResponse.success && productsResponse.data && Array.isArray(productsResponse.data) ? productsResponse.data.length : 0
            })

        } catch (error) {
            console.warn('[screens/HomeScreen.tsx] Error cargando estadisticas: ', error);
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
    }> = ({ title, value, color, iconName }) => (
        <View style={[globalStyles.homeCard, { borderLeftColor: color, borderLeftWidth: 4 }]}>
            <View style={globalStyles.homeCardHeader}>
                {/**iconos vectoriales dinamicos */}
                <Ionicons name={iconName as any} size={24} color={color} style={globalStyles.homeCardIcon} />
                <Text style={globalStyles.homeCardTitle}>{title}</Text>
                <Text style={[globalStyles.homeCardValue, { color }]}>{value}</Text>
            </View>
        </View>
    )
    //botones interactivos
    const QuickActionButton: React.FC<{
        title: string;
        iconName: string;
        onPress: () => void;
        color?: string;
    }> = ({ title, iconName, onPress, color = colors.primary }) => (
        <TouchableOpacity
            style={[globalStyles.homeActionButton, {
                borderColor: color
            }]}
            onPress={onPress}
        >
            {/**color personalizable segun el tipo de accion */}
            <Ionicons name={iconName as any} size={20} color={color} style={globalStyles.homeActionIcon} />
            <Text style={[globalStyles.homeActionTitle, { color }]}>{title}</Text>
        </TouchableOpacity>
    );
    if (isLoading) {
        return (
            <View style={globalStyles.loadingContainer}>
                <Text style={globalStyles.loadingText}>Cargando dashboard</Text>
            </View>
        );
    }
    return (
        <ScrollView
            style={globalStyles.container}
            refreshControl={
                <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={handleRefresh}
                    colors={[colors.primary]}
                />
            }
        >
            {/**header */}
            <View style={globalStyles.homeHeader}>
                <View>
                    <Text style={globalStyles.userWelcomeText}>¡Hola</Text>
                    <Text style={globalStyles.userName}>{user?.email || 'Usuario'}</Text>
                    <Text style={globalStyles.userRole}>{user?.role === 'admin' ? 'Administrador' : 'Coordinador'}</Text>
                </View>
                <TouchableOpacity
                    style={globalStyles.logoutButton}
                    onPress={handleLogout}
                >
                    <Text style={globalStyles.logoutButtonText}>Salir</Text>
                </TouchableOpacity>
            </View>
            {/**Estadisticas */}
            <View style={globalStyles.homeSection}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md }}>
                    <Ionicons name="bar-chart" size={24} color={colors.primary} style={{ marginRight: spacing.xs }} />
                    <Text style={globalStyles.homeSectionTitle}>Resumen</Text>
                </View>
                <View style={globalStyles.homeGrid}>
                    {hasRole('admin') && (
                        <StatCard
                            title="Usuarios"
                            value={stats.totalUsers}
                            color={colors.admin}
                            iconName="people"
                        />
                    )}
                    <StatCard
                        title="Categorias"
                        value={stats.totalCategories}
                        color={colors.secondary}
                        iconName="folder"
                    />
                    <StatCard
                        title="Subcategorias"
                        value={stats.totalSubcategories}
                        color={colors.Coordinador}
                        iconName="albums"
                    />
                    <StatCard
                        title="Productos"
                        value={stats.totalProducts}
                        color={colors.accent}
                        iconName="cube"
                    />
                </View>
            </View>
            {/**Acciones rapidas */}
            <View style={globalStyles.homeSection}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md }}>
                    <Ionicons name='flash' size={24} color={colors.primary} style={{ marginRight: spacing.xs }} />
                    <Text style={globalStyles.homeSectionTitle}>Acciones rápidas</Text>
                    <View style={globalStyles.homeGrid}>
                        {hasRole('admin') && (
                            <QuickActionButton
                                title='Gestión de Usuarios'
                                iconName="people"
                                onPress={() => navigation.navigate('Users' as never)}
                                color={colors.admin}
                            />
                        )}
                        <QuickActionButton
                            title='Ver categorías'
                            iconName="folder"
                            onPress={() => navigation.navigate('Categories' as never)}
                            color={colors.secondary}
                        />
                        <QuickActionButton
                            title='Ver subcategorías'
                            iconName="albums"
                            onPress={() => navigation.navigate('Subcategories' as never)}
                            color={colors.Coordinador}
                        />
                        <QuickActionButton
                            title='Ver productos'
                            iconName="cube"
                            onPress={() => navigation.navigate('Products' as never)}
                            color={colors.accent}
                        />
                    </View>
                    {/**Informacion del sistema */}
                    <View style={globalStyles.homeSection}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md }}>
                            <Ionicons name="information-circle" size={24} color={colors.primary} style={{ marginRight: spacing.xs }} />
                            <Text style={globalStyles.homeSectionTitle}>Información</Text>
                        </View>
                        <View style={globalStyles.homeInfoCard}>
                            <Text style={globalStyles.homeInfoText}>Bienvenido al sistema de Gestión. Aquí puedes administrar {hasRole('admin') ? 'Usuarios' : ""} Categorías, Subcategorías y Productos</Text>
                            <Text style={globalStyles.homeInfoSubtext}>
                                Desliza hacia abajo para actualizar los datos
                            </Text>
                        </View>
                    </View>

                </View>
            </View>
        </ScrollView>
    )
}
export default HomeScreen