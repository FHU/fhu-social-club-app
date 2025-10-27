import { RootStackParamList } from "@/types/navigation";
import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

type ProfileRouteProp = RouteProp<RootStackParamList, "Profile">;

export default function ProfileScreen() {
  const route = useRoute<ProfileRouteProp>();
  const { member } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: member.imageURL }} style={styles.avatar} />
      <Text style={styles.name}>{member.firstName} {member.lastName}</Text>
      <Text style={styles.classification}>{member.classification}</Text>
      <Text style={styles.relationship}>{member.relationshipStatus}</Text>

      <View style={styles.details}>
        <Text style={styles.sectionTitle}>Contact Info</Text>
        <Text>Email: {member.email}</Text>
        <Text>Phone: {member.phone}</Text>

        <Text style={styles.sectionTitle}>About</Text>
        <Text>Placeholder</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff"
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginVertical: 20
    },
    name: {
        fontSize: 24,
        fontWeight: "700"
    },
    classification: {
        fontSize: 16,
        color: "#555"
    },
    relationship: {
        fontSize: 15,
        color: "#777",
        marginBottom: 20
    },
    details: {
        width: "100%",
        marginTop: 10
    },
    sectionTitle: {
        fontWeight: "bold",
        marginTop: 15,
        marginBottom: 5,
        fontSize: 16
    }
});