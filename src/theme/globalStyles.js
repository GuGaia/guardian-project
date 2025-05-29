import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const globalStyles = StyleSheet.create({
  // Layout styles
  container: {
    flex: 1,
    backgroundColor: theme.colors.grdBlueBackground,
  },
  centerContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  columnContainer: {
    flexDirection: 'column',
  },

  // Text styles
  text: {
    color: theme.colors.grdBlack00,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.ubuntuRegular,
  },
  label: {
    color: theme.colors.grdBlack00,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.ubuntuBold,
  },
  title: {
    color: theme.colors.grdBlack00,
    fontSize: theme.fontSizes.title,
    fontFamily: theme.fonts.ubuntuBold,
    textAlign: 'center',
  },
  subtitle: {
    color: theme.colors.grdBlack00,
    fontSize: theme.fontSizes.subtitle,
    fontFamily: theme.fonts.ubuntuMedium,
  },

  // Component styles
  buttonSmall: {
    width: "100%",
    backgroundColor: 'transparent',
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    height: 28,
  },
  buttonMedium: {
    width: "100%",
    backgroundColor: 'transparent',
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    height: 42,
  },
  buttonLarge: {
    width: "100%",
    backgroundColor: 'transparent',
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
  },
  buttonText: {
    color: theme.colors.grdBlack00,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.interRegular,
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    ...theme.shadows.small,
  },
  input: {
    width: '100%',
    height: 48,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.grdBlue,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.interBold,
    backgroundColor: theme.colors.grdWhite00,
  },
  inputText: {
    color: theme.colors.grdBlack00,
    fontSize: theme.fontSizes.small,
    fontFamily: theme.fonts.interRegular,
    justifyContent: 'center',
    height: 48,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: 8,
  }
}); 