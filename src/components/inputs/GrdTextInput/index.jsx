import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { theme } from '@/theme/theme';
import { globalStyles } from '@/theme/globalStyles';

export function GrdTextInput({
    label,
    ...props 
}) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={[globalStyles.label, styles.label]}>{label}</Text>
            <View style={[globalStyles.input, isFocused && styles.inputFocused]}>
                <TextInput
                    style={globalStyles.inputText}
                    placeholderTextColor={theme.colors.grdGray00}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...props}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: 8,
    },
    label: {
        color: theme.colors.grdBlue,
    },
    inputFocused: {
        borderWidth: 2,
    },
})
