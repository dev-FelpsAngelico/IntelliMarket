import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
// importa dados de teste
import { TEST_PRODUCTS } from "../products";

export const options = {
	headerShown: false,
	header: () => null,
	title: "",
};

export default function ProductDetail() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const router = useRouter();

	const product = TEST_PRODUCTS.find((p) => p.id === id);

	if (!product) {
		return (
			<View style={styles.center}>
				<Text>Produto não encontrado.</Text>
				<TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
					<Text style={styles.backButtonText}>Voltar</Text>
				</TouchableOpacity>
			</View>
		);
	}

	const { width } = Dimensions.get("window");
	const imageSize = Math.min(width * 0.9, 420);

	const formatBRL = (value: number) =>
		new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<TouchableOpacity style={styles.backButtonTop} onPress={() => router.back()}>
				<Text style={styles.backButtonText}>Voltar</Text>
			</TouchableOpacity>

			<Image source={{ uri: product.image }} style={[styles.image, { width: imageSize, height: imageSize }]} />

			<Text style={styles.name}>{product.name}</Text>
			<Text style={styles.price}>{formatBRL(product.price)}</Text>

			{/* novo: mostra o setor/localização do produto */}
			<Text style={styles.sectorLabel}>Setor</Text>
			<Text style={styles.sector}>{product.sector ?? "Não informado"}</Text>

			<Text style={styles.descriptionTitle}>Descrição</Text>
			<Text style={styles.description}>{product.description ?? "Sem descrição disponível."}</Text>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		paddingTop: 24,
		paddingHorizontal: 16,
		paddingBottom: 120, // evita sobreposição com abas
		backgroundColor: "#fff",
	},
	image: {
		borderRadius: 12,
		backgroundColor: "#eee",
		marginBottom: 16,
		resizeMode: "cover",
	},
	name: {
		fontSize: 20,
		fontWeight: "700",
		textAlign: "center",
		marginBottom: 8,
	},
	price: {
		fontSize: 18,
		fontWeight: "700",
		color: "#0a84ff",
		marginBottom: 12,
	},
	sectorLabel: {
		fontSize: 14,
		fontWeight: "700",
		alignSelf: "flex-start",
		color: "#666",
		marginTop: 8,
	},
	sector: {
		fontSize: 15,
		color: "#333",
		alignSelf: "flex-start",
		marginBottom: 12,
	},
	descriptionTitle: {
		fontSize: 16,
		fontWeight: "700",
		alignSelf: "flex-start",
		marginBottom: 8,
	},
	description: {
		fontSize: 14,
		color: "#333",
		alignSelf: "flex-start",
		lineHeight: 20,
	},
	backButtonTop: {
		alignSelf: "flex-start",
		marginLeft: 8,
		marginBottom: 12,
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#0a84ff",
	},
	backButtonText: {
		color: "#0a84ff",
		fontWeight: "700",
	},
	backButton: {
		marginTop: 12,
		paddingHorizontal: 16,
		paddingVertical: 10,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#0a84ff",
	},
	center: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 24,
	},
});
