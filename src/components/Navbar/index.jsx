import React from 'react';
import { TouchableOpacity, Animated, StyleSheet, Dimensions, View } from 'react-native';
import { Icon } from '@/components/Icon';
import { theme } from '@/theme/theme';
import { router, usePathname } from 'expo-router';
const { width, height } = Dimensions.get('window');

export function Navbar() {
  const pathname = usePathname();

  return (
    <Animated.View style={[styles.navbar, { transform: [{ translateY: 0 }] }]}>
      <View style={styles.navbarRow}>
        <NavItem 
          icon="contacts" 
          route="/ContactList" 
          isActive={pathname === '/ContactList'}
        />
        <NavItem 
          icon="Home" 
          route="/MainMenu" 
          isActive={pathname === '/MainMenu'}
        />
        <NavItem 
          icon="settings" 
          route="/Settings" 
          isActive={pathname === '/Settings'}
        />
      </View>
    </Animated.View>
  );
}

function NavItem({ icon, route, isActive }) {
  const handlePress = () => {
    router.push(route);
  };

  return (
    <TouchableOpacity 
      style={styles.navbarContent} 
      onPress={handlePress}
    >
      <View style={[
        styles.iconContainer,
        isActive && styles.activeNavItem
      ]}>
        <Icon 
          name={icon} 
          size={((width * height) / 1000) * 0.08} 
          style={styles.navbarIcon}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  navbarRow: {
    flexDirection: 'row',
    width: '100%',
    position: 'absolute',
    borderTopLeftRadius: ((width * height) / 1000) * 0.2,
    borderTopRightRadius: ((width * height) / 1000) * 0.2,
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.15,
    paddingBottom: height * 0.04,
    justifyContent: 'space-evenly',
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
    width: height * 0.06,
    height: height * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: height * 0.04,
    height: height * 0.04,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: height * 0.1,
    overflow: 'hidden',
  },
  activeNavItem: {
    backgroundColor: 'rgba(13, 29, 173, 0.2)',
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  navbarIcon: {
    tintColor: '#FFFFFF',
    zIndex: 1,
  },
});
