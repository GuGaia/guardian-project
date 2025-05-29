import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { globalStyles } from '@/theme/globalStyles';
import { theme } from '@/theme/theme';

export function GrdOutlinedButton({
    label,
    onPress,
    textStyle,
    size = 'medium',
    style,
    ...props
}) {
    const getButtonSizeStyle = () => {
        switch (size) {
            case 'small':
                return globalStyles.buttonSmall;
            case 'large':
                return globalStyles.buttonLarge;
            default:
                return globalStyles.buttonMedium;
        }
    };

    return (
        <TouchableOpacity
            style={[
                getButtonSizeStyle(),
                styles.button,
                style,
            ]}
            onPress={onPress}
            {...props}
        >
            <Text style={[globalStyles.buttonText, textStyle]}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        borderColor: theme.colors.grdBlue,
    },
});
