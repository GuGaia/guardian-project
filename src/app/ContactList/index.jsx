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
    ]

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.backText}>{'<- Voltar'}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.titleCard}>
                <View style={styles.titleRow}>
                    <Icon 
                    name="contacts" 
                    size={45} 
                    />
                    <View style={{ marginLeft: 8 }}>
                        <Text style={styles.title}>Contatos de</Text>
                        <Text style={styles.title}>emergência</Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity style={styles.addButton} onPress={()=> router.push('/ContactDetails')} >
                <Text style={styles.addButtonText}>Adicionar contato</Text>
            </TouchableOpacity>

            <FlatList
                data={mockContacts}
                contentContainerStyle={styles.list}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    
                    <TouchableOpacity style={styles.contactItem}activeOpacity={0.8} onPress={() => router.push('/ContactDetails')}>
                        <Text style={styles.contactName}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
            <View style={styles.navbar}>
                        <TouchableOpacity style={styles.iconContainer} activeOpacity={0.8} onPress={() => router.push('/MainMenu')}>
                                <Icon 
                                    name="Home"
                                    size={40}
                                />
                            </TouchableOpacity>
            </View>  
            
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
        backgroundColor: theme.colors.grdBlueLight,
        paddingTop: width * 0.04,
        paddingHorizontal: 12,
        paddingBottom: 8,
    },
    backText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: width * 0.04,
    },
    titleCard: {
        backgroundColor: '#3573FA',
        paddingVertical: 24,
        alignItems: 'center',
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        paddingLeft: 20,
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
    navbar: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: 70, 
		backgroundColor: theme.colors.grdBlue,
		justifyContent: "center",
		alignItems: "center",
		paddingBottom: 10, // espaço para telefones com borda

		elevation: 10, // para Android
	  },
	  navbarContent: {
		width: 60,
		height: 60,
		backgroundColor: theme.colors.grdBlueLight,
		borderRadius: 30, // deixa redondo
		justifyContent: "center",
		alignItems: "center",
	  },
	  navbarIcon: {
		width: 30,
		height: 30,
		tintColor: "#FFFFFF", 
	  },	  
});
