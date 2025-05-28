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

    return (
        <View style={styles.container}>
            <View style={styles.header}>
            </View>

            <View style={styles.titleCard}>
                <View style={styles.none}>
                    
                    <Text style={styles.title}>Orientações</Text>
                    <Text style={styles.title}>para</Text>
                    <Text style={styles.title}>emergencias</Text>
                 
                </View>
            </View>

            
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
