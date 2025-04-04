import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { theme } from '@/theme/theme';
import { globalStyles } from '@/theme/globalStyles';

export function GrdTextInput({
    label,
    ...props 
}) {
    return (
        <View style={styles.container}>
            <Text style={[globalStyles.label, styles.label]}>{label}</Text>
            <View style={[globalStyles.input, styles.input]}>
                <TextInput
                    style={globalStyles.inputText}
                    placeholderTextColor={theme.colors.grdGray00}
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
        color: theme.colors.grdOrangeMedium,
    },
    input: {
        width: '100%',
        height: 48,
    }
})
