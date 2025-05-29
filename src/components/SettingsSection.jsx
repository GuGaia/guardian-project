import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const SettingsSection = () => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="p-4 bg-white rounded-lg shadow-sm"
    >
      <Text className="text-lg font-medium text-gray-800 font-['Roboto']">
        Configurações
      </Text>
    </TouchableOpacity>
  );
};

export default SettingsSection;
