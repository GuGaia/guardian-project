import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { globalStyles } from '@/theme/globalStyles';
import { theme } from '@/theme/theme';
import { Icon } from '@/components/Icon';
import { useRouter } from 'expo-router';

export default function Page() {

    const mockContacts = [
        {
            id: 1,
            name: 'Maria Silva',
            phone: '(11) 98765-4321',
            email: 'maria.silva@email.com',
            relationship: 'Mãe'
        },
        {
            id: 2,
            name: 'João Santos',
            phone: '(11) 91234-5678',
            email: 'joao.santos@email.com',
            relationship: 'Pai'
        },
        {
            id: 3,
            name: 'Ana Oliveira',
            phone: '(11) 99876-5432',
            email: 'ana.oliveira@email.com',
            relationship: 'Irmã'
        },
        {
            id: 4,
            name: 'Carlos Ferreira',
            phone: '(11) 94567-8901',
            email: 'carlos.ferreira@email.com',
            relationship: 'Tio'
        },
        {
            id: 5,
            name: 'Patrícia Lima',
            phone: '(11) 92345-6789',
            email: 'patricia.lima@email.com',
            relationship: 'Amiga'
        },
        {
            id: 6,
            name: 'Roberto Almeida',
            phone: '(11) 95678-1234',
            email: 'roberto.almeida@email.com',
            relationship: 'Vizinho'
        },
        {
            id: 7,
            name: 'Juliana Costa',
            phone: '(11) 93456-7890',
            email: 'juliana.costa@email.com',
            relationship: 'Colega de trabalho'
        },
        {
            id: 8,
            name: 'Fernando Souza',
            phone: '(11) 97890-1234',
            email: 'fernando.souza@email.com',
            relationship: 'Primo'
        },
        {
            id: 9,
            name: 'Mariana Pereira',
            phone: '(11) 91234-5678',
            email: 'mariana.pereira@email.com',
            relationship: 'Avó'
        },
        {
            id: 10,
            name: 'Ricardo Mendes',
            phone: '(11) 98765-4321',
            email: 'ricardo.mendes@email.com',
            relationship: 'Avô'
        },
        {
            id: 11,
            name: 'Camila Rodrigues',
            phone: '(11) 94567-8901',
            email: 'camila.rodrigues@email.com',
            relationship: 'Tia'
        },
        {
            id: 12,
            name: 'Lucas Oliveira',
            phone: '(11) 92345-6789',
            email: 'lucas.oliveira@email.com',
            relationship: 'Irmão'
        },
        {
            id: 13,
            name: 'Beatriz Santos',
            phone: '(11) 95678-1234',
            email: 'beatriz.santos@email.com',
            relationship: 'Cunhada'
        },
        {
            id: 14,
            name: 'Gabriel Lima',
            phone: '(11) 93456-7890',
            email: 'gabriel.lima@email.com',
            relationship: 'Cunhado'
        },
        {
            id: 15,
            name: 'Isabela Costa',
            phone: '(11) 97890-1234',
            email: 'isabela.costa@email.com',
            relationship: 'Sobrinha'
        },
        {
            id: 16,
            name: 'Thiago Almeida',
            phone: '(11) 91234-5678',
            email: 'thiago.almeida@email.com',
            relationship: 'Sobrinho'
        },
        {
            id: 17,
            name: 'Amanda Ferreira',
            phone: '(11) 98765-4321',
            email: 'amanda.ferreira@email.com',
            relationship: 'Colega de faculdade'
        },
        {
            id: 18,
            name: 'Pedro Souza',
            phone: '(11) 94567-8901',
            email: 'pedro.souza@email.com',
            relationship: 'Amigo'
        },
        {
            id: 19,
            name: 'Carolina Mendes',
            phone: '(11) 92345-6789',
            email: 'carolina.mendes@email.com',
            relationship: 'Vizinha'
        },
        {
            id: 20,
            name: 'Felipe Rodrigues',
            phone: '(11) 95678-1234',
            email: 'felipe.rodrigues@email.com',
            relationship: 'Colega de academia'
        }
    ]

    const router = useRouter();

    return (
        <View style={[globalStyles.container, styles.container]}>
            <View style={styles.headerCard}>
                <Text style={[globalStyles.subtitle, styles.subtitle]}>Contatos de Emergência</Text>
                <TouchableOpacity style={styles.iconContainer} activeOpacity={0.8} onPress={() => router.back()}>
                    <Icon name="arrowLeft" size={24} color={theme.colors.grdWhite00} />
                </TouchableOpacity>
            </View>
            <FlatList
                data={mockContacts}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => (
                    <View style={styles.cardContainer}>
                        <View style={styles.contactCard}>
                            <Text style={styles.contactName}>{item.name}</Text>
                        </View>
                    </View>
                )}
            />
            <View style={styles.footerCard}/>
        </View>
    )
}

const styles = StyleSheet.create({
    footerCard: {
        height: 72,
        backgroundColor: theme.colors.grdPinkMedium,
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
        backgroundColor: theme.colors.grdWhite00,
    },
    subtitle: {
        color: theme.colors.grdWhite00,
        fontSize: theme.fontSizes.h1,
    },
    cardContainer: {
        paddingHorizontal: 12,
    },
    contactCard: {
        backgroundColor: theme.colors.grdPinkMedium,
        borderRadius: 12,
        marginVertical: 8,
        padding: 11,
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
        color: theme.colors.grdWhite00,
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

