import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { globalStyles } from '@/theme/globalStyles';
import { theme } from '@/theme/theme';
import { Icon } from '@/components/Icon';
import { useRouter } from 'expo-router';
import { Navbar } from '@/components/Navbar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { contactService } from '@/services/contactService';
import { useLocalSearchParams } from 'expo-router';
import { useAuth } from '@/hooks/Auth';

const { width, height } = Dimensions.get('window');

export default function Page() {
    const router = useRouter();
    const { userData } = useLocalSearchParams();
    const { user } = useAuth();
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                let userId;
                
                // Tenta obter o ID do userData dos parâmetros
                if (userData) {
                    try {
                        const parsedUserData = JSON.parse(userData);
                        if (parsedUserData && parsedUserData.id) {
                            userId = parsedUserData.id;
                        }
                    } catch (error) {
                        console.error("Erro ao fazer parse do userData:", error);
                    }
                }

                // Se não conseguiu obter o ID do userData, tenta obter do estado de autenticação
                if (!userId && user?.authenticated && user?.user?.id) {
                    userId = user.user.id;
                }

                // Se ainda não tem ID, redireciona para o login
                if (!userId) {
                    console.error("ID do usuário não encontrado");
                    Alert.alert(
                        "Erro",
                        "Não foi possível identificar o usuário. Por favor, faça login novamente.",
                        [
                            {
                                text: "OK",
                                onPress: () => router.replace('/Login')
                            }
                        ]
                    );
                    return;
                }

                console.log("Buscando contatos para o usuário:", userId);
                const contactList = await contactService.getContactList(userId);
                setContacts(contactList);
            } catch (error) {
                console.error("Erro ao buscar contatos:", error);
                Alert.alert("Erro", "Não foi possível carregar a lista de contatos.");
            } finally {
                setLoading(false);
            }
        };

        fetchContacts();
    }, [userData, user]);

    const handleContactPress = (contact) => {
        const currentUserData = userData || (user?.user ? JSON.stringify(user.user) : null);
        
        if (!currentUserData) {
            Alert.alert(
                "Erro",
                "Não foi possível identificar o usuário. Por favor, faça login novamente.",
                [
                    {
                        text: "OK",
                        onPress: () => router.replace('/Login')
                    }
                ]
            );
            return;
        }

        router.push({
            pathname: '/ContactList/detalhes',
            params: { 
                contactData: JSON.stringify(contact),
                userData: currentUserData
            }
        });
    };

    const handleAddContact = () => {
        const currentUserData = userData || (user?.user ? JSON.stringify(user.user) : null);
        
        if (!currentUserData) {
            Alert.alert(
                "Erro",
                "Não foi possível identificar o usuário. Por favor, faça login novamente.",
                [
                    {
                        text: "OK",
                        onPress: () => router.replace('/Login')
                    }
                ]
            );
            return;
        }

        router.push({
            pathname: '/ContactList/Adding',
            params: { 
                userData: currentUserData
            }
        });
    };

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

            <TouchableOpacity 
                style={styles.addButton} 
                onPress={handleAddContact}
            >
                <Icon name="Plus" size={((width * height)/ 1000) * 0.08} style={styles.Icon} />
                <Text style={styles.addButtonText}>Adicionar contato</Text>
            </TouchableOpacity>

            {loading ? (
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>Carregando contatos...</Text>
                </View>
            ) : (
                <FlatList
                    data={contacts}
                    contentContainerStyle={styles.list}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            style={styles.contactItem}
                            activeOpacity={0.8} 
                            onPress={() => handleContactPress(item)}
                        >
                            <Text style={styles.contactName}>{item.name}</Text>
                            <Text style={styles.contactRelation}>{item.relationship}</Text>
                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={() => (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>Nenhum contato cadastrado</Text>
                        </View>
                    )}
                />
            )}
            
            <Navbar/> 
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.grdBlueLight,
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
        fontSize: ((width * height)/ 1000) * 0.08,
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
        padding: width * 0.06,
    },
    contactItem: {
        paddingVertical: height*0.02,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.grdGray,
    },
    contactName: {
        color: theme.colors.grdGray,
        fontWeight: 'bold',
        fontSize: 16,
    },
    contactRelation: {
        color: theme.colors.grdGray,
        fontSize: 14,
        marginTop: 4,
    },
    Icon: {
        color: theme.colors.grdGray,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: theme.colors.grdGray,
        fontSize: 16,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
    },
    emptyText: {
        color: theme.colors.grdGray,
        fontSize: 16,
    },
});
