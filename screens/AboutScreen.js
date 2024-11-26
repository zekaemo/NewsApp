import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Dimensions } from 'react-native';

const { width } = Dimensions.get('window'); // Get window width for responsiveness

const AboutScreen = () => {
  const openContactLink = () => {
    Linking.openURL('https://github.com/zekaemo'); 
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>About Us</Text>
      
      <Text style={styles.subtheme}>
        Welcome to Our News App!
      </Text>
      <Text style={styles.paragraph}>
        At NewsApp, we believe that staying informed should be effortless and enjoyable. Our mission is to provide you with the latest, most relevant news and videos, tailored to your interests, all in one place. From breaking headlines to in-depth analyses, we bring the world’s stories to your fingertips.
      </Text>

      <Text style={styles.subtheme}>
        Our Purpose!
      </Text>
      <Text style={styles.paragraph}>
        We understand that the world moves fast, and so does the news. Our app was created to help you keep up with what matters most, without the hassle. By curating top stories from reliable sources, we ensure that you’re always in the loop with the information you need.
      </Text>

      <Text style={styles.subtheme}>
        Thank You for Choosing NewsApp!
      </Text>

      {/* Contact Us Box */}
      <TouchableOpacity style={styles.contactBox} onPress={openContactLink}>
        <Text style={styles.contactText}>Contact Us</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flexGrow: 1, justifyContent: 'center' },
  title: { fontSize: width * 0.08, fontWeight: '900', textAlign: 'center', marginBottom: 20 },
  subtheme: { fontSize: width * 0.06, fontWeight: '700', textAlign: "left", marginBottom: 15 },
  paragraph: { fontSize: width * 0.04, color: '#333', textAlign: 'justify', marginBottom: 15 },
  
  contactBox: {
    marginTop: 50,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 10,
    alignSelf: 'center',
    width: width * 0.6, // Makes the button width responsive
    height: 50,
  },
  contactText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: "center"
  },
});

export default AboutScreen;
