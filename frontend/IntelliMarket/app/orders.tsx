import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	ScrollView,
	SafeAreaView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

const formatBRL = (value: any) => {
	const numValue = Number(value);
	if (isNaN(numValue)) {
		return "R$ 0,00";
	}
	return new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).format(numValue);
};

export const options = {
	headerShown: false,
	header: () => null,
	title: "",
};

export default function ProductDetailScreen() {
	const router = useRouter();
	const params = useLocalSearchParams();

	const { name, price, image, description, sector } = params;

	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView contentContainerStyle={styles.scrollContainer}>
				<TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
					<Text style={styles.backButtonText}>Voltar</Text>
				</TouchableOpacity>

				{image ? (
					<Image source={{ uri: image as string }} style={styles.image} />
				) : (
					<View style={styles.placeholder}>
						<Text style={styles.placeholderText}>SEM IMAGEM</Text>
					</View>
				)}

				<View style={styles.infoContainer}>
					<Text style={styles.productName}>{name || "Produto sem nome"}</Text>

					{sector && <Text style={styles.productSector}>Setor: {sector}</Text>}

					<Text style={styles.productPrice}>{formatBRL(price)}</Text>

					<Text style={styles.descriptionTitle}>Descrição</Text>
					<Text style={styles.productDescription}>
						{description || "Nenhuma descrição disponível."}
					</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeArea: { flex: 1, backgroundColor: "#fff" },
	scrollContainer: { paddingBottom: 100 },
	backButton: {
		position: "absolute",
		top: 16,
		left: 16,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 20,
		zIndex: 10,
	},
	backButtonText: { color: "#fff", fontWeight: "700" },
	image: { width: "100%", height: 300, resizeMode: "cover" },
	placeholder: {
		width: "100%",
		height: 300,
		backgroundColor: "#eee",
		justifyContent: "center",
		alignItems: "center",
	},
	placeholderText: { color: "#999", fontWeight: "700" },
	infoContainer: { padding: 20 },
	productName: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
	productSector: { fontSize: 16, color: "#666", marginBottom: 12 },
	productPrice: { fontSize: 22, fontWeight: "700", color: "#0a84ff", marginBottom: 20 },
	descriptionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
	productDescription: { fontSize: 16, lineHeight: 24, color: "#333" },
});

