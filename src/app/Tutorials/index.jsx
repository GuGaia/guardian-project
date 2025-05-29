import React from 'react';
import { SafeAreaView, View, ScrollView, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { globalStyles } from '@/theme/globalStyles';
import { theme } from '@/theme/theme';
import { Icon } from '@/components/Icon';
import { Link, router } from 'expo-router';
import { Navbar } from '@/components/Navbar';
import { Dimensions } from 'react-native';


const { width, height } = Dimensions.get('window');

const baseCard = {
  borderRadius: 12,
  shadowColor: "#00000040",
  shadowOpacity: 0.3,
  shadowOffset: { width: 0, height: 4 },
  shadowRadius: 4,
  elevation: 4,
};

const buttonBase = {
  ...baseCard,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: height* 0.04,
  marginBottom: height* 0.015,
  marginHorizontal: height* 0.03,
};

function CardButton({ onPress, icon, text, style, imageSource }) {
    return (
      <TouchableOpacity style={[buttonBase, style]} onPress={onPress}>
        {imageSource ? (
          <Image source={imageSource} resizeMode="contain" style={[styles.image, { marginRight: 10 }]} />
        ) : (
          <Icon name={icon} size={((width * height)/ 1000) * 0.1} style={{ marginRight: 10 }} />
        )}
        <View style={{ flex: 1 }}>
          <Text style={styles.buttonText} numberOfLines={2} adjustsFontSizeToFit>
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

export default function Page() {

    return (


<SafeAreaView style={styles.container}>

     <View style={styles.header}></View>
        <View style={styles.titleCard}>

            <View style={styles.none}>
                
                <Text style={styles.title}>Guias Salva-Vidas</Text>
            
            </View>
        </View>
    
          <ScrollView contentContainerStyle={styles.scrollView}>
                    
                <View style={styles.list}> 

                <CardButton
                    imageSource={require('../../../assets/images/EmergencyButton.png')}
                    text="Como o Guardiã funciona?"
                    onPress={() => router.push('/Tutorials/HowItWorks')}
                    style={styles.GeneralButton}
                />
                <CardButton
                    imageSource={require('../../../assets/images/OrientationsToContacts.png')}
                    text="Saiba como orientar seus contatos de emergência"
                    onPress={() => router.push('/Orientations')}
                    style={styles.GeneralButton}
                  />
                <CardButton

                    text="Por que ativar o modo discreto de emergência? Personalize o seu!"
                    onPress={() => router.push('/Tutorials/WhyActivateDiscreteMode')}
                    style={styles.GeneralButton}
                />
                <CardButton
                    text="Guia de conduta em caso de assalto"
                    onPress={() => router.push('/Tutorials/ConductGuide')}
                    style={styles.GeneralButton}
                />
                <CardButton
                    text="Rotinas seguras: transforme o hábito em proteção"
                    onPress={() => router.push('/Tutorials/SafeRoutines')}
                    style={styles.GeneralButton}
                />


                </View>
            </ScrollView>

            <Navbar/>

            
</SafeAreaView>



    );
}

const styles = StyleSheet.create({

container: {
  flex: 1,
  backgroundColor: theme.colors.grdBlueLight,
},
scrollView: {
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
    fontSize:  height * 0.03,
},
list: {
  paddingVertical: height* 0.02,
},

buttonText: {
    color: theme.colors.grdGray,
    fontSize:  ((width * height)/ 1000) * 0.07,
    padding: ((width * height)/ 1000) * 0.08,
},

GeneralButton: {
    backgroundColor: 'white',
    ...baseCard,
    paddingVertical: height*0.03,
    paddingHorizontal: width*0.04,
},



});
