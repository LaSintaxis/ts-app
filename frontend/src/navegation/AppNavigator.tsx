import React from "react";
import { Ionicons } from '@expo/vector-icons';
//importar de react-navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
//importaciones de contextos y tipos
import { useAuth } from "../contexts/AuthContext"
import { RootStackParamList, MainTabParamList } from "../types/navigation";
import { colors, spacing, typography } from "../styles";
//importar pantallas
import LoginScreen from "../screens/LoginScreen";
import LoadingScreen from "../screens/LoadingScreen";
import HomeScreen from "../screens/HomeScreen";
import UsersScreen from "../screens/UsersScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import SubcategoriesScreen from "../screens/SubcategoriesScreen";
import ProductsScreen from "../screens/ProductsScreen";
import ProfileScreen from "../screens/ProfileScreen";

//creacion de navegadores
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();
//Navegador principal 
const MainTabNavigator: React.FC = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textSecundary,
                tabBarStyle: {
                    backgroundColor: colors.surface,
                    borderTopColor: colors.border,
                    height: 60,
                    paddingBottom: spacing.sm,
                    paddingTop: spacing.sm,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: typography.fontWeight.medium,
                },
            }}
        >
            {/**cada tab representa una seccion principal de la aplicacion, los iconos cambian dinamicamente segun el estado (focused/unfocused) */}
            {/**Tab de inicio - dashboard principal */}

            <Tab.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    title: 'Inicio',
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? "home" : "home-outline"}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name='Categories'
                component={CategoriesScreen}
                options={{
                    title: 'Categoria',
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? "folder" : "folder-outline"}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name='Subcategories'
                component={SubcategoriesScreen}
                options={{
                    title: 'Subcategoria',
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? "albums" : "albums-outline"}
                            size={size}
                            color={color}
                        />
                    )
                }}
            />

            <Tab.Screen
                name='Products'
                component={ProductsScreen}
                options={{
                    title: 'Productos',
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? "cube" : "cube-outline"}
                            size={size}
                            color={color}
                        />
                    )
                }}
            />

            <Tab.Screen
                name='Profile'
                component={ProfileScreen}
                options={{
                    title: 'Perfil',
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? "person" : "person-outline"}
                            size={size}
                            color={color}
                        />
                    )
                }}
            />

            <Tab.Screen
                name='Users'
                component={UsersScreen}
                options={{
                    title: 'Usuarios',
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? "people" : "people-outline"}
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

//Navegator principal de la aplicacion
const AppNavigator: React.FC = () => {
    const { isAuthenticated, isLoading } = useAuth();
    if (isLoading) {
        return <LoadingScreen />
    }
    return (
        <NavigationContainer>
            {/**Navegador principal */}
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    animation: 'slide_from_right',
                }}
                >
                {isAuthenticated ? (
                    <Stack.Screen
                        name="Main"
                        component={MainTabNavigator}
                        options={{
                            animationTypeForReplace: 'push'
                        }}
                    />
                ) : (
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{
                            animationTypeForReplace: 'pop'
                        }}
                    />
                )}
            
            </Stack.Navigator>
        
        </NavigationContainer >
    )
}
