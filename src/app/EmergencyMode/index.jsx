import React, {useState} from "react";
import { SafeAreaView, View, ScrollView, Text, Image, TextInput, StyleSheet,TouchableOpacity} from "react-native"
import { globalStyles } from '@/theme/globalStyles';
import { theme } from '@/theme/theme';
import { Icon } from '@/components/Icon';
import { Dimensions } from 'react-native';
import { Link, router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function EmergencyMode() {

    return(

    <SafeAreaView style={styles.background}>
    <View style={styles.mainContent}>
        
        <View style={styles.displayContainer}>
        <Icon name="GuardianOwlWhite" size={148} />
        </View>

        <View style={styles.containerText}>
        <Text style={styles.text}>Aguarde</Text>
        <Text style={styles.text2}>Ajuda está a caminho</Text>
        </View>

        <TouchableOpacity style={styles.Cancelbutton} onPress={() => router.push('/MainMenu')}>
        <Text style={styles.text}>Cancelar</Text>
        </TouchableOpacity>

    </View>
    </SafeAreaView>

    )
}

const styles = StyleSheet.create({

    mainContent: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: height * 0.2,
    },

	background: {
	  flex: 1,
	  backgroundColor: theme.colors.grdBlue,
      alignItems: 'center',
      justifyContent: 'center',

	},

    Cancelbutton: {
	
		backgroundColor: theme.colors.grdRed,
        width: '50%',
        height: height * 0.05,
        alignSelf: 'center',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
	  shadowRadius: 4,

	},


    text: {
        color: "white",
        fontSize: width * 0.05,
        fontWeight: "bold",
        textAlign: "center",
        marginHorizontal: 16

    },

    text2: {
        color: "white",
        fontSize: width * 0.05,
        textAlign: "center",
        marginHorizontal: 16,
        padding: 20, 

    }
      
});