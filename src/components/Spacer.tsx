import React from "react";
import { View } from "react-native";

interface PropTypes {
  width?: number;
  height?: number;
}

const Spacer: React.FC<PropTypes> = ({ width, height }) => (
  <View style={{ width, height }} />
);

export default Spacer;
