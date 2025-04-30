import React, {useState} from "react";
import { SafeAreaView, View, ScrollView, Text, Image, TextInput, StyleSheet,TouchableOpacity} from "react-native";
import { theme } from '@/theme/theme';
import { Icon } from '@/components/Icon';
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

				<TouchableOpacity style={styles.EmergencyButton}  onPress={() => router.push('/EmergencyMode')}>
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
                           
						<Icon 
							name="settings"
							size={30}
						/>
							
							
							<Text style={styles.text}>
                                {"Configurações"}
                            </Text>

						</TouchableOpacity>
						<TouchableOpacity style={styles.row4} onPress={() => router.push('/ContactList')}>
							<Icon 
								name="contacts"
								size={30}
							/>
							<Text style={styles.text}>
								{"Contatos de emergência"}
							</Text>
						</TouchableOpacity>
                	</View>
	
				</View>
				
    
    

				<TouchableOpacity style={styles.OrientationsToContacts} activeOpacity={0.8} onPress={() => router.push('/Orientations')}>
					<Image
						source={require('../../../assets/images/OrientationsToContacts.png')}
						resizeMode = {"stretch"}
						style={styles.image4}
					/>
					 <Text style={styles.text}>
                                {"Saiba como orientar seus contatos de emergência"}
                    </Text>
					
				</TouchableOpacity>



			</ScrollView>
			

			<View style={styles.navbar}>
			<TouchableOpacity style={styles.iconContainer} activeOpacity={0.8} onPress={() => router.push('/MainMenu')}>
					<Icon 
						name="Home"
						size={40}
					/>
                </TouchableOpacity>
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
	  color: "#FFFFFF",
	  fontSize: width * 0.05, 
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

	iconContainer: {

		color: "#FFFFFF",
		size: 34,

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