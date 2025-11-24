import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { Slot, useRouter, useSegments } from "expo-router";

// Layout com abas no rodapé; abas ocultas nas rotas de autenticação (index, register)
export default function Layout() {
	const router = useRouter();
	const segments = useSegments();
	const current = segments.length > 0 ? segments[0] : "index";

	// rotas onde não queremos mostrar as abas
	const hideTabsFor = ["index", "register"];
	const showTabs = !hideTabsFor.includes(current);

	const go = (path: string) => {
		router.push(path);
	};

	return (
		<SafeAreaView style={styles.container}>
			{/* Conteúdo da rota */}
			<View style={styles.content}>
				<Slot />
			</View>

			{/* Abas inferiores — só aparecem quando showTabs === true */}
			{showTabs && (
				<View style={styles.bottomBar}>
					<TouchableOpacity
						style={[styles.tabButton, current === "products" && styles.tabActive]}
						onPress={() => go("/products")}
					>
						<Text style={[styles.tabText, current === "products" && styles.tabTextActive]}>Produtos</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.tabButton, current === "scanner" && styles.tabActive]}
						onPress={() => go("/scanner")}
					>
						<Text style={[styles.tabText, current === "scanner" && styles.tabTextActive]}>Scanner</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.tabButton, current === "profile" && styles.tabActive]}
						onPress={() => go("/profile")}
					>
						<Text style={[styles.tabText, current === "profile" && styles.tabTextActive]}>Perfil</Text>
					</TouchableOpacity>
				</View>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#fff" },
	content: { flex: 1 },
	bottomBar: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		height: 64,
		borderTopWidth: 1,
		borderTopColor: "#eee",
		backgroundColor: "#fafafa",
	},
	tabButton: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 8,
	},
	tabActive: {
		backgroundColor: "#0a84ff",
		borderRadius: 10,
		marginHorizontal: 8,
	},
	tabText: {
		color: "#666",
		fontWeight: "600",
	},
	tabTextActive: {
		color: "#fff",
	},
});
