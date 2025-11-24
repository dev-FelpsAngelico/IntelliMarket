import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";

type Order = {
	id: string;
	date: string;
	total: number;
	items: { name: string; qty: number; price: number }[];
};

const TEST_ORDERS: Order[] = [
	{
		id: "ORD-1001",
		date: "2025-05-12",
		total: 89.4,
		items: [
			{ name: "Arroz Integral 1kg", qty: 2, price: 12.9 },
			{ name: "Óleo de Soja 900ml", qty: 1, price: 6.75 },
			{ name: "Leite Integral 1L", qty: 3, price: 3.99 },
		],
	},
	{
		id: "ORD-1002",
		date: "2025-06-01",
		total: 27.6,
		items: [
			{ name: "Açúcar Refinado 1kg", qty: 2, price: 4.2 },
			{ name: "Feijão Preto 1kg", qty: 1, price: 8.5 },
		],
	},
];

const formatBRL = (value: number) =>
	new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

export const options = {
	headerShown: false,
	header: () => null,
	title: "",
};

export default function Orders() {
	const router = useRouter();

	const renderOrder = ({ item }: { item: Order }) => (
		<TouchableOpacity
			style={styles.orderCard}
			onPress={() =>
				Alert.alert(
					`Pedido ${item.id}`,
					`${item.date}\nTotal: ${formatBRL(item.total)}\n\nItens:\n${item.items
						.map((it) => `• ${it.name} x${it.qty} (${formatBRL(it.price)})`)
						.join("\n")}`
				)
			}
		>
			<View style={styles.orderHeader}>
				<Text style={styles.orderId}>{item.id}</Text>
				<Text style={styles.orderTotal}>{formatBRL(item.total)}</Text>
			</View>
			<Text style={styles.orderDate}>{item.date}</Text>
		</TouchableOpacity>
	);

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.backButtonTop} onPress={() => router.back()}>
				<Text style={styles.backButtonText}>Voltar</Text>
			</TouchableOpacity>

			<Text style={styles.title}>Histórico de compras</Text>

			<FlatList data={TEST_ORDERS} keyExtractor={(o) => o.id} renderItem={renderOrder} contentContainerStyle={styles.list} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16, backgroundColor: "#fff", paddingBottom: 100 },
	title: { fontSize: 20, fontWeight: "700", marginBottom: 12, textAlign: "center" },
	list: { paddingBottom: 24 },
	orderCard: { padding: 12, backgroundColor: "#fafafa", borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: "#eee" },
	orderHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
	orderId: { fontSize: 14, fontWeight: "700" },
	orderTotal: { fontSize: 14, fontWeight: "700", color: "#0a84ff" },
	orderDate: { color: "#666" },
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
	backButtonText: { color: "#0a84ff", fontWeight: "700" },
});

