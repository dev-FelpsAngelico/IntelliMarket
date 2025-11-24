import React, { useState } from "react";
import {
	Alert,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";

// Esconde o header (remover a "aba" superior com o título "Index")
export const options = {
	headerShown: false,
	header: () => null,
	title: "",
};

export default function Index() {
	const [login, setLogin] = useState("");
	const [senha, setSenha] = useState("");
	const router = useRouter();

	const handleLogin = () => {
		// temporário: não exige login/senha — navega direto para o scanner
		router.push("/scanner");
	};

	const handleRegister = () => {
		// navega para a tela de registro
		router.push("/register");
	};

	return (
		<View style={styles.container}>
			{/* espaço para logo */}
			<View style={styles.logoContainer}>
				<Text style={styles.logoText}>LOGO</Text>
			</View>

			<Text style={styles.title}>IntelliMarket</Text>

			<TextInput
				placeholder="E-mail ou usuário"
				value={login}
				onChangeText={setLogin}
				style={styles.input}
				autoCapitalize="none"
				keyboardType="email-address"
				placeholderTextColor="#999"
				accessibilityLabel="campo-login"
			/>

			<TextInput
				placeholder="Senha"
				value={senha}
				onChangeText={setSenha}
				style={styles.input}
				secureTextEntry
				placeholderTextColor="#999"
				accessibilityLabel="campo-senha"
			/>

			<TouchableOpacity style={styles.buttonPrimary} onPress={handleLogin} accessibilityRole="button">
				<Text style={styles.buttonText}>Entrar</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.buttonSecondary} onPress={handleRegister} accessibilityRole="button">
				<Text style={styles.buttonTextSecondary}>Registrar</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		justifyContent: "center",
	},
	title: {
		fontSize: 28,
		fontWeight: "700",
		textAlign: "center",
		marginBottom: 24,
	},
	input: {
		height: 48,
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 8,
		paddingHorizontal: 12,
		marginBottom: 12,
	},
	buttonPrimary: {
		height: 48,
		backgroundColor: "#0a84ff",
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 8,
	},
	buttonText: {
		color: "#fff",
		fontWeight: "600",
	},
	buttonSecondary: {
		height: 48,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 12,
		borderWidth: 1,
		borderColor: "#0a84ff",
		backgroundColor: "#fff",
	},
	buttonTextSecondary: {
		color: "#0a84ff",
		fontWeight: "600",
	},
	// novo: estilos da logo
	logoContainer: {
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 12,
		// altura reservada para logo (troque por <Image /> quando tiver o arquivo)
		height: 80,
	},
	logoText: {
		fontSize: 18,
		fontWeight: "700",
		color: "#0a84ff",
	},
});
