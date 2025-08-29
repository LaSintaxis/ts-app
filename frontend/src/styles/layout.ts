// Espaciado consistente en toda la app
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
  massive: 60,
};

// Tipografía consistente
export const typography = {
  // Tamaños de fuente
  fontSize: {
    tiny: 10,
    small: 12,
    body: 14,
    bodyLarge: 16,
    subtitle: 18,
    title: 20,
    titleLarge: 24,
    display: 28,
    displayLarge: 32,
    hero: 60,
    massive: 80,
  },
  
  // Pesos de fuente
  fontWeight: {
    light: '300' as const,
    normal: '400' as const,
    medium: '500' as const,
    semiBold: '600' as const,
    bold: '700' as const,
    extraBold: '800' as const,
  },
  
  // Altura de línea
  lineHeight: {
    tight: 18,
    normal: 20,
    relaxed: 24,
  },
};

// Bordes y sombras
export const layout = {
  // Radius
  borderRadius: {
    none: 0,
    small: 4,
    medium: 8,
    large: 12,
    xlarge: 16,
    round: 20,
    circle: 50,
  },
  
  // Sombras
  shadow: {
    small: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 8,
    },
  },
  
  // Tamaños comunes
  iconSize: {
    small: 16,
    medium: 20,
    large: 24,
    xlarge: 32,
    huge: 40,
  },
  
  // Alturas de elementos
  height: {
    input: 50,
    button: 48,
    tabBar: 60,
    header: 56,
  },
};

export default { spacing, typography, layout };
