import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { globalStyles } from '@/theme/globalStyles';
import { theme } from '@/theme/theme';
import { Icon } from '@/components/Icon';
import { useRouter } from 'expo-router';

export default function Page() {
    const router = useRouter();

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

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.backText}>{'< Voltar'}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.titleCard}>
                <View style={styles.titleRow}>
                    <Icon name="user" size={32} color="white" />
                    <View style={{ marginLeft: 8 }}>
                        <Text style={styles.title}>Contatos de</Text>
                        <Text style={styles.title}>emergência</Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity style={styles.addButton}>
                <Icon name="plus" size={16} color="white" />
                <Text style={styles.addButtonText}>Adicionar contato</Text>
            </TouchableOpacity>

            <FlatList
                data={mockContacts}
                contentContainerStyle={styles.list}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.contactItem}>
                        <Text style={styles.contactName}>{item.name}</Text>
                    </View>
                )}
            />

            <TouchableOpacity style={styles.fab}>
                <Icon name="home" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D9E7FF',
    },
    header: {
        backgroundColor: '#3573FA',
        paddingTop: 40,
        paddingHorizontal: 12,
        paddingBottom: 8,
    },
    backText: {
        color: '#D9E7FF',
        fontWeight: 'bold',
    },
    titleCard: {
        backgroundColor: '#3573FA',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        paddingVertical: 24,
        alignItems: 'center',
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },
    addButton: {
        flexDirection: 'row',
        backgroundColor: '#3573FA',
        alignSelf: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginVertical: 20,
    },
    addButtonText: {
        color: 'white',
        marginLeft: 8,
        fontWeight: 'bold',
    },
    list: {
        paddingHorizontal: 20,
    },
    contactItem: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#3573FA',
    },
    contactName: {
        color: '#3573FA',
        fontWeight: 'bold',
    },
    fab: {
        position: 'absolute',
        bottom: 24,
        alignSelf: 'center',
        backgroundColor: '#3573FA',
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
    },
});
