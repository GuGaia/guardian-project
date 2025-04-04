import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '@/theme/theme';
import { globalStyles } from '@/theme/globalStyles';


export function GrdOutlinedButton({ label, style, textStyle, ...props }) {
    return (
        <TouchableOpacity 
            activeOpacity={0.5}
            style={[globalStyles.button, styles.button, style]}
            {...props}
        >
            <Text style={[globalStyles.buttonText, textStyle]}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        borderColor: theme.colors.grdOrangeMedium,
    },
});
