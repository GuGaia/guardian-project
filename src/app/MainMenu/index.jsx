import React from "react";
import { SafeAreaView, View, ScrollView, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { theme } from '@/theme/theme';
import { Icon } from '@/components/Icon';
import { Link, router } from 'expo-router';
import { Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


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
  

export default function MainMenu() {

  return (

    <LinearGradient
      colors={['#FFFFFF', '#83A4ED']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <Text style={styles.text}>{"Central de socorro"}</Text>
          </View>

          <CardButton
            imageSource={require('../../../assets/images/EmergencyButton.png')}
            text="Botão de Emergência"
            onPress={() => router.push('/EmergencyMode')}
            style={styles.emergencyButton}
          />

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
        </ScrollView>

        <View style={styles.navbar}>
          <TouchableOpacity
            style={styles.navbarContent}
            onPress={() => router.push('/MainMenu')}
          >
            <Icon
              name="Home"
              size={((width * height) / 1000) * 0.14}
              style={styles.navbarIcon}
            />
          </TouchableOpacity>
        </View>
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
  header: {
    paddingVertical:  height * 0.05,
    marginBottom: height*0.02,
  },
  text: {
    color: theme.colors.grdBlue,
    fontSize: ((width * height)/ 1000) * 0.07,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal:  width * 0.04,
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
  navbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: ((width * height)/ 1000) * 0.16,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
    elevation: 10,
  },
  navbarContent: {
    width: ((width * height)/ 1000) * 0.18,
    height: ((width * height)/ 1000) * 0.18,
    backgroundColor: theme.colors.grdBlue,
    borderRadius: ((width * height)/ 1000) * 0.18,
    justifyContent: "center",
    alignItems: "center",
  },
  navbarIcon: {
    tintColor: "#FFFFFF",}
});
