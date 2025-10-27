import { Member, RootStackParamList } from "@/types/navigation";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRouter } from "expo-router";
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type DirectoryScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Directory"
>;

export default function HomeScreen() {
  const router = useRouter();
  const navigation = useNavigation<DirectoryScreenNavigationProp>();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  function capitalizeWords(str: string) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://nyc.cloud.appwrite.io/v1/storage/buckets/68f8f011001a9b3cb4b7/files/68f8f0210008faf4ed4d/view?project=68f8ec9400054fdf0c05&mode=admin");
        const json = await response.json();
        console.log("Fetched data:", json); //Temporary
        setMembers(json.members ?? json); //Temporary
        setMembers(json);
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: "center" }} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={members}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }: { item: Member }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push({ pathname: "/contact", params: { member: JSON.stringify(item) } })}
          >
            <Image source={{ uri: item.imageURL }} style={styles.avatar} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.firstName} {item.lastName}</Text>
              <Text style={styles.classification}>{capitalizeWords(item.classification)}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#952727ff",
    padding: 12,
    borderRadius: 10,
    marginVertical: 6,
    alignItems: "center",
    shadowColor: "#000000ff",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  classification: {
    fontSize: 14,
    color: "#f2ca00ff" },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff"
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  error: {
    color: "red",
    textAlign: "center"
  },
  name: {
    color: "white",
    fontSize: 18,
    fontWeight: "600"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
  },
  info: {
    flex: 1
  },
  item: {
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderColor: "#ccc"
  },
  relationship: {
    fontSize: 13,
    color: "#999"
  },
});