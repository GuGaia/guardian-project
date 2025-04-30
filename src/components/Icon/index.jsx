import React from 'react';
import { StyleSheet } from 'react-native';
import { getIcon } from '@/theme/icons';

export const Icon = ({ name, size = 24, dimensions, color, style, ...props }) => {
  const IconComponent = getIcon(name);
  
  if (!IconComponent) {
    console.warn(`Ícone "${name}" não encontrado`);
    return null;
  }

  // Se dimensions for fornecido, use-o diretamente
  const width = dimensions ? dimensions.width : size;
  const height = dimensions ? dimensions.height : size;

  return React.createElement(IconComponent, {
    width: width,
    height: height,
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