import React from "react";
import { Animated, SafeAreaView, View, ScrollView, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { theme } from '@/theme/theme';
import { Icon } from '@/components/Icon';
import { Link, router } from 'expo-router';
import { Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Navbar } from '@/components/Navbar';
import { useRef, useEffect } from 'react';



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
		  <Icon name={icon} size={((width * height)/ 1000) * 0.07} style={{ marginRight: 10 }} />
		)}
		<View style={{ flex: 1 }}>
		  <Text style={styles.buttonText} numberOfLines={2} adjustsFontSizeToFit>
			{text}
		  </Text>
		</View>
	  </TouchableOpacity>
	);
  }
  

export default function MainMenu() {

  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (

    <LinearGradient
      colors={['#FFFFFF', '#D0ECEF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>

        <ScrollView style={styles.scrollView}>

        <View style={styles.sosContainer}>

          <Animated.View
            style={[ styles.outerCircle, {transform: [{ scale: pulseAnim }], },]}
          />

          <TouchableOpacity style={styles.innerCircle} onPress={() => router.push('/EmergencyMode')}>
            <TouchableOpacity style={styles.innerInnerCircle} onPress={() => router.push('/EmergencyMode')}>
            <Text style={styles.SOStext}>Chame ajuda</Text>
          </TouchableOpacity>
          </TouchableOpacity>
        </View>
          <CardButton
            icon="settings"
            text="Configurações"
            onPress={() => router.push('/Settings')}
            style={styles.GeneralButton}
          />

          <CardButton
            icon="contacts"
            text="Contatos"
            onPress={() => router.push('/ContactList')}
            style={styles.GeneralButton}
          />

          <CardButton
            imageSource={require('../../../assets/images/OrientationsToContacts.png')}
            text="Saiba como orientar seus contatos de emergência"
            onPress={() => router.push('/Orientations')}
            style={styles.orientationsButton}
          />

          <CardButton
          
            text="Tutoriais essenciais"
            onPress={() => router.push('/Tutorials')}
            style={styles.orientationsButton}
          />
        </ScrollView>
    
      </SafeAreaView>
    </LinearGradient>
  );
}


const styles = StyleSheet.create({

    background: {
      
      flex: 1,

  },

  container: {
    flex: 1,
  },
  scrollView: {
    
  },
  sosContainer: {
  justifyContent: 'center',
  alignItems: 'center',
  marginVertical: '20%',
  alignSelf: 'center',
},
 SOStext: {
  fontSize: ((width * height) / 1000) * 0.08,
  color: 'white',
  fontWeight: "bold",
  textAlign: "center",
},

outerCircle: {
  position: 'absolute',
  width: ((width * height) / 1000) * 0.75,
  height: ((width * height) / 1000) * 0.75,
  borderRadius: ((width * height) / 1000) * 0.8,
  backgroundColor: '#FF6B6B50', 
},

innerCircle: {
  width: ((width * height) / 1000) * 0.7,
  height: ((width * height) / 1000) * 0.7,
  borderRadius: ((width * height) / 1000) * 0.8,
  backgroundColor: '#FF6B6B50', 
  justifyContent: 'center',
  alignItems: 'center',
  elevation: 10,
},
innerInnerCircle: {
  width: ((width * height) / 1000) * 0.6,
  height: ((width * height) / 1000) * 0.6,
  borderRadius: ((width * height) / 1000) * 0.6,
  backgroundColor: "#FF6B6B",
  justifyContent: 'center',
  alignItems: 'center',
},
  text: {
    color: theme.colors.grdBlue,
    fontSize: ((width * height)/ 1000) * 0.07,
    fontWeight: "bold",
    textAlign: "center",
  },
  text2: {
    color: "#FFFFFF",
    fontSize: width * 0.01,
    textAlign: "center",
    marginHorizontal:  width * 0.01,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: width * 0.04,
    textAlign: "center",
    fontWeight: "bold",
  },
  emergencyButton: {
    backgroundColor: theme.colors.grdRed,
    ...baseCard,
    paddingVertical: height*0.04,
    paddingHorizontal: width*0.04,
  },
  buttonRow: {	  
	 flexDirection: "row",
	  alignItems: "flex-start",
	  justifyContent: "space",
  },
  iconContainer: {
    color: "#FFFFFF",
    size: width*0.04,
  },
  orientationsButton: {
    backgroundColor: theme.colors.grdBlue,
    ...baseCard,
    paddingVertical: height*0.03,
    paddingHorizontal: width*0.04,
  },
  GeneralButton: {
    backgroundColor: theme.colors.grdBlue,
    ...baseCard,
    paddingVertical: height*0.03,
    paddingHorizontal: width*0.04,
  },
  image: {
    width: width * 0.2, 
    height: width * 0.2, 
  },
});
