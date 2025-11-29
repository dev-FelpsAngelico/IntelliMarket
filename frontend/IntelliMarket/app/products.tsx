import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	FlatList,
	Image,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Product = {
	id: string;
	name: string;
	price: number;
	image?: string;
	description?: string;
	sector?: string; // novo campo: setor/localização do produto
};

const PRODUCTS_STORAGE_KEY = "@IntelliMarket:products";

export const options = {
	headerShown: false,
	header: () => null,
	title: "",
};

export default function Products() {
	const router = useRouter();
	const params = useLocalSearchParams();
	const { width } = Dimensions.get("window");
	const imageSize = 84;
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		const loadProducts = async () => {
			// Se novos produtos foram passados por parâmetro (ex: do scanner)
			if (params.products) {
				try {
					const parsedProducts = JSON.parse(params.products as string);
					const newProducts = parsedProducts.map((p: any) => ({
						id: p.id.toString(),
						name: p.nome,
						price: p.valor,
						image: p.imageUrl,
						description: p.descricao,
						sector: p.setor?.nome, // Adicionando o nome do setor
					}));

					// Salva no AsyncStorage e atualiza o estado
					await AsyncStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(newProducts));
					setProducts(newProducts);
				} catch (e) {
					console.error("Failed to parse or save products from params", e);
				}
			} else {
				// Se não há parâmetros, tenta carregar do AsyncStorage
				try {
					const storedProducts = await AsyncStorage.getItem(PRODUCTS_STORAGE_KEY);
					if (storedProducts) {
						setProducts(JSON.parse(storedProducts));
					}
				} catch (e) {
					console.error("Failed to load products from storage", e);
				}
			}
		};

		loadProducts();
	}, [params.products]);

	const formatBRL = (value: number) =>
		new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

	const renderItem = ({ item }: { item: Product }) => (
		<TouchableOpacity
			activeOpacity={0.8}
			style={styles.itemContainer}
			onPress={() =>
				router.push({
					pathname: "/orders",
					params: item as any,
				})
			} // navega para a tela de "pedidos" com os dados do produto
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
				data={products}
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
