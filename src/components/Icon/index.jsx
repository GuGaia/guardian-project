import React from 'react';
import { StyleSheet } from 'react-native';
import { getIcon } from '@/theme/icons';

export const Icon = ({ name, size = 24, color, style, ...props }) => {
  const IconComponent = getIcon(name);
  
  if (!IconComponent) {
    console.warn(`Ícone "${name}" não encontrado`);
    return null;
  }

  return React.createElement(IconComponent, {
    width: size,
    height: size,
    color: color,
    style: [styles.icon, style],
    ...props
  });
};

const styles = StyleSheet.create({
  icon: {
    // Estilos específicos para SVG se necessário
  },
}); 