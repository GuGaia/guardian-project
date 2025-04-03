import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { theme } from '../../../theme/theme';
import { globalStyles } from '../../../theme/globalStyles';


export const GrdTextInput = ({ label, placeholder, value: initialValue = '', onChangeText, secureTextEntry = false, ...props }) => {
    const [text, setText] = useState(initialValue);

    const handleTextChange = (newText) => {
        setText(newText);
        if (onChangeText) {
            onChangeText(newText);
            console.log(text);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={[globalStyles.label, styles.label]}>{label}</Text>
            <View style={[globalStyles.input, styles.input]}>
                <TextInput
                    style={globalStyles.inputText}
                    placeholder={placeholder}
                    placeholderTextColor={theme.colors.grdGray00}
                    value={text}
                    onChangeText={handleTextChange}
                    secureTextEntry={secureTextEntry}
                    {...props}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 284,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: 8,
    },
    label: {
        color: theme.colors.grdOrangeMedium,
    },
    input: {
        height: 48,
    }
})
