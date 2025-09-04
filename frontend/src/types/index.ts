//este archivo define todos los tipos e interfaces utilizadas en el frontend

//Interfaz de usuario
export interface User {
    _id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'admin' | 'coordinador';
    phone?: string;
    isActive: boolean;
    lastLogin?: string;
    createdAt: string;
    updatedAt: string;
    fullName?: string;
}

//Define los datos de inicio de sesion
export interface LoginCredentials {
    email: string;
    password: string;
}

//define la estructura de respuesta del endpoint de login
export interface LoginResponse {
    success: boolean;
    message: string;
    data: {
        user: User;
        token: string;
        expiresIn: string;
    };
}

//define la estructura de datos de una categoria de productos
export interface Category {
    _id: string;
    name: string;
    description?: string;
    slug: string;
    isActive: boolean;
    icon?: string;
    color?: string;
    sortOrder: number;
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
    subcategoriesCount?: number;
    productsCount?: number;
}
export interface Subcategory {
    _id: string;
    name: string;
    description?: string;
    slug: string;
    category: Category | string;
    isActive: boolean;
    icon?: string;
    color?: string;
    sortOrder: number;
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
    subcategoriesCount?: number;
    productsCount?: number;
}

export interface ProductImage {
    url: string;
    alt?: string;
    isPrimary: boolean;
}

export interface ProductStock {
    quantity: number;
    minStock: number;
    trackStock: boolean;
}

export interface ProductDimensions {
    weight?: number;
    length?: number;
    width?: number;
    height?: number;
}

//interfaz producto
export interface Product {
    _id: string;
    name: string;
    description?: string;
    shortDescription?: string;
    slug: string;
    sku: string;
    category: Category | string;
    subcategory: Subcategory | string;
    price: number;
    comparePrice?: number;
    cost?: number;
    stock: ProductStock;
    dimensions?: ProductDimensions;
    images: ProductImage[];
    tags: string[];
    isActive: boolean;
    isFeactured: boolean;
    isDigital: boolean;
    sortOrder: number;
    seoTitle?: string;
    seoDescription?: string;
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
    profitMargin?: boolean;
    isLowStock?: boolean;
    isOutOfStock?: boolean;
    primaryImage: ProductImage;
}

export interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    data: T;
    pagination?: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
    errors?: string[]
}

export interface CreateUserData {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: 'Admin' | 'Coordinador';
    phone?: string;
    isActive?: boolean;
}

export interface UpdateUserData {
    username?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    role?: 'Admin' | 'Coordinador';
    phone?: string;
    isActive?: boolean;
}

export interface CreateCategoryData {
    name: string;
    description?: string;
    icon?: string;
    color?: string;
    sortOrder?: string;
    isActive?: string;
}

export interface UpdateCategoryData {
    name?: string;
    description?: string;
    icon?: string;
    color?: string;
    sortOrder?: string;
    isActive?: string;
}

export interface CreateSubcategoryData {
    name: string;
    description?: string;
    category: string;
    icon?: string;
    color?: string;
    sortOrder?: string;
    isActive?: string;
}

export interface updateSubcategoryData {
    name?: string;
    description?: string;
    category: string;
    icon?: string;
    color?: string;
    sortOrder?: string;
    isActive?: string;
}

export interface CreateProductData {
    name: string;
    description?: string;
    shortDescription?: string;
    sku: string;
    category: string;
    subcategory: string;
    price: number;
    comparePrice?: number;
    cost?: number;
    stock?: ProductStock;
    dimensions?: ProductDimensions;
    images?: ProductImage[];
    tags?: string[];
    isActive?: boolean;
    isFeactured?: boolean;
    isDigital?: boolean;
    sortOrder?: number;
    seoTitle?: string;
    seoDescription?: string;
}

export interface UpdateProductData {
    name: string;
    description?: string;
    shortDescription?: string;
    sku?: string;
    category?: string;
    subcategory?: string;
    price?: number;
    comparePrice?: number;
    cost?: number;
    stock?: ProductStock;
    dimensions?: ProductDimensions;
    images?: ProductImage[];
    tags?: string[];
    isActive?: boolean;
    isFeactured?: boolean;
    isDigital?: boolean;
    sortOrder?: number;
    seoTitle?: string;
    seoDescription?: string;
}

export interface ChangePasswordData {
    currentPassword: string;
    newPassword: string;
}

export interface AuthContextType {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    login: (credentials: LoginCredentials) => Promise <void>;
    logout: () => Promise<void>;
    isAuthenticated: () => boolean;
    hasRole: (role: 'admin' | 'coordinador') => boolean;
    canDelete: () => boolean;
    canEdit: () => boolean;
}

//tipos para la negacion
export type RootStackParamList = {
    login: undefined;
    Main: undefined;
}

export type MainTabParamList = {
    Users: undefined;
    Categories: undefined;
    Subcategories: undefined;
    Products: undefined;
    Profile: undefined
}

export type UsersStackParamList = {
    UsersList: undefined;
    UserDetail: {userId: string };
    UserForm: { userId?: string }
}

export type CategoriesStackParamList = {
    CategoriesList: undefined;
    CategoryDetail: { categoryId: string }
    CategoryForm: { categoryId?: string }
}

export type SubcategoriesStackParamList = {
    SubcategoriesList: undefined;
    SubcategoryDetail: { subcategoryId: string }
    SubcategoryForm: { subcategoryId?: string }
}

export type ProductsStackParamList = {
    ProductsList: undefined;
    ProductDetail: { productId: string }
    ProductForm: { productId?: string }
}