import { StyleSheet } from 'react-native';

const getStyles = (theme: Theme, type: 'small' | 'medium' = 'small') =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: type === 'medium' ? 112 : 64,
      padding: 8,
      backgroundColor: theme.colors.action,
      paddingBottom: type === 'medium' ? 24 : 8,
      paddingLeft: 4,
    },
    rowView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    topView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      fontSize: theme.font.headline.small.size,
      fontWeight: theme.font.headline.small.weight,
      letterSpacing: theme.font.headline.small.tracking,
      lineHeight: theme.font.headline.small.lineHeight,
      color: theme.colors.fontLight,
      alignSelf: type === 'medium' ? 'flex-start' : 'center',
      marginLeft: type === 'medium' ? 12 : 4,
    },
  });

export default getStyles;
