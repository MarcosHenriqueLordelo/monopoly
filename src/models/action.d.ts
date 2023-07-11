import MaterialIcon from '@expo/vector-icons/MaterialIcons';

interface Action {
  name: keyof typeof MaterialIcon.glyphMap;
  action: () => void;
}
