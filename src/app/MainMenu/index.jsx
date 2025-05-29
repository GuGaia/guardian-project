import React from "react";
import { Animated, SafeAreaView, View, ScrollView, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { theme } from '@/theme/theme';
import { Icon } from '@/components/Icon';
import { Link, router } from 'expo-router';
import { Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Navbar } from '@/components/Navbar';
import { useRef, useEffect, useState } from 'react';
import { Header } from "./Header";

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
		  <Text style={styles.statusTitle} numberOfLines={2} adjustsFontSizeToFit>
			{text}
		  </Text>
		</View>
	  </TouchableOpacity>
	);
  }

function useLocation(isLoggedIn) {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      if (!isLoggedIn) {
        setLocation({
          latitude: -23.5505,
          longitude: -46.6333,
          address: 'Av. Exemplo, 123 - Cidade Fictícia',
        });
        return;
      }

      try {
        const response = await fetch('https://api.seusistema.com/location', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer seu_token_aqui', // Aqui você futuramente pega do contexto de auth
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Falha ao buscar localização');
        }

        const data = await response.json();
        setLocation({
          latitude: data.latitude,
          longitude: data.longitude,
          address: data.address,
        });
      } catch (err) {
        console.error(err);
        setError('Erro ao obter localização');
        setLocation({
          latitude: -23.5505,
          longitude: -46.6333,
          address: 'Av. Exemplo, 123 - Cidade Fictícia',
        });
      }
    };

    fetchLocation();
  }, [isLoggedIn]);

  return { location, error };
}


export default function MainMenu() {

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const { location, error } = useLocation(false);

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

  console.log(MainMenu); // Deve mostrar uma função. Se for undefined, o import está errado


  return (

    <LinearGradient
      colors={['#FFFFFF', '#9FE7F5']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        
        <Header/>
          
          <View style={{ flex:1, paddingBottom:  height* 0.08, justifyContent: "center" }}>
            <Text style={{fontSize: 28, textAlign:"center", fontWeight: "bold",color: theme.colors.grdGray}}>Precisa de ajuda?</Text>
            <Text style={{fontSize: 16, textAlign:"center", color: theme.colors.grdGray,paddingHorizontal:80}}>Pressione o botão e buscaremos ajuda para você</Text>
            <View style={styles.sosContainer}>


            <Animated.View style={[ styles.outerCircle, {transform: [{ scale: pulseAnim }], },]}/>
              <TouchableOpacity style={styles.innerCircle} onPress={() => router.push('/EmergencyMode')}>
                <TouchableOpacity style={styles.innerInnerCircle} onPress={() => router.push('/EmergencyMode')}>
                  <Text style={styles.SOStext}>Chame ajuda</Text>
                </TouchableOpacity>
              </TouchableOpacity>
          </View>     
            
          <View style={styles.statusRow}>
            <View style={styles.statusCard}>
              <Text style={styles.statusTitle}>Status do botão</Text>
              <Text style={styles.statusValue}>ativo</Text>
              <Animated.View
                style={[
                styles.statusIndicator,
                { transform: [{ scale: pulseAnim }] },
                ]}
                />
            
            </View>
              <View style={styles.statusCard}>
                <Text style={styles.statusTitle}>Sua Localização</Text>

                {location ? (
                <View style={styles.locationMockup}>
                <Text style={styles.locationText}> {location.address}{"\n"}</Text>
                </View>
                ) : (
                <Text>Buscando localização...</Text>
                )}

                {error && <Text style={{ color: theme.colors.grdRed }}>{error}</Text>}

                <Icon
                name="Location"
                size={24}
                color="#fff"
                style={styles.locationIcon}
                />
              </View>

            </View>

          <CardButton
            text="Guias Salva-Vidas"
            onPress={() => router.push('/Tutorials')}
            style={styles.GeneralButton}
          />
    
          </View>
        <Navbar/>
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
  marginVertical: '10%',
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
    color: "white",
    fontSize: ((width * height)/ 1000) * 0.07,
    fontWeight: "bold",
    textAlign: "center",
  },
  GeneralButton: {
    backgroundColor: "white",
    ...baseCard,
    paddingVertical: height*0.03,
    paddingHorizontal: width*0.04,
  },
    statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    paddingBottom: 10,
  },

  statusCard: {
    backgroundColor: 'white',
    width: width * 0.43,
    padding: 16,
    borderRadius: 12,
    ...baseCard,
  },

  statusTitle: {
    color: theme.colors.grdGray,
    fontSize: 14,
    fontWeight: '600',
  },

  statusValue: {
    color: "#009933" ,
    fontSize: 16,
    marginTop: 8,
    fontWeight: 'bold',
  },
  statusIndicator: {
  position: 'absolute',
  bottom: 8,
  right: 8,
  width: 14,
  height: 14,
  borderRadius: 7,
  backgroundColor: '#00cc44',
  shadowColor: '#00cc44',
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.8,
  shadowRadius: 4,
  elevation: 6,
},

locationIcon: {
  position: 'absolute',
  bottom: 8,
  right: 8,
},

});
