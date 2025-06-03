import React from 'react';
import { TouchableOpacity, Animated, StyleSheet, Dimensions, View } from 'react-native';
import { Icon } from '@/components/Icon';
import { theme } from '@/theme/theme';
import { router, useLocalSearchParams } from 'expo-router';
const { width, height } = Dimensions.get('window');

export function Navbar() {
  const { userData } = useLocalSearchParams();

  return (
    <Animated.View style={[styles.navbar, { transform: [{ translateY: 0 }] }]}>
      <View style={styles.navbarRow}>
        <NavItem icon="contacts" route="/ContactList" userData={userData} />
        <NavItem icon="Home" route="/MainMenu" />
        <NavItem icon="settings" route="/Settings" />
      </View>
    </Animated.View>
  );
}

function NavItem({ icon, route, userData }) {
  const handlePress = () => {
    if (route === '/ContactList' && userData) {
      router.push({
        pathname: route,
        params: { userData }
      });
    } else {
      router.push(route);
    }
  };

  return (
    <TouchableOpacity style={styles.navbarContent} onPress={handlePress}>
      <Icon name={icon} size={((width * height) / 1000) * 0.08} style={styles.navbarIcon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  navbarRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
      position: 'absolute',
    borderTopLeftRadius: ((width * height) / 1000) * 0.2,
    borderTopRightRadius: ((width * height) / 1000) * 0.2,
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    zIndex: 1,
    
    backgroundColor: theme.colors.grdBlue,
  },
  navbarContent: {
    width: height * 0.15,
    height: height * 0.15,
    borderRadius: ((width * height) / 1000) * 0.02,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navbarIcon: {
    tintColor: '#FFFFFF',
  },
});
