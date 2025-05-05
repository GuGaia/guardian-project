import React from "react";
import { SafeAreaView, View, ScrollView, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { theme } from '@/theme/theme';
import { Icon } from '@/components/Icon';
import { Link, router } from 'expo-router';
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
  paddingVertical: width* 0.04,
  marginBottom: width* 0.04,
  marginHorizontal: width* 0.04,
};

function CardButton({ onPress, icon, text, style, imageSource }) {
	return (
	  <TouchableOpacity style={[buttonBase, style]} onPress={onPress}>
		{imageSource ? (
		  <Image source={imageSource} resizeMode="contain" style={[styles.image, { marginRight: 10 }]} />
		) : (
		  <Icon name={icon} size={30} style={{ marginRight: 10 }} />
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
		


			
				<View style={styles.buttonRow}>
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

			
			</View>

			<CardButton
			imageSource={require('../../../assets/images/OrientationsToContacts.png')}
			text="Saiba como orientar seus contatos de emergência"
			onPress={() => router.push('/Orientations')}
			style={styles.orientationsButton}
			/>
      </ScrollView>

   		<View style={styles.navbar}>
		   <TouchableOpacity style={styles.navbarContent} onPress={() => router.push('/MainMenu')}>
			 <Icon name="Home" size={40} style={styles.navbarIcon} />
		   </TouchableOpacity>
		 </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: "#D9E7FF",
  },
  header: {
    backgroundColor: "#3573FA",
    paddingVertical:  height * 0.01,
    marginBottom: height*0.04,
  },
  text: {
    color: "#FFFFFF",
    fontSize: width * 0.05,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal:  width * 0.04,
  },
  text2: {
    color: "#FFFFFF",
    fontSize: width * 0.04,
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
    backgroundColor: "#3573FA",
    ...baseCard,
    paddingVertical: height*0.03,
    paddingHorizontal: width*0.04,
  },
  GeneralButton: {
    backgroundColor: theme.colors.grdBlueLight,
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
    tintColor: "#FFFFFF",}
});
