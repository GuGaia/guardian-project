import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { Svg, Path, Rect } from "react-native-svg";

const HelpButton = () => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="w-full h-44 rounded-xl bg-[#F55F38]"
    >
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold text-[#F8F6FC] font-['Roboto']">
          Peça ajuda
        </Text>
        <View className="absolute right-4">
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path
              d="M238.293 80.4035C238.109 80.6229 238.007 80.9193 238.01 81.2273C238.013 81.5353 238.12 81.8298 238.308 82.046L243.267 87.7533L238.407 93.5459C238.229 93.7666 238.131 94.0608 238.136 94.3654C238.141 94.6699 238.248 94.9604 238.434 95.1742C238.619 95.3879 238.869 95.5079 239.129 95.5083C239.389 95.5087 239.639 95.3895 239.824 95.1762L245.378 88.5563C245.562 88.3369 245.664 88.0406 245.661 87.7326C245.658 87.4245 245.551 87.13 245.364 86.9138L239.696 80.3913C239.508 80.1752 239.255 80.055 238.992 80.0573C238.729 80.0596 238.477 80.1841 238.293 80.4035Z"
              fill="#F8F6FC"
            />
          </Svg>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HelpButton;
