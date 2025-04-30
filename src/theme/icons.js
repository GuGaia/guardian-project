// Importação dos ícones SVG
import GuardianOwl from '@assets/icons/guardiaOwlBlue.svg';
import ArrowLeft from '@assets/icons/arrow-left.svg';
import GuardianOwlWhite from '@assets/icons/GuardianOwlWhite.svg';
import settings from '@assets/icons/settings.svg';
import Home from '@assets/icons/Home.svg';
import contacts from '@assets/icons/contacts.svg';




// Objeto com todos os ícones
export const icons = {
  // Brand
  guardianOwl: GuardianOwl,
  arrowLeft: ArrowLeft,
  GuardianOwlWhite: GuardianOwlWhite,
  settings: settings,
  Home: Home,
  contacts: contacts,
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
  GuardianOwlWhite: 'GuardianOwlWhite',
  settings: 'settings',
  Home: 'Home',
  contacts: 'contacts',
}; 