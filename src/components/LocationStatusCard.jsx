
import { useLocation } from '@/hooks/useLocation';
import React from "react";
import { Animated, SafeAreaView, View, ScrollView, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
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








export function LocationStatusCard() {
  const { location, error } = useLocation();

  return (
    <View style={styles.statusCard}>
      <Text style={styles.statusTitle}>Sua Localização</Text>

      {location ? (
        <View style={styles.locationMockup}>
          <Text style={styles.locationText}>
            {location.address} {'\n'}
          </Text>
        </View>
      ) : (
        <Text style={styles.locationText}>Buscando localização...</Text>
      )}

      {error && (
        <Text style={{ color: theme.colors.grdRed }}>{error}</Text>
      )}

      <Icon
        name="Location"
        size={24}
        color="#fff"
        style={styles.locationIcon}
      />
    </View>
  );
}


const styles = StyleSheet.create({

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
