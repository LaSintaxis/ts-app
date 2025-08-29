// Exportar todos los estilos desde un solo lugar
export { colors, opacity } from './colors';
export { spacing, typography, layout } from './layout';
export { globalStyles } from './global';
export { componentStyles } from './components';

// Importar para re-exportar como default
import { colors, opacity } from './colors';
import { spacing, typography, layout } from './layout';
import { globalStyles } from './global';
import { componentStyles } from './components';

// Re-exportar para fácil acceso
export default {
  colors,
  opacity,
  spacing,
  typography,
  layout,
  globalStyles,
  componentStyles,
};
