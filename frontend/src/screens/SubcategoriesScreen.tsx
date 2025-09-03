import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert, Modal, TextInput, RefreshControl, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker' //selector desplegable
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext'
import { apiService } from '../services/api';
import { Subcategory, Category } from '../types'
import { globalStyles, componentStyles } from '../styles';

const SubcategoriesScreen: React.FC = () => {
    //autenticacion y permisos
    const { canEdit, canDelete } = useAuth();
    //estados de los componentes
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingSubcategory, setEditingSubcategory] = useState<Subcategory | null>(null);

    //Estado del formulario
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        categoryId: ''
    })
    //cargar categorias
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            await Promise.all([loadSubcategories(), loadCategories()]);
        } catch (error) {
            console.warn('Error cargando datos: ', error)
        }
    }

    //funcion para cargar subcategorias desde la api
    const loadSubcategories = async () => {
        try {
            const response = await apiService.get<Subcategory[]>('/subcategories');
            if (response.success && response.data && Array.isArray(response.data)) {
                setSubcategories(response.data)
            }
        } catch (error) {
            console.warn('[screens/SubcategoriesScreen.tsx] Error cargando subcategorias ', error)
            Alert.alert('Error', 'No se pudieron cargar las subcategorias')
        } finally {
            setIsLoading(false);
            setIsRefreshing(false)
        }
    }
    //funcion para cargar categorias desde la api
    const loadCategories = async () => {
        try {
            const response = await apiService.get<Category[]>('/categories');
            if (response.success && response.data && Array.isArray(response.data)) {
                setCategories(response.data)
            }
        } catch (error) {
            console.warn('[screens/SubcategoriesScreen.tsx] Error cargando categorias ', error)
        }
    }
    const handleRefresh = () => {
        setIsRefreshing(true);
        loadData();
    }

    const openCreateModal = () => {
        setEditingSubcategory(null);
        setFormData({ name: '', description: '', categoryId: '' });
        setIsModalVisible(true)
    }

    const openEditModal = (subcategory: Subcategory) => {
        setEditingSubcategory(subcategory);
        setFormData({
            name: subcategory.name,
            description: subcategory.description || '',
            categoryId: typeof subcategory.category === 'object' ? subcategory.category._id : subcategory.category
        });
        setIsModalVisible(true)
    };
    const closeModal = () => {
        setIsModalVisible(false)
        setEditingSubcategory(null);
        setFormData({ name: '', description: '', categoryId: '' });
    };
    const handleSave = async () => {
        if (!formData.name.trim()) {
            Alert.alert('Error', 'El nombre es requerido');
            return;
        }
        if (!formData.categoryId) {
            Alert.alert('Error', 'La categoria es requerida')
        }
        try {
            setIsLoading(true);
            if (editingSubcategory) {
                //actualizar subcategoria existente
                const response = await apiService.put(`/subcategories/${editingSubcategory._id}`, formData);
                if (response.success) {
                    Alert.alert('Exito', 'Subcategoria actualizada correctamente');
                    closeModal();
                    loadSubcategories()
                }
            } else {
                //crear nueva subcategoria
                const response = await apiService.post('/subcategories', formData);
                if (response.success) {
                    Alert.alert('Exito', 'Subcategoria creada correctamente')
                    closeModal();
                    loadSubcategories()
                }
            }
        } catch (error) {
            Alert.alert('Error', error.message || 'Error al guardar la subcategoria');
        } finally {
            setIsLoading(false);
        }
    };
    const handleDelete = (subcategory: Subcategory) => {
        Alert.alert('Confirmar eliminación', `¿Estás seguro que deseas eliminar la subcategoria ${subcategory.name}?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: () => performDelete(subcategory._id)
                },
            ]
        )
    }
    const performDelete = async (subcategoryId: string) => {
        try {
            setIsLoading(true);
            const response = await apiService.delete(`/subcategories/${subcategoryId}`);
            if (response.success) {
                Alert.alert('Exito', 'Subcategoria eliminada correctamente')
                loadSubcategories();
            }
        } catch (error: any) {
            if (__DEV__) {
                console.log(' [screens/SubcategoriesScreen.tsx] Error en eliminación ', error);
            }
            //manejo especifico para el error de subcategorias asociadas
            const errorMessage = error.message || '';
            if (errorMessage.includes('productos asociados') || errorMessage.includes('tiene productos') || errorMessage.includes('products associated') || errorMessage.toLowerCase().includes('productos asociados')) {
                Alert.alert(
                    'No se puede eliminar',
                    'Esta subcategoría tiene productos asociados.\n\nPara eliminarla, primero debes:\n\n*Eliminar todos los productos de esta subcategoría. Ó\n*Cambiar los productos a otra subcategoría\n\nLuego podrás eliminar esta subcategoría.',
                    [{ text: 'Entendido', style: 'default' }]
                )
            } else {
                Alert.alert('Error', errorMessage || 'Error al eliminar la subcategoría')
            }
        } finally {
            setIsLoading(false);
        }
    }
    //funcion para activar o desactivar categoria
    const handleToggleStatus = (subcategory: Subcategory) => {
        const action = subcategory.isActive ? 'Desactivar' : 'Activar';
        const warningMessage = subcategory.isActive ? 'Al desactivar esta subcategoria, también se desactivarán todos los productos asociados' : 'Al activar esta subcategoria, prodrás gestionar sus productos nuevamente';

        Alert.alert(
            `${action.charAt(0).toUpperCase() + action.slice(1)} Subcategoría`,
            `¿Estás seguro de que deseas ${action} la subcategoría ${subcategory.name}?\n\n${warningMessage}`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: action.charAt(0).toUpperCase() + action.slice(1),
                    style: subcategory.isActive ? 'destructive' : 'default',
                    onPress: () => performToggleStatus(subcategory._id)
                }
            ]
        )
    }
    const performToggleStatus = async (subcategoryId: string) => {
        try {
            setIsLoading(true);
            const response = await apiService.patch(`/subcategories/${subcategoryId}/toggle-status`);
            if (response.success) {
                Alert.alert('Exito', response.message || 'Estado de subcategoria actualizado correctamente');
                loadSubcategories();
            }
        } catch (error: any) {
            Alert.alert('Error', error.message || '[screens/SubcategoriesScreen.tsx] Error al cambiar el estado de la subcategoría')
        } finally {
            setIsLoading(false)
        }
    }

    const getCategoryName = (categoryId: string) => {
        const category = categories.find(cat => cat._id === categoryId);
        return category?.name || 'Categoria no encontrada'
    }

    const SubcategoryCard: React.FC<{ subcategory: Subcategory }> = ({ subcategory }) => (
        <View style={[
            componentStyles.baseCard,
            !subcategory.isActive && componentStyles.cardInactive
        ]}>
            <View style={componentStyles.cardHeader}>
                <View style={componentStyles.cardInfo}>
                    <View style={componentStyles.titleRow}>
                        <Text style={[
                            componentStyles.cardTitle,
                            !subcategory.isActive && componentStyles.cardTitleInactive
                        ]}>{subcategory.name}</Text>
                        <View style={[
                            componentStyles.statusBadge, subcategory.isActive ? componentStyles.statusBadgeActive : componentStyles.statusBadgeInactive
                        ]}>
                            <Text style={[
                                componentStyles.statusBadgeText, subcategory.isActive ? componentStyles.statusBadgeTextActive : componentStyles.statusBadgeTextInactive
                            ]}>{subcategory.isActive ? 'Activa' : 'Inactiva'}</Text>
                        </View>
                    </View>
                    <View style={componentStyles.categoryBadge}>
                        <Text style={componentStyles.categoryBadgeText}>
                            {typeof subcategory.category === 'object' ? subcategory.category.name : getCategoryName(subcategory.category)}
                        </Text>
                    </View>
                    {subcategory.description && (
                        <Text style={[
                            componentStyles.cardDescription, !subcategory.isActive && componentStyles.cardDescriptionInactive
                        ]}>
                            {subcategory.description}
                        </Text>
                    )}
                    <Text style={componentStyles.cardDate}>
                        Creada: {new Date(subcategory.createdAt).toLocaleDateString()}
                    </Text>
                </View>
                <View style={componentStyles.cardActions}>
                    {canEdit() && (
                        <TouchableOpacity
                            style={[componentStyles.toggleButton, subcategory.isActive ? componentStyles.toggleButtonActive : componentStyles.toggleButtonInactive]}
                            onPress={() => handleToggleStatus(subcategory)}
                        >
                            <Text style={componentStyles.toggleButtonText}> {subcategory.isActive ? 'Desactivar' : 'Activar'}</Text>
                        </TouchableOpacity>
                    )}

                    {canEdit() && (
                        <TouchableOpacity
                            style={[componentStyles.actionButton, componentStyles.editButton]}
                            onPress={() => openEditModal(subcategory)}
                        >
                            <Ionicons name='create' size={18} color='white' />
                        </TouchableOpacity>
                    )}
                    {canDelete() && (
                        <TouchableOpacity
                            style={[componentStyles.actionButton, componentStyles.deleteButton]}
                            onPress={() => handleDelete(subcategory)}
                        >
                            <Ionicons name='trash' size={18} color='white' />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    )

    if (isLoading && !isRefreshing) {
        return (
            <View style={globalStyles.loadingContainer}>
                <ActivityIndicator size='large' color='#4ecdc4' />
                <Text style={globalStyles.loadingText}>Cargando subcategorías</Text>
            </View>
        )
    }
    return (
        <View style={globalStyles.screenContainer}>
            <View style={globalStyles.screenHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="albums" size={24} color='white' style={{ marginRight: 0 }} />
                    <Text style={globalStyles.headerTitle}>Subcategorías</Text>
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
                {subcategories.length === 0 ? (
                    <View style={globalStyles.emptyStateContainer}>
                        <Text style={globalStyles.titleText}>Subcategorías</Text>
                        <Text style={globalStyles.emptyStateText}>No hay subcategorías</Text>
                        <Text style={globalStyles.emptyStateSubtext}>
                            {canEdit() ? 'Toca "Agregar" para crear la primera subcategoría' : 'No se han creado subcategorías aún'}
                        </Text>
                    </View>
                ) : (
                    subcategories.map((subcategory) => (
                        <SubcategoryCard key={subcategory._id} subcategory={subcategory} />
                    ))
                )}
            </ScrollView>
            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={closeModal}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 20
                }}>
                    <View style={[globalStyles.card, { width: '100%', maxWidth: 400 }]}>
                        <View style={globalStyles.cardHeader}>
                            <Text style={globalStyles.titleText}>
                                {editingSubcategory ? 'Editar Subcategoria' : 'Nueva subcategoría'}
                            </Text>
                            <TouchableOpacity
                                style={globalStyles.dangerButton}
                                onPress={closeModal}
                            >
                                <Text style={globalStyles.dangerButtonText}>X</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView>
                            <View style={globalStyles.inputContainer}>
                                <Text style={globalStyles.inputLabel}>Categoría*</Text>
                                <View style={[globalStyles.textInput, { paddingHorizontal: 0 }]}>
                                    <Picker selectedValue={formData.categoryId} onValueChange={(value: string) => setFormData({ ...formData, categoryId: value })} style={{ color: '#333' }}>
                                        <Picker.Item label="Selecciona una categoría" value="" />
                                        {categories.map((category) => (
                                            <Picker.Item key={category._id} label={category.name} value={category._id} />
                                        ))}
                                    </Picker>
                                </View>
                            </View>

                            <View style={globalStyles.inputContainer}>
                                <Text style={globalStyles.inputLabel}>Nombre*</Text>
                                <TextInput style={globalStyles.textInput} value={formData.name} onChangeText={(value) => setFormData({ ...formData, name: value })} placeholder="Nombre de la subcategoría" placeholderTextColor="#999" />
                            </View>
                            <View style={globalStyles.inputContainer}>
                                <Text style={globalStyles.inputLabel}>Descripción*</Text>
                                <TextInput style={[globalStyles.textInput, { height: 80, textAlignVertical: 'top' }]} value={formData.description} onChangeText={(value) => setFormData({ ...formData, description: value })} placeholder="Descripción de la subcategoría opcional" placeholderTextColor="#999" multiline={true} numberOfLines={3} />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 16, marginTop: 16 }}>
                                <TouchableOpacity
                                    style={globalStyles.secondaryButton}
                                    onPress={closeModal}
                                >
                                    <Text style={globalStyles.secondaryButtonText}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={globalStyles.primaryButton}
                                    onPress={handleSave}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <ActivityIndicator
                                            color='#fff'
                                            size='small'
                                        />
                                    ) : (
                                        <Text style={globalStyles.primaryButtonText}>
                                            {editingSubcategory ? 'Actualizar' : 'Crear'}
                                        </Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default SubcategoriesScreen;