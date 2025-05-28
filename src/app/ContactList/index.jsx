import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { globalStyles } from '@/theme/globalStyles';
import { theme } from '@/theme/theme';
import { Icon } from '@/components/Icon';
import { useRouter } from 'expo-router';
import { Navbar } from '@/components/Navbar';

const { width, height } = Dimensions.get('window');

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
            </View>

            <View style={styles.titleCard}>
                <View style={styles.titleRow}>
                    <Icon 
                    name="contacts" 
                    size={45} 
                    />
                    <View style={{ marginLeft: ((width * height)/ 1000) * 0.05 }}>
                        <Text style={styles.title}>Contatos de</Text>
                        <Text style={styles.title}>emergência</Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity style={styles.addButton} onPress={()=> router.push('/ContactDetails')} >
                
                <Icon name="Plus" size={ ((width * height)/ 1000) * 0.08} style={styles.Icon} />
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
            
            <Navbar/> 
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D9E7FF',
    },
    header: {
        backgroundColor: theme.colors.grdBlueLight,
        height: height * 0.03,
    },
    titleCard: {
        backgroundColor: theme.colors.grdBlue,
         height: height * 0.15,
        alignItems: 'center',
        justifyContent:'center',
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize:  ((width * height)/ 1000) * 0.08,
  },

  scrollView: {
    padding:  width * 0.07,
  },
    addButton: {
        flexDirection: 'row',
        backgroundColor: theme.colors.grdBlue,
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
    padding:  width * 0.06,
    },
    contactItem: {
        paddingVertical: height*0.02,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.grdGray,
    },
    contactName: {
        color: theme.colors.grdGray,
        fontWeight: 'bold',
    },
      Icon: {
        color: theme.colors.grdGray,
    },
});
