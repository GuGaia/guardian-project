import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { globalStyles } from '@/theme/globalStyles';
import { theme } from '@/theme/theme';
import { Icon } from '@/components/Icon';
import { useRouter } from 'expo-router';
import { GrdSolidButton } from '@/components/buttons/GrdSolidButton';
import { useAuth } from '@/services/Auth';

export default function Page() {

    const { signOut } = useAuth();
    const router = useRouter();

    const handleSignOut = () => {
        signOut();
    }

    return (
        <View style={[globalStyles.container, styles.container]}>
            <View style={styles.headerCard}>
                <Text style={[globalStyles.subtitle, styles.subtitle]}>Configurações</Text>
                <TouchableOpacity style={styles.iconContainer} activeOpacity={0.8} onPress={() => router.back()}>
                    <Icon name="arrowLeft" size={24} color={theme.colors.grdWhite00} />
                </TouchableOpacity>
            </View>
            <View style={styles.optionsList}>
            <GrdSolidButton label="Sair" onPress={handleSignOut} style={styles.button} textStyle={styles.buttonText}/>
            </View>
            
            <View style={styles.footerCard}/>
        </View>
    )
}

const styles = StyleSheet.create({
    footerCard: {
        height: 72,
        backgroundColor: theme.colors.grdPinkMedium,
    },
    optionsList: {
        paddingHorizontal: 16,
    },
    button: {
        marginBottom: 12,
        backgroundColor: theme.colors.grdWhite00,
    },
    buttonText: {
        color: theme.colors.grdBlue,
        fontFamily: theme.fonts.interBold,
        fontSize: theme.fontSizes.body,
    },
    headerCard: {
        height: 244,
        marginTop: 52,
        marginHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.grdPinkMedium,
        borderRadius: 12,
        position: 'relative',
    },
    container: {
        flex: 1,
        backgroundColor: theme.colors.grdBlueLight,
        gap: 12,
    },
    subtitle: {
        color: theme.colors.grdWhite00,
        fontSize: theme.fontSizes.h1,
    },
    cardContainer: {
        paddingHorizontal: 12,
    },
    contactCard: {
        backgroundColor: theme.colors.grdBlue,
        borderRadius: 12,
        marginVertical: 8,
        paddingVertical: 11,
        paddingHorizontal: 22,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        overflow: 'hidden',
    },
    contactName: {
        fontFamily: theme.fonts.interBold,
        fontSize: theme.fontSizes.body,
        color: theme.colors.grdWhite00,
    },
    contactPhone: {
        fontSize: theme.fontSizes.h3,
        color: theme.colors.grdWhite00,
    },
    contactRelationship: {
        fontSize: theme.fontSizes.h3,
        color: theme.colors.grdBlue,
    },
    iconContainer: {
        position: 'absolute',
        bottom: 16,
        left: 16,
    },
    listContainer: {
        paddingVertical: 12,
    },
});

