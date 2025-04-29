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



export default function MainMenu () {

	return (
		<SafeAreaView style={styles.container}>



			<ScrollView  style={styles.scrollView}>
				
			<View style={styles.view}>
					<Text style={styles.text}>
						{"Central de socorro"}
					</Text>
				</View>

				<TouchableOpacity style={styles.EmergencyButton}  onPress={() => router.push('/EmergencyButton')}>
				<Image
						source={require('../../../assets/images/EmergencyButton.png')}
						resizeMode = {"stretch"}
						style={styles.image4}
					/>
					<Text style={styles.text}>
						{"Botão de Emergência"} 
					</Text>

					<Text style={styles.text2}>
						{"acione ajuda agora"} 
					</Text>
				
				</TouchableOpacity>

                <View style={styles.buttonContainer}>
                    
                    <View style={styles.row2}>
					<TouchableOpacity style={styles.row3} onPress={() => router.push('/Settings')}>
                            <Text style={styles.text}>
                                {"Configurações"}
                            </Text>

						</TouchableOpacity>
						<TouchableOpacity style={styles.row4} onPress={() => router.push('/ContactList')}>
							<Image
								source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/U9b7Iuerty/prqb2a5f_expires_30_days.png"}}
								resizeMode={"stretch"}
								style={styles.image3}
							/>
							<Text style={styles.text}>
								{"Contatos de emergência"}
							</Text>
						</TouchableOpacity>
                	</View>
	
				</View>
				
        
                
	
    

				<View style={styles.OrientationsToContacts}>
					<Image
						source={require('../../../assets/images/OrientationsToContacts.png')}
						resizeMode = {"stretch"}
						style={styles.image4}
					/>
					 <Text style={styles.text}>
                                {"Saiba como orientar seus contatos de emergência"}
                    </Text>
					
				</View>



			</ScrollView>
			

			<View style={styles.navbar}>
				<View style={styles.navbarContent}>
					<Image
						source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/U9b7Iuerty/g7g8stmp_expires_30_days.png" }}
						resizeMode="contain"
						style={styles.navbarIcon}
					/>
				</View>
			</View>



		</SafeAreaView>
	)
}

const { width, height } = Dimensions.get('window');


const styles = StyleSheet.create({

	container: {
	  flex: 1,
	  backgroundColor: "#FFFFFF",
	},
	scrollView: {
	  backgroundColor: "#D9E7FF",
	},
	view: {
	  backgroundColor: "#3573FA",
	  paddingVertical: 12,
	  marginBottom: 36, 
	 
	},
	text: {
	  color: "#D9E7FF",
	  fontSize: width * 0.05, // tamanho adaptável
	  fontWeight: "bold",
	  textAlign: "center",
	  marginHorizontal: 16,
	},
	text2: {
		color: "#D9E7FF",
		fontSize: width * 0.04, // tamanho adaptável
		textAlign: "center",
		marginHorizontal: 16,
	  },



	EmergencyButton:{

		
		flex: 1,
	
		backgroundColor: theme.colors.grdRed,
		borderRadius: 12,
		paddingVertical: 20,
		paddingHorizontal: 10,
		marginRight: 20,
		alignItems: "center",
		borderRadius: 12,
	  paddingVertical: 15,
	  paddingLeft: 17,
	  marginBottom: 30,
	  marginHorizontal: 20,
	  shadowColor: "#00000040",
	  shadowOpacity: 0.3,
	  shadowOffset: {
		width: 0,
		height: 4,
	  },
	  shadowRadius: 4,
	  elevation: 4,


	},

	buttonContainer: {
	  paddingHorizontal: 20,
	},


	row2: {
	  flexDirection: "row",
	  alignItems: "flex-start",
	  marginBottom: 16,
	  marginHorizontal: 0,
	  justifyContent: "space-between",
	},
	row3: {
	  flex: 1,
	  flexDirection: "row",
	  backgroundColor: "#5C97FF",
	  borderRadius: 12,
	  paddingVertical: 20,
	  paddingHorizontal: 10,
	  marginRight: 8,
	  alignItems: "center",
	},
	row4: {
	  flex: 1,
	  flexDirection: "row",
	  backgroundColor: "#5C97FF",
	  borderRadius: 12,
	  paddingVertical: 20,
	  paddingHorizontal: 10,
	  alignItems: "center",
	},
	image2: {
	  borderRadius: 12,
	  width: width * 0.06,
	  height: width * 0.06,
	  marginRight: 8,
	},
	image3: {
	  borderRadius: 12,
	  width: width * 0.06,
	  height: width * 0.06,
	  marginRight: 8,
	},
	
	OrientationsToContacts: {
	  flexDirection: "row",
	  alignItems: "center",
	  backgroundColor: "#3573FA",
	  borderRadius: 12,
	  paddingVertical: 15,
	  paddingLeft: 17,
	  marginBottom: 30,
	  marginHorizontal: 20,
	  shadowColor: "#00000040",
	  shadowOpacity: 0.3,
	  shadowOffset: {
		width: 0,
		height: 4,
	  },
	  shadowRadius: 4,
	  elevation: 4,
	},
	image4: {
	  width: width * 0.25, // proporcional à tela
	  height: width * 0.25,
	  marginRight: 15,
	},
	input: {
	  flex: 1,
	  color: "#D9E7FF",
	  fontSize: width * 0.04,
	  paddingVertical: 10,
		fontWeight: "bold",
		flex: 1,
		flexWrap: "wrap",
		marginRight: 8, 
		numberOfLines: 2,
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
		paddingBottom: 10, // espaço para telefones com borda

		elevation: 10, // para Android
	  },
	  navbarContent: {
		width: 60,
		height: 60,
		backgroundColor: theme.colors.grdBlueLight,
		borderRadius: 30, // deixa redondo
		justifyContent: "center",
		alignItems: "center",
	  },
	  navbarIcon: {
		width: 30,
		height: 30,
		tintColor: "#FFFFFF", 
	  },	  
  });