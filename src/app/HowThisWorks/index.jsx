import React, { useRef, useState } from 'react';
import { View, Text, Dimensions, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { theme } from '@/theme/theme';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    title: 'Bem-vindo ao Guardiã',
    description: 'Um app pensado para sua segurança, com ferramentas discretas e eficazes em situações de risco.',
  },
  {
    title: 'Botão do Pânico',
    description: 'Com apenas um toque, você aciona automaticamente os seus contatos de emergência.',
  },
  {
    title: 'Mensagens Automáticas',
    description: 'O app envia alertas com sua localização e uma frase de segurança definida por você.',
  },
  {
    title: 'Gravação de Áudio',
    description: 'Uma gravação discreta é iniciada automaticamente, registrando o que acontece ao seu redor.',
  },
  {
    title: 'Seguro. Rápido. Discreto.',
    description: 'Tudo foi pensado para agir com agilidade e invisibilidade em situações críticas.',
  },
];

export default function HowItWorksCarousel() {
  const router = useRouter();
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const goNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.push('/MainMenu');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        ref={flatListRef}
        keyExtractor={(_, index) => index.toString()}
      />

      <View style={styles.footer}>
        <View style={styles.dotsContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index ? styles.activeDot : null,
              ]}
            />
          ))}
        </View>
        <TouchableOpacity onPress={goNext} style={styles.button}>
          <Text style={styles.buttonText}>
            {currentIndex === slides.length - 1 ? 'Concluir' : 'Avançar'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.grdBlue,
  },
  slide: {
    width,
    height,
    padding: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: width * 0.08,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    color: '#D9E7FF',
    fontSize: width * 0.05,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    width,
    alignItems: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    margin: 5,
  },
  activeDot: {
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: theme.colors.grdRed,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
  },
  buttonText: {
    color: 'white',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
});
