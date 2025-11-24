import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export const options = {
	headerShown: false,
	header: () => null,
	title: "",
};

export default function Register() {
	const [nome, setNome] = useState("");
	const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");
	const [confirmaSenha, setConfirmaSenha] = useState("");
	const router = useRouter();

	const handleSubmit = () => {
		if (!nome.trim() || !email.trim() || !senha || !confirmaSenha) {
			Alert.alert("Atenção", "Preencha todos os campos.");
			return;
		}
		if (senha.length < 6) {
			Alert.alert("Atenção", "A senha deve ter pelo menos 6 caracteres.");
			return;
		}
		if (senha !== confirmaSenha) {
			Alert.alert("Atenção", "A confirmação da senha não corresponde.");
			return;
		}

		Alert.alert("Registrado", `Nome: ${nome}\nEmail: ${email}`);
	};

	return (
		<View style={styles.container}>
			{/* espaço para logo */}
			<View style={styles.logoContainer}>
				<Text style={styles.logoText}>LOGO</Text>
			</View>

			<Text style={styles.title}>Criar Conta</Text>

			<TextInput
				placeholder="Nome"
				value={nome}
				onChangeText={setNome}
				style={styles.input}
				placeholderTextColor="#999"
			/>

			<TextInput
				placeholder="E-mail"
				value={email}
				onChangeText={setEmail}
				style={styles.input}
				autoCapitalize="none"
				keyboardType="email-address"
				placeholderTextColor="#999"
			/>

			<TextInput
				placeholder="Senha"
				value={senha}
				onChangeText={setSenha}
				style={styles.input}
				secureTextEntry
				placeholderTextColor="#999"
			/>

			<TextInput
				placeholder="Confirmar senha"
				value={confirmaSenha}
				onChangeText={setConfirmaSenha}
				style={styles.input}
				secureTextEntry
				placeholderTextColor="#999"
			/>

			<TouchableOpacity style={styles.buttonPrimary} onPress={handleSubmit} accessibilityRole="button">
				<Text style={styles.buttonText}>Registrar</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.buttonSecondary} onPress={() => router.back()} accessibilityRole="button">
				<Text style={styles.buttonTextSecondary}>Voltar</Text>
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
		fontSize: 24,
		fontWeight: "700",
		textAlign: "center",
		marginBottom: 20,
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
	// novo: estilos da logo (mesmos do index)
	logoContainer: {
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 12,
		height: 80,
	},
	logoText: {
		fontSize: 18,
		fontWeight: "700",
		color: "#0a84ff",
	},
});
