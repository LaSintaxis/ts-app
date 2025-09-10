import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, RefreshControl, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { apiService } from '../services/api';
import { globalStyles, colors, spacing } from '../styles';

// Interfaz de estadísticas
interface DashboardStats {
    totalUsers: number;
    totalCategories: number;
    totalSubcategories: number;
    totalProducts: number;
}

// Tipado de navegación
type HomeNav = {
    Users: undefined;
    Categories: undefined;
    Subcategories: undefined;
    Products: undefined;
};

const HomeScreen: React.FC = () => {
    const { user, logout, hasRole } = useAuth();
    const navigation = useNavigation<NavigationProp<HomeNav>>();

    const [stats, setStats] = useState<DashboardStats>({
        totalUsers: 0,
        totalCategories: 0,
        totalSubcategories: 0,
        totalProducts: 0
    });
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            const responses = await Promise.allSettled([
                hasRole('admin') ? apiService.get('/users') : Promise.resolve({ data: [] }),
                apiService.get('/categories'),
                apiService.get('/subcategories'),
                apiService.get('/products')
            ]);

            const [usersRes, categoriesRes, subcategoriesRes, productsRes] = responses;

            const totalUsers = hasRole('admin') && usersRes.status === 'fulfilled' && Array.isArray((usersRes.value as any).data)
                ? (usersRes.value as any).data.length
                : 0;

            const totalCategories = categoriesRes.status === 'fulfilled' && Array.isArray((categoriesRes.value as any).data)
                ? (categoriesRes.value as any).data.length
                : 0;

            const totalSubcategories = subcategoriesRes.status === 'fulfilled' && Array.isArray((subcategoriesRes.value as any).data)
                ? (subcategoriesRes.value as any).data.length
                : 0;

            const totalProducts = productsRes.status === 'fulfilled' && Array.isArray((productsRes.value as any).data)
                ? (productsRes.value as any).data.length
                : 0;

            setStats({ totalUsers, totalCategories, totalSubcategories, totalProducts });

        } catch (error) {
            console.warn('[HomeScreen] Error cargando estadísticas:', error);
            Alert.alert('Error', 'No se pudieron cargar las estadísticas');
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
        }
    };

    const handleRefresh = () => {
        setIsRefreshing(true);
        loadDashboardData();
    };

    const handleLogout = () => {
        Alert.alert('Cerrar sesión', '¿Estás seguro que deseas cerrar sesión?', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Salir', style: 'destructive', onPress: logout }
        ]);
    };

    const StatCard: React.FC<{ title: string; value: number; color: string; iconName: string }> = ({ title, value, color, iconName }) => (
        <View style={[globalStyles.homeCard, { borderLeftColor: color, borderLeftWidth: 4 }]}>
            <View style={globalStyles.homeCardHeader}>
                <Ionicons name={iconName as any} size={24} color={color} style={globalStyles.homeCardIcon} />
                <Text style={globalStyles.homeCardTitle}>{title}</Text>
                <Text style={[globalStyles.homeCardValue, { color }]}>{value}</Text>
            </View>
        </View>
    );

    const QuickActionButton: React.FC<{ title: string; iconName: string; onPress: () => void; color?: string }> = ({ title, iconName, onPress, color = colors.primary }) => (
        <TouchableOpacity style={[globalStyles.homeActionButton, { borderColor: color }]} onPress={onPress}>
            <Ionicons name={iconName as any} size={20} color={color} style={globalStyles.homeActionIcon} />
            <Text style={[globalStyles.homeActionTitle, { color }]}>{title}</Text>
        </TouchableOpacity>
    );

    if (isLoading) {
        return (
            <View style={globalStyles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={globalStyles.loadingText}>Cargando dashboard</Text>
            </View>
        );
    }

    return (
        <ScrollView
            style={globalStyles.container}
            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} colors={[colors.primary]} />}
        >
            {/* Header */}
            <View style={globalStyles.homeHeader}>
                <View>
                    <Text style={globalStyles.userWelcomeText}>¡Hola</Text>
                    <Text style={globalStyles.userName}>{user?.username || 'Usuario'}</Text>
                    <Text style={globalStyles.userRole}>{user?.role === 'admin' ? 'Administrador' : 'Coordinador'}</Text>
                </View>
                <TouchableOpacity style={globalStyles.logoutButton} onPress={handleLogout}>
                    <Text style={globalStyles.logoutButtonText}>Salir</Text>
                </TouchableOpacity>
            </View>

            {/* Estadísticas */}
            <View style={globalStyles.homeSection}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md }}>
                    <Ionicons name="bar-chart" size={24} color={colors.primary} style={{ marginRight: spacing.xs }} />
                    <Text style={globalStyles.homeSectionTitle}>Resumen</Text>
                </View>
                <View style={globalStyles.homeGrid}>
                    {hasRole('admin') && <StatCard title="Usuarios" value={stats.totalUsers} color={colors.admin} iconName="people" />}
                    <StatCard title="Categorías" value={stats.totalCategories} color={colors.secondary} iconName="folder" />
                    <StatCard title="Subcategorías" value={stats.totalSubcategories} color={colors.coordinator} iconName="albums" />
                    <StatCard title="Productos" value={stats.totalProducts} color={colors.accent} iconName="cube" />
                </View>
            </View>

            {/* Acciones rápidas */}
            <View style={globalStyles.homeSection}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md }}>
                    <Ionicons name="flash" size={24} color={colors.primary} style={{ marginRight: spacing.xs }} />
                    <Text style={globalStyles.homeSectionTitle}>Acciones rápidas</Text>
                </View>
                <View style={globalStyles.homeGrid}>
                    {hasRole('admin') && <QuickActionButton title="Gestión de Usuarios" iconName="people" onPress={() => navigation.navigate('Users')} color={colors.admin} />}
                    <QuickActionButton title="Ver categorías" iconName="folder" onPress={() => navigation.navigate('Categories')} color={colors.secondary} />
                    <QuickActionButton title="Ver subcategorías" iconName="albums" onPress={() => navigation.navigate('Subcategories')} color={colors.coordinator} />
                    <QuickActionButton title="Ver productos" iconName="cube" onPress={() => navigation.navigate('Products')} color={colors.accent} />
                </View>
            </View>

            {/* Información */}
            <View style={globalStyles.homeSection}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md }}>
                    <Ionicons name="information-circle" size={24} color={colors.primary} style={{ marginRight: spacing.xs }} />
                    <Text style={globalStyles.homeSectionTitle}>Información</Text>
                </View>
                <View style={globalStyles.homeInfoCard}>
                    <Text style={globalStyles.homeInfoText}>
                        Bienvenido al sistema de Gestión. Aquí puedes administrar{' '}
                        {hasRole('admin') ? 'Usuarios, ' : ''}
                        Categorías, Subcategorías y Productos.
                    </Text>
                    <Text style={globalStyles.homeInfoSubText}>Desliza hacia abajo para actualizar los datos</Text>
                </View>
            </View>
        </ScrollView>
    );
};

export default HomeScreen;
