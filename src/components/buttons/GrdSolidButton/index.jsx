import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '@/theme/theme';
import { globalStyles } from '@/theme/globalStyles';

export function GrdSolidButton({
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
                { backgroundColor: theme.colors.grdBlue },
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
        backgroundColor: theme.colors.grdBlue,
    },
});
