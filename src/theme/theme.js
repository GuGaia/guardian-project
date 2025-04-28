export const theme = {
  colors: {
    grdBlueBackground: '#D9E7FF',
    grdBlue: '#3573FA',
    grdBlueLight: '#5C97FF',
    grdWhite00: '#FFFFFF',
    grdBlack00: '#000000',
    grdRed: '#DB1313',
    grdGray00: '#212023',
  },
  fonts: {
    ubuntuLight: 'Ubuntu-Light',
    ubuntuRegular: 'Ubuntu-Regular',
    ubuntuMedium: 'Ubuntu-Medium',
    ubuntuBold: 'Ubuntu-Bold',
    interBold: 'Inter-Bold',
    interRegular: 'Inter-Regular',
    interMedium: 'Inter-Medium',
  },
  
  /** 
  icons: {
    home: require('@/assets/icons/Home.svg'),
    guide: require('@/assets/icons/guide.png'),
    contacts: require('@/assets/icons/contacts.png'),
    settings: require('@/assets/icons/settings.svg'),
    guardianOwl: require('@/assets/icons/GuardianOwl.svg'),
  },  
   */



  fontSizes: {
    caption: 12,    // Para textos pequenos, legendas
    small: 14,      // Para textos secundários
    body: 16,       // Para o texto principal do corpo
    bodyLarge: 18,  // Para textos do corpo um pouco maiores
    subtitle: 20,   // Para subtítulos
    title: 24,      // Para títulos principais
    titleLarge: 28, // Para títulos grandes
    h1: 32,         // Para cabeçalhos de nível 1
    h2: 36,         // Para cabeçalhos de nível 2
    h3: 40,         // Para cabeçalhos de nível 3
    h4: 44,         // Para cabeçalhos de nível 4
    h5: 48,         // Para cabeçalhos de nível 5
    display: 50,    // Para textos de destaque/display
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    round: 9999,
  },
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 4,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 6,
    },
  },
}; 