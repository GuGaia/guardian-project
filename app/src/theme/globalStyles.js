import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const globalStyles = StyleSheet.create({
  // Layout styles
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  centerContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
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
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.ubuntuMedium,
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
    borderColor: theme.colors.grdOrangeMedium,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.interBold,
    backgroundColor: theme.colors.grdWhite00,
  },
  inputText: {
    color: theme.colors.grdBlack00,
    fontSize: theme.fontSizes.caption,
    fontFamily: theme.fonts.interRegular,
    justifyContent: 'center',
    height: 48,
    borderRadius: theme.borderRadius.lg,
    padding: 8,
  }
}); 