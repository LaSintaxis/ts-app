//tipos de navegacion especial
export type RootStackParamList = {
    Login: undefined;
    Main: undefined;
}

export type MainTabParamList = {
    Home: undefined;
    Categories: undefined;
    Subcategories: undefined;
    Products: undefined;
    Profile: undefined;
    Users: undefined;
}

//tipos adicionales
export type UserStackParamList = {
    UsersList: undefined;
    UserDetail: undefined;
    UserCreate: undefined;
    UserEdit: undefined;
}
export type CategoryStackParamList = {
    CategoriesList: undefined;
    CategoryDetail: { categoryId: string };
    CategoryCreate: undefined;
    CategoryEdit: { categoryId: string};
}
export type SubcategoryStackParamList = {
    SubcategoriesList: undefined;
    SubcategoryDetail: { subcategoryId: string };
    SubcategoryCreate: undefined;
    SubcategoryEdit: { subcategoryId: string};
}
export type ProductStackParamList = {
    ProductsList: undefined;
    ProductDetail: { productId: string };
    ProductCreate: undefined;
    ProductEdit: { productId: string};
}

export type ProfileStackParamList = {
    ProfileMain: undefined;
    ChangePassword: undefined;
    EditProfile: undefined;
}