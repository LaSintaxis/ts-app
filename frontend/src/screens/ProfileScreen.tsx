// Esta pantalla permite al usuario ver y gestionar su información personal

import React from 'react';
import {
  View,           
  Text,          
  ScrollView,     
  TouchableOpacity, 
  Alert,          
} from 'react-native';

import { useAuth } from '../contexts/AuthContext';      
import { globalStyles, colors } from '../styles';      


const ProfileScreen: React.FC = () => {
  const { user, logout } = useAuth(); 


  // Muestra confirmación antes de cerrar sesión
  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',                    
      '¿Estás seguro que deseas cerrar sesión?', 
      [
        { text: 'Cancelar', style: 'cancel' }, 
        { 
          text: 'Salir', 
          style: 'destructive',           
          onPress: logout                   
        },
      ]
    );
  };

  const handleChangePassword = () => {
    Alert.alert('Cambiar Contraseña', 'Función en desarrollo');
  };

  const handleEditProfile = () => {
    Alert.alert('Editar Perfil', 'Función en desarrollo');
  };

  return (
    <ScrollView style={globalStyles.container}>
      
      <View style={globalStyles.screenHeader}>
        <Text style={globalStyles.headerTitle}>Mi Perfil</Text>
      </View>

    
      <View style={globalStyles.profileCard}>
        {/* AVATAR DEL USUARIO */}
        <View style={globalStyles.profileAvatarContainer}>
          <Text style={globalStyles.profileAvatar}>Usuario</Text>
        </View>
        
        {/*INFORMACIÓN DEL USUARIO */}
        <View style={globalStyles.profileUserInfo}>
          <Text style={globalStyles.profileUserName}>{user?.username || 'Usuario'}</Text>
          <Text style={globalStyles.profileUserEmail}>{user?.email}</Text>
          
          {/* ETIQUETA DE ROL DEL USUARIO */}
          <View style={globalStyles.profileRoleContainer}>
            <Text style={globalStyles.profileRoleLabel}>
              {user?.role === 'admin' ? 'Administrador' : 'Coordinador'}
            </Text>
          </View>
        </View>
      </View>

      {/* SECCIÓN DE ACCIONES */}
      <View style={globalStyles.profileActionsSection}>
        <Text style={globalStyles.profileSectionTitle}>Configuración</Text>
        
        <TouchableOpacity 
          style={globalStyles.profileActionItem}
          onPress={handleEditProfile}
        >
          <Text style={globalStyles.profileActionIcon}>Editar</Text>
          <Text style={globalStyles.profileActionText}>Editar Perfil</Text>
          <Text style={globalStyles.profileActionArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={globalStyles.profileActionItem}
          onPress={handleChangePassword}
        >
          <Text style={globalStyles.profileActionIcon}>Password</Text>
          <Text style={globalStyles.profileActionText}>Cambiar Contraseña</Text>
          <Text style={globalStyles.profileActionArrow}>›</Text>
        </TouchableOpacity>

        <View style={globalStyles.separator} />

        <TouchableOpacity 
          style={globalStyles.profileLogoutButton}
          onPress={handleLogout}
        >
          <Text style={globalStyles.profileLogoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>

      {/* ℹ️ SECCIÓN DE INFORMACIÓN */}
      <View style={globalStyles.profileActionsSection}>
        <Text style={globalStyles.profileSectionTitle}>Información</Text>
        <View style={globalStyles.homeInfoCard}>
          <Text style={globalStyles.homeInfoText}>
            Esta aplicación te permite gestionar el sistema de inventario
            con diferentes niveles de acceso según tu rol.
          </Text>
          <Text style={globalStyles.captionText}>Versión 1.0.0</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;