import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';

// import { StyleSheet, ImageBackground, View, Text } from 'react-native';
import { ThemedText } from './components/ThemedText';
import { ThemedView } from './components/ThemedView';

export default function HomeScreen() {
  return (
    <ImageBackground
      source={require('./assets/images/bg.jpg')}
      resizeMode="cover"
      style={styles.image}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={{ textAlign: 'center', width: '100%' }}>
          Welcome to Demo!
        </ThemedText>
      </ThemedView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'transparent',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
