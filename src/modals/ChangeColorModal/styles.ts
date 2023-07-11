import { StyleSheet } from 'react-native';

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: '75%',
      padding: 16,
      paddingTop: 8,
      paddingRight: 8,
      backgroundColor: theme.colors.action,
      borderRadius: 10,
      zIndex: 1,
    },
    headerView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    title: {
      fontSize: theme.font.title.large.size,
      fontWeight: theme.font.title.large.weight,
      letterSpacing: theme.font.title.large.tracking,
      lineHeight: theme.font.title.large.lineHeight,
      color: theme.colors.fontLight,
    },
    buttonsContainer: {
      flexWrap: 'wrap',
      justifyContent: 'center',
      flexDirection: 'row',
    },
  });

export default getStyles;
