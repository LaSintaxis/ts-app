import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert, Modal, TextInput, RefreshControl, ActivityIndicator } from 'react-native';
import { useAuth } from '../contexts/AuthContext'
import { apiService } from '../services/api';
import { Category } from '../types'
import { globalStyles, componentStyles } from '../styles';

const CategoriesScreen: React.FC = () => {
    //autenticacion y permisos
    const { canEdit, canDelete } = useAuth();
    //estados de los componentes
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    //Estado del formulario
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    })
    //cargar categorias
    useEffect(() => {
        loadCategories();
    }, []);

    //funcion para cargar categorias desde la api
    const loadCategories = async () => {
        try {
            const response = await apiService.get<Category[]>('/categories');
            if (response.success && response.data && Array.isArray(response.data)) {
                setCategories(response.data)
            }
        } catch (error) {
            console.warn('[screens/CategoriesScreen.tsx] Error cargando categorias ', error)
            Alert.alert('Error', 'No se pudieron cargar las categorias')
        } finally {
            setIsLoading(false);
            setIsRefreshing(false)
        }
    }
    const handleRefresh = () => {
        setIsRefreshing(true);
        loadCategories();
    }
    const openCreateModal = () => {
        setEditingCategory(null);
        setFormData({ name: '', description: '' });
        setIsModalVisible(true)
    }
    const openEditModal = (category: Category) => {
        setEditingCategory(category);
        setFormData({ name: category.name, description: category.description });
        setIsModalVisible(true)
    };
    const closeModal = () => {
        setIsModalVisible(false)
        setEditingCategory(null);
        setFormData({ name: '', description: '' });
    };
    const handleSave = async () => {
        if (!formData.name.trim()) {
            Alert.alert('Error', 'El nombre es requerido');
            return;
        }
        try {
            setIsLoading(true);
            if (editingCategory) {
                //actualizar categoria existente
                const response = await apiService.put(`/categories/${editingCategory._id}`, formData);
                if (response.success) {
                    Alert.alert('Exito', 'Categoria actualizada correctamente');
                    closeModal();
                    loadCategories()
                }
            } else {
                //crear nueva categoria
                const response = await apiService.post('/categories', formData);
                if (response.success) {
                    Alert.alert('Exito', 'categoria creada correctamente')
                    closeModal();
                    loadCategories()
                }
            }
        } catch (error) {
            Alert.alert('Error', error.message || 'Error al guardar la categoria');
        } finally {
            setIsLoading(false);
        }
    };
    const handleDelete = (category: Category) => {
        Alert.alert('Confirmar eliminación', `¿Estás seguro que deseas eliminar la categoria ${category.name}?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: () => performDelete(category._id)
                },
            ]
        )
    }
    const performDelete = async (categoryId: string) => {
        try {
            setIsLoading(true);
            const response = await apiService.delete(`/categories/${categoryId}`);
            if (response.success) {
                Alert.alert('Exito', 'Categoria eliminada correctamente')
                loadCategories();
            }
        } catch (error: any) {
            if (__DEV__) {
                console.log('Error en eliminación ', error);
            }
            //manejo especifico para el error de subcategorias asociadas
            const errorMessage = error.message || '';
            if (errorMessage.includes('subcategorias asociadas') || errorMessage.includes('tiene subcategorias') || errorMessage.includes('subcategories associated') || errorMessage.toLowerCase().includes('subcategorias asociadas')) {
                Alert.alert(
                    'No se puede eliminar',
                    'Esta categoría tiene subcategorías asociadas.\n\nPara eliminarla, primero debes:\n\n*Eliminar todas las subcategorias de esta categoría. Ó\n*Cambiar la subcategoría a otra categoría\n\nLuego podrás eliminar esta categoría.',
                    [{ text: 'Entendido', style: 'default' }]
                )
            } else {
                Alert.alert('Error', errorMessage || 'Error al eliminar la categoría')
            }
        } finally {
            setIsLoading(false);
        }
    }
    //funcion para activar o desactivar categoria
    const handleToggleStatus = (category: Category) => {
        const action = category.isActive ? 'Desactivar' : 'Activar';
        const warningMessage = category.isActive ? 'Al desactivar esta categoria, también se desactivarán todas las subcategorías y productos asociados' : 'Al activar esta categoria, prodrás gestionar sus subcategorias y productos nuevamente';

        Alert.alert(
            `${action.charAt(0).toUpperCase() + action.slice(1)} Categoría`,
            `¿Estás seguro de que deseas ${action} la categoría ${category.name}?\n\n${warningMessage}`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: action.charAt(0).toUpperCase() + action.slice(1),
                    style: category.isActive ? 'destructive' : 'default',
                    onPress: () => performToggleStatus(category._id)
                }
            ]
        )
    }
    const performToggleStatus = async (categoryId: string) => {
        try {
            setIsLoading(true);
            const response = await apiService.patch(`/categories/${categoryId}/toggle-status`);
            if (response.success) {
                Alert.alert('Exito', response.message || 'Estado de categoria actualizado correctamente');
                loadCategories();
            }
        } catch (error:any){
            Alert.alert('Error', error.message || '[screens/CategoriesScreen.tsx] Error al cambiar el estado de la categoría')
        } finally {
            setIsLoading(false)
        }
    }
    const CategoryCard: React.FC <{ category: Category}> = ({category}) => {
        console.log('Category data: ', {
            name: category.name,
            isActive: category.isActive,
            canEdit: canEdit()
        })
        return (
            <View style={[
                componentStyles.baseCard,
                !category.isActive && componentStyles.cardInactive
            ]}>
                <View style={componentStyles.cardHeader}></View>
                <View style={componentStyles.cardInfo}></View>
                <View style={componentStyles.titleRow}>
                    <Text style={[
                        componentStyles.cardTitle,
                        !category.isActive && componentStyles.cardTitleInactive
                    ]}>{category.name}</Text>
                    <View style={[
                        
                    ]}></View>
                </View>
            </View>
        )
    }
}