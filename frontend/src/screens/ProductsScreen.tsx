import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert, TextInput, RefreshControl, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/api';
import { Product, Category, Subcategory } from '../types';
import { globalStyles, componentStyles } from '../styles';

const ProductsScreen: React.FC = () => {
    const { canEdit, canDelete } = useAuth();

    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
    const [filteredSubcategories, setFilteredSubcategories] = useState<Subcategory[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        sku: '',
        description: '',
        shortDescription: '',
        categoryId: '',
        subcategoryId: '',
        price: '',
        comparePrice: '',
        cost: '',
        stockQuantity: '',
        minStock: '',
        weight: '',
        length: '',
        width: '',
        height: ''
    });

    // Cargar datos iniciales
    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (formData.categoryId) {
            const filtered = subcategories.filter(sub =>
                typeof sub.category === 'object'
                    ? sub.category._id === formData.categoryId
                    : sub.category === formData.categoryId
            );
            setFilteredSubcategories(filtered);

            // Limpiar subcategoría si no es válida
            if (!filtered.some(sub => sub._id === formData.subcategoryId)) {
                setFormData(prev => ({ ...prev, subcategoryId: '' }));
            }
        } else {
            setFilteredSubcategories([]);
            setFormData(prev => ({ ...prev, subcategoryId: '' }));
        }
    }, [formData.categoryId, subcategories]);

    const loadData = async () => {
        setIsLoading(true);
        try {
            await Promise.all([loadProducts(), loadCategories(), loadSubcategories()]);
        } catch (error) {
            console.warn('Error cargando datos: ', error);
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
        }
    };

    const loadProducts = async () => {
        try {
            const response = await apiService.get<Product[]>('/products');
            if (response.success && Array.isArray(response.data)) {
                setProducts(response.data);
            }
        } catch (error) {
            console.warn('[ProductsScreen] Error cargando productos: ', error);
            Alert.alert('Error', 'No se pudieron cargar los productos');
        }
    };

    const loadCategories = async () => {
        try {
            const response = await apiService.get<Category[]>('/categories');
            if (response.success && Array.isArray(response.data)) {
                setCategories(response.data);
            }
        } catch (error) {
            console.warn('[ProductsScreen] Error cargando categorías: ', error);
        }
    };

    const loadSubcategories = async () => {
        try {
            const response = await apiService.get<Subcategory[]>('/subcategories');
            if (response.success && Array.isArray(response.data)) {
                setSubcategories(response.data);
            }
        } catch (error) {
            console.warn('[ProductsScreen] Error cargando subcategorías: ', error);
        }
    };

    const handleRefresh = () => {
        setIsRefreshing(true);
        loadData();
    };

    const resetFormData = () => ({
        name: '',
        sku: '',
        description: '',
        shortDescription: '',
        categoryId: '',
        subcategoryId: '',
        price: '',
        comparePrice: '',
        cost: '',
        stockQuantity: '',
        minStock: '',
        weight: '',
        length: '',
        width: '',
        height: ''
    });

    const openCreateModal = () => {
        setEditingProduct(null);
        setFormData(resetFormData());
        setIsModalVisible(true);
    };

    const openEditModal = (product: Product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            sku: product.sku,
            description: product.description || '',
            shortDescription: product.shortDescription || '',
            categoryId: typeof product.category === 'object' ? product.category._id : product.category,
            subcategoryId: typeof product.subcategory === 'object' ? product.subcategory._id : product.subcategory,
            price: product.price.toString(),
            comparePrice: product.comparePrice?.toString() || '',
            cost: product.cost?.toString() || '',
            stockQuantity: product.stock.quantity.toString(),
            minStock: product.stock.minStock.toString(),
            weight: product.dimensions?.weight?.toString() || '',
            length: product.dimensions?.length?.toString() || '',
            width: product.dimensions?.width?.toString() || '',
            height: product.dimensions?.height?.toString() || ''
        });
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setEditingProduct(null);
        setFormData(resetFormData());
    };

    const validateForm = () => {
        if (!formData.name.trim()) { Alert.alert('Error', 'El nombre es requerido'); return false; }
        if (!formData.sku.trim()) { Alert.alert('Error', 'El SKU es requerido'); return false; }
        if (!formData.categoryId.trim()) { Alert.alert('Error', 'La categoría es requerida'); return false; }
        if (!formData.subcategoryId.trim()) { Alert.alert('Error', 'La subcategoría es requerida'); return false; }
        if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
            Alert.alert('Error', 'El precio debe ser un número válido mayor a 0'); return false;
        }
        if (!formData.stockQuantity || isNaN(Number(formData.stockQuantity)) || Number(formData.stockQuantity) < 0) {
            Alert.alert('Error', 'La cantidad en stock debe ser un número válido'); return false;
        }
        return true;
    };

    const handleSave = async () => {
        if (!validateForm()) return;
        try {
            setIsLoading(true);
            const productData = {
                name: formData.name.trim(),
                sku: formData.sku.trim(),
                description: formData.description.trim() || undefined,
                shortDescription: formData.shortDescription.trim() || undefined,
                category: formData.categoryId,
                subcategory: formData.subcategoryId,
                price: Number(formData.price),
                comparePrice: formData.comparePrice ? Number(formData.comparePrice) : undefined,
                cost: formData.cost ? Number(formData.cost) : undefined,
                stock: {
                    quantity: Number(formData.stockQuantity),
                    minStock: Number(formData.minStock) || 0,
                    trackStock: true
                },
                dimensions: {
                    weight: formData.weight ? Number(formData.weight) : undefined,
                    length: formData.length ? Number(formData.length) : undefined,
                    width: formData.width ? Number(formData.width) : undefined,
                    height: formData.height ? Number(formData.height) : undefined
                }
            };
            if (editingProduct) {
                const response = await apiService.put(`/products/${editingProduct._id}`, productData);
                if (response.success) {
                    Alert.alert('Éxito', 'Producto actualizado correctamente');
                    closeModal();
                    loadProducts();
                }
            } else {
                const response = await apiService.post('/products', productData);
                if (response.success) {
                    Alert.alert('Éxito', 'Producto creado correctamente');
                    closeModal();
                    loadProducts();
                }
            }
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Error al guardar el producto');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = (product: Product) => {
        Alert.alert('Confirmar eliminación', `¿Estás seguro que deseas eliminar el producto ${product.name}?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Eliminar', style: 'destructive', onPress: () => performDelete(product._id) }
            ]);
    };

    const performDelete = async (productId: string) => {
        try {
            setIsLoading(true);
            const response = await apiService.delete(`/products/${productId}`);
            if (response.success) {
                Alert.alert('Éxito', 'Producto eliminado correctamente');
                loadProducts();
            }
        } catch (error: any) {
            console.log('[ProductsScreen] Error en eliminación', error);
            Alert.alert('Error', error.message || 'Error al eliminar el producto');
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleStatus = (product: Product) => {
        const action = product.isActive ? 'Desactivar' : 'Activar';
        const warningMessage = product.isActive ? 'El producto no estará disponible mientras esté desactivado' : 'El producto volverá a estar disponible para la venta';

        Alert.alert(
            `${action} Producto`,
            `¿Estás seguro de que deseas ${action} el producto ${product.name}?\n\n${warningMessage}`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: action,
                    style: product.isActive ? 'destructive' : 'default',
                    onPress: () => performToggleStatus(product._id)
                }
            ]
        );
    };

    const performToggleStatus = async (productId: string) => {
        try {
            setIsLoading(true);
            const response = await apiService.patch(`/products/${productId}/toggle-status`);
            if (response.success) {
                Alert.alert('Éxito', response.message || 'Estado de producto actualizado correctamente');
                loadProducts();
            }
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Error al cambiar el estado del producto');
        } finally {
            setIsLoading(false);
        }
    };

    const getCategoryName = (categoryId: string) => categories.find(c => c._id === categoryId)?.name || 'Categoría no encontrada';
    const getSubcategoryName = (subcategoryId: string) => subcategories.find(s => s._id === subcategoryId)?.name || 'Subcategoría no encontrada';

    const formatPrice = (price: number) =>
        new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(price);

    const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
        <View style={[componentStyles.baseCard, !product.isActive && componentStyles.cardInactive]}>
            <View style={componentStyles.cardHeader}>
                <View style={componentStyles.cardInfo}>
                    <View style={componentStyles.titleRow}>
                        <Text style={[componentStyles.cardTitle, !product.isActive && componentStyles.cardTitleInactive]}>{product.name}</Text>
                        <View style={componentStyles.priceContainer}>
                            <Text style={[componentStyles.price, !product.isActive && componentStyles.priceInactive]}>{formatPrice(product.price)}</Text>
                        </View>
                        <View style={[componentStyles.statusBadge, product.isActive ? componentStyles.statusBadgeActive : componentStyles.statusBadgeInactive]}>
                            <Text style={[componentStyles.statusBadgeText, product.isActive ? componentStyles.statusBadgeTextActive : componentStyles.statusBadgeTextInactive]}>
                                {product.isActive ? 'Activo' : 'Inactivo'}
                            </Text>
                        </View>
                    </View>

                    <View style={componentStyles.badgeContainer}>
                        <View style={componentStyles.categoryBadge}>
                            <Text style={componentStyles.categoryBadgeText}>
                                {typeof product.category === 'object' ? product.category.name : getCategoryName(product.category)}
                            </Text>
                        </View>
                        <View style={componentStyles.subcategoryBadge}>
                            <Text style={componentStyles.subcategoryBadgeText}>
                                {typeof product.subcategory === 'object' ? product.subcategory.name : getSubcategoryName(product.subcategory)}
                            </Text>
                        </View>
                    </View>

                    <View style={componentStyles.productDetails}>
                        <Text style={[componentStyles.productSku, !product.isActive && componentStyles.productDetailInactive]}>
                            SKU: {product.sku}
                        </Text>
                        <Text style={[componentStyles.productStock, !product.isActive && componentStyles.productDetailInactive]}>
                            Stock: {product.stock.quantity} unidades
                            {product.stock.quantity <= product.stock.minStock && <Text style={componentStyles.lowStockWarning}> Bajo Stock</Text>}
                        </Text>
                    </View>

                    {product.shortDescription && (
                        <Text style={[componentStyles.cardDescription, !product.isActive && componentStyles.cardDescriptionInactive]}>
                            {product.shortDescription}
                        </Text>
                    )}

                    <Text style={componentStyles.productDate}>Creada: {new Date(product.createdAt).toLocaleDateString()}</Text>
                </View>

                <View style={componentStyles.actionButtonsContainer}>
                    {canEdit() && (
                        <TouchableOpacity
                            style={[componentStyles.toggleButton, product.isActive ? componentStyles.toggleButtonActive : componentStyles.toggleButtonInactive]}
                            onPress={() => handleToggleStatus(product)}
                        >
                            <Text style={componentStyles.toggleButtonText}>{product.isActive ? 'Desactivar' : 'Activar'}</Text>
                        </TouchableOpacity>
                    )}

                    {canEdit() && (
                        <TouchableOpacity style={componentStyles.actionButton} onPress={() => openEditModal(product)}>
                            <Ionicons name='create' size={18} color='#2196f3' />
                        </TouchableOpacity>
                    )}

                    {canDelete() && (
                        <TouchableOpacity style={[componentStyles.actionButton, componentStyles.deleteButton]} onPress={() => handleDelete(product)}>
                            <Ionicons name='trash' size={18} color='#f44336' />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );

    if (isLoading && !isRefreshing) {
        return (
            <View style={globalStyles.loadingContainer}>
                <ActivityIndicator size='large' color='#4ecdc4' />
                <Text style={globalStyles.loadingText}>Cargando Productos</Text>
            </View>
        );
    }

    return (
        <View style={globalStyles.screenContainer}>
            <View style={globalStyles.screenHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="cube" size={24} color='white' />
                    <Text style={globalStyles.headerTitle}>Productos</Text>
                </View>
                {canEdit() && (
                    <TouchableOpacity style={globalStyles.primaryButton} onPress={openCreateModal}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="add" size={24} color='white' />
                            <Text style={globalStyles.primaryButtonText}>Agregar</Text>
                        </View>
                    </TouchableOpacity>
                )}
            </View>

            <ScrollView
                style={globalStyles.screenContainer}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} colors={['#4ecdc4']} />}
            >
                {products.length === 0 ? (
                    <View style={globalStyles.emptyStateContainer}>
                        <Text style={globalStyles.titleText}>Productos</Text>
                        <Text style={globalStyles.emptyStateText}>No hay productos</Text>
                        <Text style={globalStyles.emptyStateSubtext}>
                            {canEdit() ? 'Toca "Agregar" para crear el primer producto' : 'No se han creado productos aún'}
                        </Text>
                    </View>
                ) : (
                    products.map(product => <ProductCard key={product._id} product={product} />)
                )}
            </ScrollView>

            {isModalVisible && (
                <View style={globalStyles.productsModalOverlay}>
                    <View style={globalStyles.productsModalContent}>
                        <View style={globalStyles.productsModalHeader}>
                            <Text style={globalStyles.productsModalTitle}>
                                {editingProduct ? 'Editar Producto' : 'Nuevo producto'}
                            </Text>
                            <TouchableOpacity style={globalStyles.productsModalCloseButton} onPress={closeModal}>
                                <Text style={globalStyles.productsModalCancelButton}>X</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={{ flex: 1 }}>
                            <Text style={globalStyles.productsFormSectionTitle}>Información Básica</Text>

                            <View style={globalStyles.productsFormGroup}>
                                <Text style={globalStyles.productsFormLabel}>SKU*</Text>
                                <TextInput
                                    style={globalStyles.productsFormInput}
                                    value={formData.sku}
                                    onChangeText={(value) => setFormData({ ...formData, sku: value })}
                                    placeholder="SKU del producto"
                                    placeholderTextColor="#999"
                                />
                            </View>

                            <View style={globalStyles.productsFormGroup}>
                                <Text style={globalStyles.productsFormLabel}>Nombre*</Text>
                                <TextInput
                                    style={globalStyles.productsFormInput}
                                    value={formData.name}
                                    onChangeText={(value) => setFormData({ ...formData, name: value })}
                                    placeholder="Nombre del producto"
                                    placeholderTextColor="#999"
                                />
                            </View>

                            <Text style={globalStyles.productsFormSectionTitle}>Categorización</Text>

                            <View style={globalStyles.productsFormGroup}>
                                <Text style={globalStyles.productsFormLabel}>Categoría*</Text>
                                <View style={[globalStyles.textInput, { paddingHorizontal: 0 }]}>
                                    <Picker
                                        selectedValue={formData.categoryId}
                                        onValueChange={(value: string) => setFormData({ ...formData, categoryId: value })}
                                        style={{ color: '#333' }}
                                    >
                                        <Picker.Item label="Selecciona una categoría" value="" />
                                        {categories.map(category => <Picker.Item key={category._id} label={category.name} value={category._id} />)}
                                    </Picker>
                                </View>
                            </View>

                            <View style={globalStyles.productsFormGroup}>
                                <Text style={globalStyles.productsFormLabel}>Subcategoría*</Text>
                                <View style={[globalStyles.productsFormPickerContainer, filteredSubcategories.length === 0 && globalStyles.productsFormPickerDisabled]}>
                                    <Picker
                                        selectedValue={formData.subcategoryId}
                                        onValueChange={(value: string) => setFormData({ ...formData, subcategoryId: value })}
                                        enabled={filteredSubcategories.length > 0}
                                        style={globalStyles.productsFormPicker}
                                    >
                                        <Picker.Item label={filteredSubcategories.length > 0 ? 'Selecciona una subcategoría' : 'Primero selecciona una categoría'} value="" />
                                        {filteredSubcategories.map(sub => <Picker.Item key={sub._id} label={sub.name} value={sub._id} />)}
                                    </Picker>
                                </View>
                            </View>

                            <Text style={globalStyles.productsFormSectionTitle}>Precios</Text>
                            <View style={globalStyles.productsFormGroup}>
                                <Text style={globalStyles.productsFormLabel}>Precio*</Text>
                                <TextInput
                                    style={globalStyles.productsFormInput}
                                    value={formData.price}
                                    onChangeText={(value) => setFormData({ ...formData, price: value })}
                                    placeholder="0"
                                    placeholderTextColor="#999"
                                    keyboardType="numeric"
                                />
                            </View>

                            <Text style={globalStyles.productsFormSectionTitle}>Inventario</Text>
                            <View style={globalStyles.productsFormGroup}>
                                <Text style={globalStyles.productsFormLabel}>Cantidad de Stock*</Text>
                                <TextInput
                                    style={globalStyles.productsFormInput}
                                    value={formData.stockQuantity}
                                    onChangeText={(value) => setFormData({ ...formData, stockQuantity: value })}
                                    placeholder="0"
                                    placeholderTextColor="#999"
                                    keyboardType="numeric"
                                />
                            </View>

                            <View style={globalStyles.productsModalActions}>
                                <TouchableOpacity style={globalStyles.productsModalCancelButton} onPress={closeModal}>
                                    <Text style={globalStyles.productsModalCancelButtonText}>Cancelar</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={globalStyles.primaryButton} onPress={handleSave}>
                                    <Text style={globalStyles.primaryButtonText}>Guardar</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            )}
        </View>
    );
};

export default ProductsScreen;
