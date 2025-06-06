import React, { useRef, useEffect, useState } from "react";
import { Animated, SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Dimensions, Vibration } from "react-native";
import { theme } from '@/theme/theme';
import { Icon } from '@/components/Icon';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Navbar } from '@/components/Navbar';
import Header from "./Header";
import { useLocation } from '@/hooks/useLocation';
import { LocationStatusCard } from '@/components/LocationStatusCard';
import { useAuth } from '@/hooks/Auth';
import { homeService } from '@/services/homeService';
import { NativeModules } from 'react-native';
import { useSos } from '@/hooks/useSOS';

const { width, height } = Dimensions.get('window');
const BluetoothModule = NativeModules.BluetoothModule;
const { Storage } = NativeModules;

const handleSosPress = () => {
  router.push('/EmergencyMode');
  Vibration.vibrate([0, 500, 200, 500, 200, 500], false);
};

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

export default function MainMenu() {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const { location, error } = useLocation(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.authenticated && user?.user?.id) {
        try {
          const data = await homeService.getUserData(user.user.id);
          setUserData(data);
          setIsLoading(false);
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user?.authenticated, user?.user?.id]);

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

    const checkDevice = async () => {
          try {
            const mac = await Storage.getMac();
            const isConnected = await BluetoothModule.isDeviceConnected(mac);
            console.log(isConnected)
            setConectado(isConnected);
          } catch (error) {
            console.error('Erro ao verificar conexão Bluetooth:', error);
            setConectado(false);
          }
        };
    
        checkDevice();
  });

  useEffect(() => {
    const fetchUserData = async () => {
      console.log("fetchUserData iniciado, user:", user);
      try {
        const data = await homeService.getUserData(user.user.id);
        console.log("Dados recebidos:", data);
        if (data) {
          setUserData(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        setIsLoading(false);
      }
    };

    if (user?.authenticated && user?.user?.id) {
      console.log("Usuário autenticado e ID existe, iniciando fetchUserData");
      fetchUserData();
    } else {
      console.log("Usuário não autenticado ou ID não existe:", user);
      setIsLoading(false);
    }
  }, [user?.authenticated, user?.user?.id]);

  // Log userData changes
  useEffect(() => {
    if (userData) {
      console.log('Dados do usuário atualizados:', userData);
    }
  }, [userData]);

  if (isLoading) {
    return (
      <LinearGradient
        colors={['#FFFFFF', '#9FE7F5']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[styles.background, styles.loadingContainer]}
      >
        <ActivityIndicator size="large" color={theme.colors.grdGray} />
        <Text style={styles.loadingText}>Carregando dados...</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#FFFFFF', '#9FE7F5']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        
        <Header username={userData?.name || 'Usuário'} userData={userData}/>
          
          <View style={{ flex:1, paddingBottom:  height* 0.08, justifyContent: "center" }}>
            <Text style={{fontSize: 28, textAlign:"center", fontWeight: "bold",color: theme.colors.grdGray}}>Precisa de ajuda?</Text>
            <Text style={{fontSize: 16, textAlign:"center", color: theme.colors.grdGray,paddingHorizontal:80}}>Pressione o botão e buscaremos ajuda para você</Text>
            <View style={styles.sosContainer}>


            <Animated.View style={[ styles.outerCircle, {transform: [{ scale: pulseAnim }], },]}/>
              <TouchableOpacity style={styles.innerCircle} onPress={handleSosPress}>
                <TouchableOpacity style={styles.innerInnerCircle} onPress={handleSosPress}>
                  <Text style={styles.SOStext}>Chame ajuda</Text>
                </TouchableOpacity>
               </TouchableOpacity>
          </View>     
            
  

          <View style={styles.statusRow}>
            <View style={styles.statusCard}>

              {conectado ? (
                <>
                  <Text style={styles.statusValue}>Ativo</Text>
                    <Animated.View
                        style={[
                                styles.statusIndicator,
                                { transform: [{ scale: pulseAnim }] },
                              ]}
                                />
                    </>
              ) : (
                <>
                  <Text style={styles.statusErrorTitle}>Desativado</Text>
                    <Animated.View
                        style={[
                                styles.statusIndicatorError,
                                { transform: [{ scale: pulseAnim }] },
                                ]}
                                />
                </>
              )}
            
            </View>
      
              <LocationStatusCard />

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
  statusIndicatorError: {
  position: 'absolute',
  bottom: 8,
  right: 8,
  width: 14,
  height: 14,
  borderRadius: 7,
  backgroundColor: '#FF6B6B',
  shadowColor: '#FF6B6B',
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.8,
  shadowRadius: 4,
  elevation: 6,
},

  statusTitle: {
    color: theme.colors.grdGray,
    fontSize: 14,
    fontWeight: '600',
  },
  statusErrorTitle: {
    color: theme.colors.grdRed,
    fontSize: 16,
    marginTop: 8,
    fontWeight: 'bold',
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

loadingContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
loadingText: {
  marginTop: 10,
  fontSize: 16,
  color: theme.colors.grdGray,
},

});
