import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { spacing, typography, layout } from './layout';

// Estilos comunes que se usan en múltiples pantallas
export const globalStyles = StyleSheet.create({
  // Contenedores
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    flex: 1,
    padding: spacing.lg,
  },
  
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  
  // Cards
  card: {
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.large,
    padding: spacing.lg,
    ...layout.shadow.medium,
  },
  
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  
  // Headers
  screenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  
  headerTitle: {
    fontSize: typography.fontSize.titleLarge,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  
  // Botones
  primaryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: layout.borderRadius.medium,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: layout.height.button,
  },
  
  primaryButtonText: {
    color: colors.textLight,
    fontSize: typography.fontSize.bodyLarge,
    fontWeight: typography.fontWeight.semiBold,
  },
  
  secondaryButton: {
    backgroundColor: colors.secondary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: layout.borderRadius.medium,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: layout.height.button,
  },
  
  secondaryButtonText: {
    color: colors.textLight,
    fontSize: typography.fontSize.bodyLarge,
    fontWeight: typography.fontWeight.semiBold,
  },
  
  dangerButton: {
    backgroundColor: colors.danger,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: layout.borderRadius.medium,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: layout.height.button,
  },
  
  dangerButtonText: {
    color: colors.textLight,
    fontSize: typography.fontSize.bodyLarge,
    fontWeight: typography.fontWeight.semiBold,
  },
  
  // Inputs
  inputContainer: {
    marginBottom: spacing.xl,
  },
  
  inputLabel: {
    fontSize: typography.fontSize.bodyLarge,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  
  textInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: layout.borderRadius.medium,
    padding: spacing.md,
    fontSize: typography.fontSize.bodyLarge,
    backgroundColor: colors.surface,
    minHeight: layout.height.input,
  },
  
  // Textos
  titleText: {
    fontSize: typography.fontSize.titleLarge,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  
  subtitleText: {
    fontSize: typography.fontSize.subtitle,
    fontWeight: typography.fontWeight.medium,
    color: colors.textSecondary,
  },
  
  bodyText: {
    fontSize: typography.fontSize.bodyLarge,
    color: colors.textPrimary,
    lineHeight: typography.lineHeight.normal,
  },
  
  captionText: {
    fontSize: typography.fontSize.body,
    color: colors.textTertiary,
  },
  
  // Separadores
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.lg,
  },
  
  spacer: {
    height: spacing.lg,
  },
  
  // Loading
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  
  loadingText: {
    marginTop: spacing.lg,
    fontSize: typography.fontSize.bodyLarge,
    color: colors.textSecondary,
  },
  
  // Estados vacíos
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  
  emptyStateText: {
    fontSize: typography.fontSize.titleLarge,
    textAlign: 'center',
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  
  emptyStateSubtext: {
    fontSize: typography.fontSize.bodyLarge,
    textAlign: 'center',
    color: colors.textTertiary,
  },
  // 🚀 PANTALLA DE INICIO
  homeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: colors.surface,
    marginBottom: spacing.xl,
    ...layout.shadow.medium,
  },

  homeSection: {
    padding: spacing.xl,
  },

  homeSectionTitle: {
    fontSize: typography.fontSize.titleLarge,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },

  homeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },

  homeCard: {
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.large,
    padding: spacing.lg,
    width: '48%',
    ...layout.shadow.medium,
  },

  homeCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },

  homeCardIcon: {
    fontSize: typography.fontSize.body,
    marginRight: spacing.sm,
  },

  homeCardTitle: {
    fontSize: typography.fontSize.small,
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.semiBold,
  },

  homeCardValue: {
    fontSize: typography.fontSize.titleLarge,
    fontWeight: typography.fontWeight.bold,
  },

  homeActionButton: {
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.large,
    padding: spacing.xl,
    width: '48%',
    alignItems: 'center',
    borderWidth: 2,
    ...layout.shadow.medium,
  },

  homeActionIcon: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },

  homeActionTitle: {
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.semiBold,
    textAlign: 'center',
  },

  homeInfoCard: {
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.large,
    padding: spacing.xl,
    ...layout.shadow.medium,
  },

  homeInfoText: {
    fontSize: typography.fontSize.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },

  homeInfoSubText: {
    fontSize: typography.fontSize.small,
    color: colors.textTertiary,
    textAlign: 'center',
  },

  // 👤 INFORMACIÓN DE USUARIO
  userWelcomeText: {
    fontSize: typography.fontSize.body,
    color: colors.textSecondary,
  },

  userName: {
    fontSize: typography.fontSize.titleLarge,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginVertical: spacing.xs,
  },

  userRole: {
    fontSize: typography.fontSize.small,
    color: colors.primary,
    fontWeight: typography.fontWeight.semiBold,
  },

  logoutButton: {
    backgroundColor: colors.error,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: layout.borderRadius.medium,
  },

  logoutButtonText: {
    color: colors.textLight,
    fontWeight: typography.fontWeight.semiBold,
    fontSize: typography.fontSize.small,
  },

  // ⏳ PANTALLA DE CARGA
  loadingScreenContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingContent: {
    alignItems: 'center',
    padding: spacing.xl,
  },

  appLogo: {
    fontSize: 64,
    marginBottom: spacing.xl,
  },

  appName: {
    fontSize: typography.fontSize.titleLarge,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },

  appSubtitle: {
    fontSize: typography.fontSize.body,
    color: colors.textSecondary,
    marginBottom: spacing.massive,
  },

  loadingIndicatorContainer: {
    alignItems: 'center',
    gap: spacing.lg,
  },

  loadingIndicatorText: {
    fontSize: typography.fontSize.body,
    color: colors.textSecondary,
    marginTop: spacing.lg,
  },

  // 🔐 PANTALLA DE LOGIN
  loginContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },

  loginScrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.xl,
  },

  loginLogoContainer: {
    alignItems: 'center',
    marginBottom: spacing.massive,
  },

  loginLogoText: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },

  loginAppTitle: {
    fontSize: typography.fontSize.titleLarge,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },

  loginSubtitle: {
    fontSize: typography.fontSize.body,
    color: colors.textSecondary,
  },

  loginFormContainer: {
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.large,
    padding: spacing.xl,
    ...layout.shadow.medium,
  },

  loginFormTitle: {
    fontSize: typography.fontSize.title,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },

  loginPasswordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  loginPasswordInput: {
    flex: 1,
  },

  loginEyeButton: {
    position: 'absolute',
    right: spacing.lg,
    padding: spacing.sm,
  },

  loginEyeButtonText: {
    fontSize: typography.fontSize.bodyLarge,
    color: colors.textSecondary,
  },

  loginButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.lg,
    borderRadius: layout.borderRadius.medium,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xl,
    minHeight: layout.height.button,
  },

  loginButtonDisabled: {
    backgroundColor: colors.textTertiary,
  },

  loginButtonText: {
    color: colors.textLight,
    fontSize: typography.fontSize.bodyLarge,
    fontWeight: typography.fontWeight.semiBold,
  },

  loginInfoContainer: {
    marginTop: spacing.xl,
    alignItems: 'center',
  },

  loginInfoText: {
    fontSize: typography.fontSize.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },

  loginDemoText: {
    fontSize: typography.fontSize.small,
    color: colors.textTertiary,
    textAlign: 'center',
    lineHeight: typography.lineHeight.relaxed,
  },

  // 👤 PANTALLA DE PERFIL
  profileCard: {
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.large,
    padding: spacing.xl,
    margin: spacing.lg,
    ...layout.shadow.medium,
  },

  profileAvatarContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },

  profileAvatar: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },

  profileUserInfo: {
    alignItems: 'center',
  },

  profileUserName: {
    fontSize: typography.fontSize.titleLarge,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },

  profileUserEmail: {
    fontSize: typography.fontSize.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },

  profileRoleContainer: {
    backgroundColor: colors.primary + '20',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: layout.borderRadius.round,
  },

  profileRoleLabel: {
    fontSize: typography.fontSize.small,
    color: colors.primary,
    fontWeight: typography.fontWeight.semiBold,
  },

  profileActionsSection: {
    margin: spacing.lg,
  },

  profileSectionTitle: {
    fontSize: typography.fontSize.title,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },

  profileActionItem: {
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.medium,
    padding: spacing.lg,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    ...layout.shadow.small,
  },

  profileActionIcon: {
    fontSize: typography.fontSize.subtitle,
    marginRight: spacing.lg,
  },

  profileActionText: {
    flex: 1,
    fontSize: typography.fontSize.bodyLarge,
    color: colors.textPrimary,
  },

  profileActionArrow: {
    fontSize: typography.fontSize.subtitle,
    color: colors.textTertiary,
  },

  profileLogoutButton: {
    backgroundColor: colors.error,
    margin: spacing.lg,
    padding: spacing.lg,
    borderRadius: layout.borderRadius.medium,
    alignItems: 'center',
    ...layout.shadow.medium,
  },

  profileLogoutText: {
    color: colors.textLight,
    fontSize: typography.fontSize.bodyLarge,
    fontWeight: typography.fontWeight.semiBold,
  },

  // ============================
  // 👥 ESTILOS DE GESTIÓN DE USUARIOS
  // ============================
  
  // Encabezado de usuarios
  usersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    ...layout.shadow.small,
  },

  usersTitle: {
    fontSize: typography.fontSize.titleLarge,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },

  usersAddButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: layout.borderRadius.medium,
    ...layout.shadow.small,
  },

  usersAddButtonText: {
    color: colors.textLight,
    fontWeight: typography.fontWeight.semiBold,
    fontSize: typography.fontSize.body,
  },

  // Búsqueda de usuarios
  usersSearchContainer: {
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  usersSearchInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: layout.borderRadius.medium,
    padding: spacing.md,
    fontSize: typography.fontSize.body,
    backgroundColor: colors.surface,
  },

  // Tarjetas de usuario
  userCard: {
    backgroundColor: colors.surface,
    marginBottom: spacing.lg,
    borderRadius: layout.borderRadius.large,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    ...layout.shadow.medium,
  },

  userCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },

  userCardName: {
    fontSize: typography.fontSize.titleLarge,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    flex: 1,
    lineHeight: 28,
  },

  userCardRole: {
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.semiBold,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: layout.borderRadius.small,
    textAlign: 'center',
    minWidth: 90,
  },

  // Roles de usuario
  userRoleAdmin: {
    backgroundColor: '#FF6B6B20',
    color: '#FF6B6B',
  },

  userRoleCoordinador: {
    backgroundColor: colors.primary + '20',
    color: colors.primary,
  },

  userRoleEmployee: {
    backgroundColor: '#95A5A620',
    color: '#95A5A6',
  },

  // Información del usuario
  userCardInfo: {
    marginTop: spacing.md,
  },

  userCardEmail: {
    fontSize: typography.fontSize.bodyLarge,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    fontWeight: typography.fontWeight.medium,
  },

  userCardUsername: {
    fontSize: typography.fontSize.body,
    color: colors.textTertiary,
    marginBottom: spacing.md,
    fontWeight: typography.fontWeight.medium,
  },

  userCardPhone: {
    fontSize: typography.fontSize.bodyLarge,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    fontWeight: typography.fontWeight.medium,
  },

  // Estados de usuario
  userStatusActive: {
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.semiBold,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: layout.borderRadius.small,
    textAlign: 'center',
    marginBottom: spacing.md,
    backgroundColor: '#e8f5e8',
    color: '#2e7d32',
  },

  userStatusInactive: {
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.semiBold,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: layout.borderRadius.small,
    textAlign: 'center',
    marginBottom: spacing.md,
    backgroundColor: '#ffe8e8',
    color: '#c62828',
  },

  // Acciones del usuario
  userCardActions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },

  userActionButton: {
    padding: spacing.sm,
    borderRadius: layout.borderRadius.small,
    flex: 1,
    alignItems: 'center',
  },

  userActionButtonText: {
    fontWeight: typography.fontWeight.semiBold,
    fontSize: typography.fontSize.body,
  },

  userEditButton: {
    backgroundColor: '#FF980020',
  },

  userToggleButton: {
    backgroundColor: colors.primary + '20',
  },

  userDeleteButton: {
    backgroundColor: '#f4433620',
  },

  // Estados de carga y errores para usuarios
  usersLoadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  usersEmptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },

  usersEmptyText: {
    fontSize: typography.fontSize.titleLarge,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.md,
    lineHeight: 32,
  },

  usersEmptySubtext: {
    fontSize: typography.fontSize.bodyLarge,
    color: colors.textTertiary,
    textAlign: 'center',
    lineHeight: 24,
  },

  usersErrorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },

  usersErrorText: {
    fontSize: typography.fontSize.title,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.error,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },

  usersErrorSubtext: {
    fontSize: typography.fontSize.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },

  // Modal de usuarios
  usersModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },

  usersModalContent: {
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.large,
    padding: spacing.xl,
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
    ...layout.shadow.large,
  },

  usersModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  usersModalTitle: {
    fontSize: typography.fontSize.title,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },

  usersModalCloseButton: {
    padding: spacing.sm,
    borderRadius: layout.borderRadius.small,
    backgroundColor: colors.surface,
  },

  usersModalCloseButtonText: {
    fontSize: typography.fontSize.title,
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.bold,
  },

  // Formulario de usuarios
  usersFormContainer: {
    gap: spacing.xl,
  },

  usersFormGroup: {
    gap: spacing.sm,
  },

  usersFormLabel: {
    fontSize: typography.fontSize.bodyLarge,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },

  usersFormInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: layout.borderRadius.medium,
    padding: spacing.lg,
    fontSize: typography.fontSize.bodyLarge,
    color: colors.textPrimary,
    backgroundColor: colors.surface,
    minHeight: 50,
    lineHeight: 22,
  },

  usersFormPickerContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: layout.borderRadius.medium,
    backgroundColor: colors.surface,
    minHeight: 50,
    justifyContent: 'center',
  },

  // Acciones del modal
  usersModalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.lg,
    marginTop: spacing.lg,
  },

  usersModalButton: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderRadius: layout.borderRadius.medium,
    minWidth: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },

  usersModalButtonText: {
    fontWeight: typography.fontWeight.semiBold,
    fontSize: typography.fontSize.body,
  },

  usersCancelButton: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderRadius: layout.borderRadius.medium,
    backgroundColor: colors.surface,
    minWidth: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },

  usersCancelButtonText: {
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.semiBold,
    fontSize: typography.fontSize.body,
  },

  usersSaveButton: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderRadius: layout.borderRadius.medium,
    backgroundColor: colors.primary,
    minWidth: 80,
    justifyContent: 'center',
    alignItems: 'center',
    ...layout.shadow.small,
  },

  usersSaveButtonText: {
    color: colors.textLight,
    fontWeight: typography.fontWeight.semiBold,
    fontSize: typography.fontSize.body,
  },

  // ============================
  // 📦 ESTILOS DE GESTIÓN DE PRODUCTOS
  // ============================
  
  // Modal de productos
  productsModalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },

  productsModalContent: {
    backgroundColor: colors.surface,
    width: '100%',
    height: '80%',
    borderRadius: layout.borderRadius.medium,
    padding: spacing.xl,
    ...layout.shadow.large,
  },

  productsModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },

  productsModalTitle: {
    fontSize: typography.fontSize.title,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },

  productsModalCloseButton: {
    padding: spacing.sm,
    backgroundColor: colors.error,
    borderRadius: layout.borderRadius.small,
  },

  productsModalCloseButtonText: {
    color: colors.textLight,
    fontWeight: typography.fontWeight.bold,
  },

  // Formulario de productos
  productsFormSection: {
    marginBottom: spacing.lg,
  },

  productsFormSectionTitle: {
    fontSize: typography.fontSize.title,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.lg,
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },

  productsFormGroup: {
    marginBottom: spacing.xl,
  },

  productsFormLabel: {
    fontSize: typography.fontSize.bodyLarge,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.sm,
    color: colors.textPrimary,
  },

  productsFormInput: {
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    borderRadius: layout.borderRadius.medium,
    backgroundColor: colors.surface,
    color: colors.textPrimary,
    fontSize: typography.fontSize.bodyLarge,
    minHeight: 50,
    lineHeight: 22,
  },

  productsFormPickerContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: layout.borderRadius.medium,
    backgroundColor: colors.surface,
    minHeight: 50,
  },

  productsFormPickerDisabled: {
    backgroundColor: '#f8f8f8',
  },

  productsFormPicker: {
    color: colors.textPrimary,
    height: 50,
    fontSize: typography.fontSize.bodyLarge,
  },

  // Botones del modal
  productsModalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: spacing.sm,
    paddingBottom: spacing.xl,
  },

  productsModalCancelButton: {
    backgroundColor: colors.textTertiary,
    padding: spacing.lg,
    borderRadius: layout.borderRadius.medium,
    flex: 1,
    marginRight: spacing.sm,
    alignItems: 'center',
    minHeight: 50,
  },

  productsModalCancelButtonText: {
    color: colors.textLight,
    fontWeight: typography.fontWeight.bold,
    fontSize: typography.fontSize.body,
  },

  productsModalSaveButton: {
    backgroundColor: colors.primary,
    padding: spacing.lg,
    borderRadius: layout.borderRadius.medium,
    flex: 1,
    marginLeft: spacing.sm,
    alignItems: 'center',
    minHeight: 50,
  },

  productsModalSaveButtonText: {
    color: colors.textLight,
    fontWeight: typography.fontWeight.bold,
    fontSize: typography.fontSize.body,
  },
});

export default globalStyles;
