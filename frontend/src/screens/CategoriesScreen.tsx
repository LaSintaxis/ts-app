import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert, Modal, TextInput, RefreshControl, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
                console.log('[screens/CategoriesScreen.tsx] Error en eliminación ', error);
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
        } catch (error: any) {
            Alert.alert('Error', error.message || '[screens/CategoriesScreen.tsx] Error al cambiar el estado de la categoría')
        } finally {
            setIsLoading(false)
        }
    }
    const CategoryCard: React.FC<{ category: Category }> = ({ category }) => {
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
                <View style={componentStyles.cardHeader}>
                    <View style={componentStyles.cardInfo}>
                        <View style={componentStyles.titleRow}>
                            <Text style={[
                                componentStyles.cardTitle,
                                !category.isActive && componentStyles.cardTitleInactive
                            ]}>{category.name}</Text>
                            <View style={[
                                componentStyles.statusBadge, category.isActive ? componentStyles.statusBadgeActive : componentStyles.statusBadgeInactive
                            ]}>
                                <Text style={[
                                    componentStyles.statusBadgeText, category.isActive ? componentStyles.statusBadgeTextActive : componentStyles.statusBadgeTextInactive
                                ]}>{category.isActive ? 'Activa' : 'Inactiva'}</Text>
                            </View>
                        </View>
                        {category.description && (
                            <Text style={[
                                componentStyles.cardDescription, !category.isActive && componentStyles.cardDescriptionInactive
                            ]}>
                                {category.description}
                            </Text>
                        )}
                        <Text style={componentStyles.cardDate}>
                            Creada: {new Date(category.createdAt).toLocaleDateString()}
                        </Text>
                    </View>
                    <View style={componentStyles.cardActions}>
                        <TouchableOpacity
                            style={[componentStyles.toggleButton, category.isActive ? componentStyles.toggleButtonActive : componentStyles.toggleButtonInactive]}
                            onPress={() => handleToggleStatus(category)}
                        >
                            <Text style={componentStyles.toggleButtonText}> {category.isActive ? 'Desactivar' : 'Activar'}</Text>
                        </TouchableOpacity>
                        {canEdit() && (
                            <TouchableOpacity
                                style={[componentStyles.actionButton, componentStyles.editButton]}
                                onPress={() => openEditModal(category)}
                            >
                                <Ionicons name='create' size={18} color='white' />
                            </TouchableOpacity>
                        )}
                        {canDelete() && (
                            <TouchableOpacity
                                style={[componentStyles.actionButton, componentStyles.deleteButton]}
                                onPress={() => handleDelete(category)}
                            >
                                <Ionicons name='trash' size={18} color='white' />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        )
    }
    if (isLoading && !isRefreshing) {
        return (
            <View style={globalStyles.loadingContainer}>
                <ActivityIndicator size='large' color='#4ecdc4' />
                <Text style={globalStyles.loadingText}>Cargando categorías</Text>
            </View>
        )
    }
    return (
        <View style={globalStyles.screenContainer}>
            <View style={globalStyles.screenHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="folder" size={24} color='white' style={{ marginRight: 0 }} />
                    <Text style={globalStyles.headerTitle}>Categorías</Text>
                </View>
                {canEdit() && (
                    <TouchableOpacity
                        style={globalStyles.primaryButton}
                        onPress={openCreateModal}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="add" size={24} color='white' style={{ marginRight: 0 }} />
                            <Text style={globalStyles.primaryButtonText}>Agregar</Text>
                        </View>
                    </TouchableOpacity>
                )}
            </View>
            <ScrollView 
                style={globalStyles.screenContainer}
                refreshControl={
                    <RefreshControl 
                        refreshing={isRefreshing}
                        onRefresh={handleRefresh}
                        colors={['#4ecdc4']}
                    />
                }
            >
                {categories.length === 0 ? (
                    <View style={globalStyles.emptyStateContainer}>
                        <Text style={globalStyles.titleText}>Categorías</Text>
                        <Text style={globalStyles.emptyStateText}>No hay categorías</Text>
                        <Text style={globalStyles.emptyStateSubtext}>
                            {canEdit() ? 'Toca "Agregar" para crear la primera categoría' : 'No se han creado categorías aún'}
                        </Text>
                    </View>
                ) : (
                    categories.map((category) => (
                        <CategoryCard key ={category._id} category={category}/>
                    ))
                )}
            </ScrollView>
            <Modal 
                visible = {isModalVisible}
                animationType="slide"
                transparent = {true}
                onRequestClose={closeModal}
            >
                <View style= {{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 20
                }}>
                    <View style={[globalStyles.card, {width:'100%', maxWidth: 400}]}>
                        <View style={globalStyles.cardHeader}>
                            <Text style={globalStyles.titleText}>
                                {editingCategory ? 'Editar Categoria' : 'Nueva Categoría'}
                            </Text>
                            <TouchableOpacity
                                style={globalStyles.dangerButton}
                                onPress={closeModal}
                            >
                                <Text style={globalStyles.dangerButtonText}>X</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={globalStyles.inputContainer}>
                            <Text style={globalStyles.inputLabel}>Nombre*</Text>
                            <TextInput style={globalStyles.textInput} value={formData.name} onChangeText={(value) => setFormData({...formData, name: value})} placeholder="Nombre de la categoría" placeholderTextColor="#999"/>
                        </View>
                        <View style={globalStyles.inputContainer}>
                            <Text style={globalStyles.inputLabel}>Descripción*</Text>
                            <TextInput style={[globalStyles.textInput, {height: 80, textAlignVertical: 'top'} ]} value={formData.description} onChangeText={(value) => setFormData({...formData, description: value})} placeholder="Descripció de la categoría opcional" placeholderTextColor="#999" multiline={true} numberOfLines={3}/>
                        </View>
                        <View style= {{flexDirection: 'row', justifyContent: 'flex-end', gap: 16, marginTop: 16}}>
                            <TouchableOpacity
                                style= {globalStyles.secondaryButton}
                                onPress={closeModal}
                            >
                                <Text style={globalStyles.secondaryButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style = {globalStyles.primaryButton}
                                onPress={handleSave}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <ActivityIndicator
                                        color='#fff'
                                        size='small'
                                    />
                                ): (
                                    <Text style={globalStyles.primaryButtonText}>
                                        {editingCategory ? 'Actualizar' : 'Crear'}
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default CategoriesScreen;