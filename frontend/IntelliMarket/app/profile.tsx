import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, BackHandler, Platform } from "react-native";
import { useRouter } from "expo-router";

export const options = {
	headerShown: false,
	header: () => null,
	title: "",
};

export default function Profile() {
	const router = useRouter();
	const [name] = useState("Usuário Teste");
	const [avatarUri, setAvatarUri] = useState<string | null>("https://via.placeholder.com/150/0a84ff/ffffff?text=Perfil");

	const handleAvatarPress = () => {
		Alert.alert(
			"Foto de perfil",
			"O que deseja fazer com a foto de perfil?",
			[
				{
					text: "Selecionar foto (exemplo)",
					onPress: () => setAvatarUri("https://via.placeholder.com/150/ff6b6b/ffffff?text=Nova"),
				},
				{
					text: "Remover foto",
					onPress: () => setAvatarUri(null),
					style: "destructive",
				},
				{ text: "Cancelar", style: "cancel" },
			],
			{ cancelable: true }
		);
	};

	const handleLogout = () => {
		// Replace route to login
		router.replace("/");
		if (Platform.OS === "android") {
			setTimeout(() => BackHandler.exitApp(), 300);
		} else {
			Alert.alert("Logout", "Você foi deslogado.");
		}
	};

	const menuOptions = [
		{ key: "edit", label: "Editar perfil", onPress: () => Alert.alert("Editar perfil", "Funcionalidade em desenvolvimento.") },
		{ key: "orders", label: "Histórico de compras", onPress: () => router.push("/orders") },
		{ key: "favorites", label: "Favoritos", onPress: () => Alert.alert("Favoritos", "Funcionalidade em desenvolvimento.") },
		{ key: "settings", label: "Configurações", onPress: () => Alert.alert("Configurações", "Funcionalidade em desenvolvimento.") },
		{ key: "logout", label: "Sair", onPress: handleLogout },
	];

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.avatarWrapper} activeOpacity={0.8} onPress={handleAvatarPress}>
				{avatarUri ? (
					<Image source={{ uri: avatarUri }} style={styles.avatar} />
				) : (
					<View style={[styles.avatar, styles.avatarPlaceholder]}>
						<Text style={styles.avatarPlaceholderText}>Sem foto</Text>
					</View>
				)}
			</TouchableOpacity>

			<Text style={styles.name}>{name}</Text>

			<View style={styles.menu}>
				{menuOptions.map((opt) => (
					<TouchableOpacity key={opt.key} style={styles.menuItem} onPress={opt.onPress}>
						<Text style={styles.menuText}>{opt.label}</Text>
					</TouchableOpacity>
				))}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		alignItems: "center",
		backgroundColor: "#fff",
		paddingBottom: 80,
	},
	avatarWrapper: {
		width: 120,
		height: 120,
		borderRadius: 60,
		overflow: "hidden",
		marginTop: 24,
		marginBottom: 12,
		borderWidth: 2,
		borderColor: "#0a84ff",
	},
	avatar: { width: "100%", height: "100%", resizeMode: "cover" },
	avatarPlaceholder: { justifyContent: "center", alignItems: "center", backgroundColor: "#f0f0f0" },
	avatarPlaceholderText: { color: "#888", fontWeight: "600" },
	name: { fontSize: 20, fontWeight: "700", marginBottom: 20 },
	menu: { width: "100%", marginTop: 8 },
	menuItem: {
		width: "100%",
		paddingVertical: 14,
		paddingHorizontal: 16,
		borderRadius: 8,
		backgroundColor: "#fafafa",
		marginBottom: 10,
		borderWidth: 1,
		borderColor: "#eee",
	},
	menuText: { fontSize: 16, fontWeight: "600", color: "#222" },
});
