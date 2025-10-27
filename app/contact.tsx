import { RootStackParamList } from "@/types/navigation";
import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import { Image, Linking, ScrollView, StyleSheet, Text, View } from "react-native";

type ProfileRouteProp = RouteProp<RootStackParamList, "Profile">;

export default function ProfileScreen() {
  const route = useRoute<ProfileRouteProp>();
  const { member } = route.params;
  const parsedMember: Member = JSON.parse(member);

  function capitalizeWords(str: string) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
  }
  function handleEmailPress(email: string) {
    Linking.openURL(`mailto:${email}`);
  }
  function handlePhonePress(phone: string) {
    Linking.openURL(`tel:${phone}`);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* Avatar */}
      <Image source={{ uri: parsedMember.imageURL }} style={styles.avatar} />

      {/* Name */}
      <Text style={styles.name}>{parsedMember.firstName} {parsedMember.lastName}</Text>

      {/* Officer */}
      {parsedMember.officer && (<Text style={styles.officer}>{parsedMember.officer}</Text>)}

      {/* Classification */}
      <Text style={styles.classification}>{capitalizeWords(parsedMember.classification)}</Text>

      {/* Relationship */}
      <Text style={styles.relationship}>Relationship Status: {capitalizeWords(parsedMember.relationshipStatus)}</Text>

      <View style={styles.infoText}>
        {/* Email */}
        {parsedMember.showEmail && parsedMember.email && (
          <Text style={styles.infoText} onPress={() => handleEmailPress(parsedMember.email!)}>Email: {parsedMember.email}</Text>)}

        {/* Phone */}
        {parsedMember.showPhone && parsedMember.phone && (
          <Text style={styles.infoText} onPress={() => handlePhonePress(parsedMember.phone!)}>Phone: {parsedMember.phone}</Text>)}

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    avatar: {
      width: "100%",
      height: 300,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
    classification: {
      fontSize: 18,
      color: "#555",
      marginTop: 10,
      textAlign: "center",
    },
    container: {
      alignItems: "center",
      padding: 20,
      backgroundColor: "#f9f9f9",
      paddingBottom: 40,
    },
    details: {
      width: "100%",
      alignItems: "flex-start",
      marginTop: 12,
      paddingHorizontal: 10,
    },
    infoText: {
      fontSize: 16,
      marginBottom: 8,
      color: "#1E90FF",
      textDecorationLine: "underline",
    },
    officer: {
      fontSize: 16,
      fontWeight: "600",
      textAlign: "center",
      color: "#fff",
      backgroundColor: "#1E90FF",
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 12,
      overflow: "hidden",
      marginTop: 6,
    },
    name: {
      fontSize: 34,
      fontWeight: "bold",
      textAlign: "center",
      marginTop: 20,
      color: "#222",
    },
    relationship: {
      fontSize: 16,
      color: "#777",
      marginBottom: 20,
      textAlign: "center",
    },
    sectionTitle: {
      fontWeight: "bold",
      marginTop: 15,
      marginBottom: 5,
      fontSize: 16
    }
});