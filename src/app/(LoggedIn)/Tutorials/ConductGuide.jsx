import React, { useRef, useState } from 'react';
import {View,Text,Dimensions,FlatList,StyleSheet,SafeAreaView,TouchableOpacity,} from 'react-native';
import { useRouter } from 'expo-router';
import { theme } from '@/theme/theme';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    title: 'Guia de Conduta em Caso de Assalto',
    description:
      'Em situações de assalto, o mais importante é preservar sua vida. Mantenha a calma, siga as instruções e evite qualquer tipo de reação impulsiva.',
  },
  {
    title: 'Não Reaja, Mantenha a Calma',
    description:
      'Evite gritar, correr ou encarar o assaltante. Obedeça às ordens, fale com calma e evite movimentos bruscos. Sua segurança é prioridade.',
  },
  {
    title: 'Mãos Visíveis e Movimentos Lentos',
    description:
      'Deixe as mãos visíveis o tempo todo. Se precisar pegar carteira ou celular, avise antes. Aja com tranquilidade para não gerar desconfiança.',
  },
  {
    title: 'Após o Assalto, Aja com Rapidez',
    description:
      'Afaste-se do local, vá para um lugar seguro, acione a polícia (190) e registre o boletim de ocorrência. Bloqueie cartões e dispositivos roubados.',
  },
  {
    title: 'Use o Guardiã com Segurança',
    description:
      'Assim que possível, ative o Guardiã para alertar seus contatos. Registre o ocorrido e forneça informações úteis à investigação, como características do suspeito.',
  },
];


export default function SecurityTipsCarousel() {
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
    fontSize: width * 0.07,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    color: '#D9E7FF',
    fontSize: width * 0.045,
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
