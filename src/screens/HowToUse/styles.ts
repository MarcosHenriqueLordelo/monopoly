import { StyleSheet } from 'react-native';

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.section,
    },
  });

export default getStyles;
