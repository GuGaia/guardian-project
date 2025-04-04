// Importação dos ícones SVG
import GuardianOwl from '@assets/icons/guardian-owl.svg';
import ArrowLeft from '@assets/icons/arrow-left.svg';

// Objeto com todos os ícones
export const icons = {
  // Brand
  guardianOwl: GuardianOwl,
  arrowLeft: ArrowLeft,
};

// Função auxiliar para obter um ícone
export const getIcon = (name) => {
  if (!icons[name]) {
    console.warn(`Ícone "${name}" não encontrado`);
    return null;
  }
  return icons[name];
};

// Tipos de ícones disponíveis (para autocompletar no editor)
export const IconTypes = {
  // Brand
  guardianOwl: 'guardianOwl',
  arrowLeft: 'arrowLeft',
}; 