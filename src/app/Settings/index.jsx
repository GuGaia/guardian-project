import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { globalStyles } from '@/theme/globalStyles';
import { theme } from '@/theme/theme';
import { Icon } from '@/components/Icon';
import { useRouter } from 'expo-router';

export default function Page() {
    const router = useRouter();

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
                    name="settings" 
                    size={45} 
                    />
                    <View style={{ marginLeft: 8 }}>
                        <Text style={styles.title}>Configurações</Text>
                    </View>
                </View>
            </View>

            
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
		paddingBottom: 10, 
		elevation: 10, 
	  },
	  navbarContent: {
		width: 60,
		height: 60,
		backgroundColor: theme.colors.grdBlueLight,
		borderRadius: 30, 
		justifyContent: "center",
		alignItems: "center",
	  },
	  navbarIcon: {
		width: 30,
		height: 30,
		tintColor: "#FFFFFF", 
	  },	  
});
