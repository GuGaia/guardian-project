import React, {useState} from "react";
import { SafeAreaView, View, ScrollView, Text, Image, TextInput, StyleSheet,TouchableOpacity} from "react-native"
import { globalStyles } from '@/theme/globalStyles';
import { theme } from '@/theme/theme';
import { Icon } from '@/components/Icon';
import { GrdTextInput } from '@/components/inputs/GrdTextInput';
import { GrdOutlinedButton } from '@/components/buttons/GrdOutlinedButton';
import { GrdSolidButton } from '@/components/buttons/GrdSolidButton';
import { Link, router } from 'expo-router';
import { Dimensions } from 'react-native';


export default function EmergencyButton() {

    return(

        <SafeAreaView style={styles.background}>

            <View style={styles.displayContainer}>
                    <Icon 
                            name="GuardianOwlWhite"
                            size={148} 
                        />

            </View>

            <View style={styles.containerText} >

            <Text style={styles.text}>     {"Aguarde"} </Text>

             <Text style={styles.text2}>    {"Ajuda está a caminho"} </Text>
                

            </View>
            

                <TouchableOpacity style={styles.Cancelbutton} onPress={() => router.push('/MainMenu')}>
                    
                    <Text style={styles.text}>
                        {"Cancelar"}
                    </Text>
                
             </TouchableOpacity>                                        


        </SafeAreaView>

    )
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

	background: {
	  flex: 1,
	  backgroundColor: theme.colors.grdBlue,
      alignItems: 'center',
      justifyContent: 'center',

	},

    Cancelbutton: {
	
		backgroundColor: theme.colors.grdRed,
        width: '40%',
        alignSelf: 'center',
        paddingVertical: 12,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
	  shadowRadius: 4,

	},

containerText: {

    padding:45,
    
},

    text: {

        color: "#D9E7FF",
        fontSize: width * 0.05,
        fontWeight: "bold",
        textAlign: "center",
        marginHorizontal: 16

    },

    text2: {

        color: "#D9E7FF",
        fontSize: width * 0.05,
        textAlign: "center",
        marginHorizontal: 16

    }
      
});