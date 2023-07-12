import { StyleSheet } from 'react-native';

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      borderBottomWidth: 0.5,
    },
    titleContainer: {
      width: '100%',
      height: 64,
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
      paddingHorizontal: 16,
      justifyContent: 'space-between',
    },
    descriptionContainer: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.background,
    },
    title: {
      color: theme.colors.fontDark,
      fontSize: theme.font.body.large.size,
      fontWeight: theme.font.body.large.weight,
      letterSpacing: theme.font.body.large.tracking,
      lineHeight: theme.font.body.large.lineHeight,
    },
    description: {
      color: theme.colors.fontDark,
      fontSize: theme.font.body.medium.size,
      fontWeight: theme.font.body.medium.weight,
      letterSpacing: theme.font.body.medium.tracking,
      lineHeight: theme.font.body.medium.lineHeight,
      width: '100%',
      textAlign: 'justify',
    },
  });

export default getStyles;
