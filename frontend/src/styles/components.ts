import { StyleSheet } from 'react-native';
import { colors, opacity } from './colors';
import { spacing, typography, layout } from './layout';

// 🎨 ESTILOS DE COMPONENTES REUTILIZABLES
export const componentStyles = StyleSheet.create({
  // 📦 CARDS COMUNES
  baseCard: {
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.large,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...layout.shadow.medium,
  },

  cardInactive: {
    opacity: opacity.disabled,
    backgroundColor: '#f8f8f8',
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  cardInfo: {
    flex: 1,
    marginRight: spacing.lg,
  },

  cardActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },

  // 🏷️ BADGES Y ETIQUETAS
  statusBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: layout.borderRadius.round,
    marginTop: spacing.xs,
  },

  statusBadgeActive: {
    backgroundColor: '#e8f5e8',
  },

  statusBadgeInactive: {
    backgroundColor: '#ffe8e8',
  },

  statusBadgeText: {
    fontSize: typography.fontSize.small,
    fontWeight: typography.fontWeight.semiBold,
  },

  statusBadgeTextActive: {
    color: '#2e7d32',
  },

  statusBadgeTextInactive: {
    color: '#c62828',
  },

  categoryBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: layout.borderRadius.small,
  },

  categoryBadgeText: {
    fontSize: typography.fontSize.small,
    color: colors.textLight,
    fontWeight: typography.fontWeight.semiBold,
  },

  subcategoryBadge: {
    backgroundColor: colors.secondary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: layout.borderRadius.small,
  },

  subcategoryBadgeText: {
    fontSize: typography.fontSize.small,
    color: colors.textLight,
    fontWeight: typography.fontWeight.semiBold,
  },

  // 🎯 BOTONES DE ACCIÓN
  actionButton: {
    padding: spacing.sm,
    borderRadius: layout.borderRadius.small,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    ...layout.shadow.small,
  },

  actionButtonText: {
    fontSize: typography.fontSize.body,
  },

  toggleButton: {
    borderRadius: layout.borderRadius.circle,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.xs,
    borderWidth: 2,
    borderColor: colors.border,
    ...layout.shadow.small,
  },

  toggleButtonActive: {
    backgroundColor: colors.warning,
    borderColor: '#f57c00',
  },

  toggleButtonInactive: {
    backgroundColor: colors.success,
    borderColor: '#388e3c',
  },

  toggleButtonText: {
    fontSize: 18,
    fontWeight: typography.fontWeight.bold,
    color: colors.textLight,
  },

  editButton: {
    backgroundColor: colors.warning + '20',
  },

  deleteButton: {
    backgroundColor: colors.error + '20',
  },

  buttonText: {
    fontSize: typography.fontSize.bodyLarge,
  },

  // 📝 TÍTULOS Y TEXTOS
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },

  cardTitle: {
    fontSize: typography.fontSize.titleLarge,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    flex: 1,
    marginRight: spacing.sm,
    lineHeight: 28,
  },

  cardTitleInactive: {
    color: colors.textTertiary,
  },

  cardDescription: {
    fontSize: typography.fontSize.body,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    lineHeight: 22,
    marginTop: spacing.xs,
  },

  cardDescriptionInactive: {
    color: '#aaa',
  },

  cardDate: {
    fontSize: typography.fontSize.small,
    color: colors.textTertiary,
    fontStyle: 'italic',
    marginTop: spacing.sm,
  },

  // 💰 PRECIOS Y VALORES
  priceContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: spacing.xs,
  },

  price: {
    fontSize: typography.fontSize.title,
    fontWeight: typography.fontWeight.bold,
    color: colors.success,
  },

  priceInactive: {
    color: '#aaa',
  },

  // 📊 DETALLES ESPECÍFICOS
  detailText: {
    fontSize: typography.fontSize.body,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    lineHeight: 20,
  },

  detailTextInactive: {
    color: '#bbb',
  },

  warningText: {
    color: colors.warning,
    fontWeight: typography.fontWeight.semiBold,
  },

  // 🏷️ BADGES DE CONTENIDO
  badgeContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
    flexWrap: 'wrap',
    marginTop: spacing.sm,
  },

  // 📋 DETALLES DEL PRODUCTO
  productDetails: {
    marginBottom: spacing.sm,
    marginTop: spacing.sm,
  },

  productSku: {
    fontSize: typography.fontSize.body,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    fontWeight: typography.fontWeight.medium,
  },

  productStock: {
    fontSize: typography.fontSize.body,
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.medium,
  },

  productDetailInactive: {
    color: '#bbb',
  },

  lowStockWarning: {
    color: colors.warning,
    fontWeight: typography.fontWeight.semiBold,
  },

  productDate: {
    fontSize: typography.fontSize.small,
    color: colors.textTertiary,
    marginTop: spacing.md,
    fontStyle: 'italic',
  },

  // 🎯 CONTENEDOR DE ACCIONES
  actionButtonsContainer: {
    flexDirection: 'column',
    gap: spacing.sm,
    alignItems: 'center',
  },
});

export default componentStyles;
