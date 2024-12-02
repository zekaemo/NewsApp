import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
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
      {/* Kotak Contact Us */}
      <TouchableOpacity style={styles.contactBox} onPress={openContactLink}>
        <Text style={styles.contactText}>Contact Us</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flexGrow: 1, justifyContent: 'center' },
  title: { fontSize: 30, fontWeight: '900', textAlign: 'center', marginBottom: 20, marginRight: 100, marginLeft: 50},
  subtheme: { fontSize: 20, fontWeight: '700', textAlign: "left", marginBottom: 15,marginRight: 100, marginLeft: 50 },
  paragraph: { fontSize: 16, color: '#333', textAlign: 'justify', marginBottom: 15 ,marginRight: 100, marginLeft: 50},
  
  contactBox: {
    marginTop: 50,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 10,
    alignSelf: 'center',
    width: 150,
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
