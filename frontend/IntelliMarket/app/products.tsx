import React from "react";
import {
	View,
	Text,
	FlatList,
	Image,
	TouchableOpacity,
	StyleSheet,
	Alert,
	Dimensions,
} from "react-native";
import { useRouter } from "expo-router";

type Product = {
	id: string;
	name: string;
	price: number;
	image?: string;
	description?: string;
	sector?: string; // novo campo: setor/localização do produto
};

export const TEST_PRODUCTS: Product[] = [
	{ id: "1", name: "Arroz Integral 1kg", price: 12.9, image: "https://via.placeholder.com/300", description: "Arroz integral nutritivo, embalagem 1kg.", sector: "Mercearia" },
	{ id: "2", name: "Feijão Preto 1kg", price: 8.5, image: "https://via.placeholder.com/300", description: "Feijão preto de qualidade, ideal para seu dia a dia.", sector: "Grãos" },
	{ id: "3", name: "Açúcar Refinado 1kg", price: 4.2, image: "https://via.placeholder.com/300", description: "Açúcar refinado para uso doméstico.", sector: "Açúcar & Doces" },
	{ id: "4", name: "Óleo de Soja 900ml", price: 6.75, image: "https://via.placeholder.com/300", description: "Óleo de soja puro, ideal para frituras e temperos.", sector: "Óleos" },
	{ id: "5", name: "Leite Integral 1L", price: 3.99, image: "https://via.placeholder.com/300", description: "Leite integral pasteurizado 1 litro.", sector: "Laticínios" },
];

export const options = {
	headerShown: false,
	header: () => null,
	title: "",
};

export default function Products() {
	const router = useRouter();
	const { width } = Dimensions.get("window");
	const imageSize = 84;

	const formatBRL = (value: number) =>
		new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

	const renderItem = ({ item }: { item: Product }) => (
		<TouchableOpacity
			activeOpacity={0.8}
			style={styles.itemContainer}
			onPress={() => router.push(`/product/${item.id}`)} // navega para detalhe
		>
			<View style={[styles.imageWrapper, { width: imageSize, height: imageSize }]}>
				{item.image ? (
					<Image source={{ uri: item.image }} style={styles.image} />
				) : (
					<View style={styles.placeholder}>
						<Text style={styles.placeholderText}>IMG</Text>
					</View>
				)}
			</View>

			<View style={[styles.infoWrapper, { maxWidth: width - imageSize - 72 }]}>
				<Text style={styles.productName} numberOfLines={2}>
					{item.name}
				</Text>

				<Text style={styles.productPrice}>{formatBRL(item.price)}</Text>
			</View>
		</TouchableOpacity>
	);

	return (
		<View style={[styles.container, { paddingBottom: 80 }]}>
			<Text style={styles.pageTitle}>Produtos</Text>

			{/* linha/divisor entre título e lista */}
			<View style={styles.divider} />

			<FlatList
				data={TEST_PRODUCTS}
				keyExtractor={(p) => p.id}
				renderItem={renderItem}
				contentContainerStyle={styles.listContent}
				ItemSeparatorComponent={() => <View style={styles.separator} />}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#fff", paddingTop: 8 },
	// título centralizado com mais espaçamento
	pageTitle: {
		fontSize: 20,
		fontWeight: "700",
		textAlign: "center",
		marginTop: 12,    // aumenta espaço acima
		marginBottom: 10, // aumenta espaço abaixo do título
	},
	// divisor mais grosso e com mais espaçamento
	divider: {
		height: 3,                 // mais grosso
		backgroundColor: "#eee",
		marginHorizontal: 16,
		marginBottom: 16,         // maior separação entre linha e lista
	},
	listContent: { paddingHorizontal: 16, paddingBottom: 24 },
	itemContainer: {
		flexDirection: "row",
		alignItems: "center",
		padding: 12,
		backgroundColor: "#fafafa",
		borderRadius: 10,
		elevation: 1,
	},
	imageWrapper: {
		borderRadius: 8,
		overflow: "hidden",
		backgroundColor: "#eee",
		justifyContent: "center",
		alignItems: "center",
		marginRight: 12,
	},
	image: {
		width: "100%",
		height: "100%",
		resizeMode: "cover",
	},
	placeholder: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#ddd",
		width: "100%",
		height: "100%",
	},
	placeholderText: {
		color: "#888",
		fontWeight: "700",
	},
	infoWrapper: {
		flex: 1,
		justifyContent: "center",
	},
	productName: {
		fontSize: 16,
		fontWeight: "700",
		color: "#222",
		marginBottom: 6,
	},
	productPrice: {
		fontSize: 14,
		fontWeight: "600",
		color: "#0a84ff",
	},
	separator: {
		height: 12,
	},
});
