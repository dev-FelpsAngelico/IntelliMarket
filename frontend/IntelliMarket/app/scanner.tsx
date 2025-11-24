import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useRouter } from 'expo-router';

// Esconde o header
export const options = {
	headerShown: false,
	header: () => null,
	title: "",
};

export default function Scanner() {
	const router = useRouter();
	const [hasPermission, setHasPermission] = useState<boolean | null>(null);
	const [scanned, setScanned] = useState<boolean>(true);
	const [loading, setLoading] = useState<boolean>(false);
	const [message, setMessage] = useState<string | null>(null);

	// Ajuste para seu host durante desenvolvimento
	const API_BASE = 'http://10.0.2.2:8080';

	useEffect(() => {
		(async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === "granted");
		})();
	}, []);

	const handleBarCodeScanned = async ({ type, data }: { type: string; data: string }) => {
		if (scanned) return;
		setScanned(true);
		setLoading(true);
		setMessage(null);

		try {
			const resp = await fetch(`${API_BASE}/produtos/scan`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ data }),
			});

			if (resp.ok) {
				const produto = await resp.json();
				if (produto && produto.id) {
					router.push(`/product/${String(produto.id)}`);
					return;
				}
				setMessage('Resposta inesperada do servidor.');
			} else if (resp.status === 404) {
				setMessage('Produto não encontrado para esse código.');
			} else {
				const txt = await resp.text();
				setMessage(`Erro ao consultar o produto: ${txt}`);
			}
		} catch (err) {
			setMessage('Erro de rede ao buscar produto.');
		} finally {
			setLoading(false);
		}
	};

	if (hasPermission === null) {
		return (
			<View style={styles.center}>
				<Text>Solicitando permissão para usar a câmera...</Text>
			</View>
		);
	}
	if (hasPermission === false) {
		return (
			<View style={styles.center}>
				<Text>Sem permissão para câmera. Habilite nas configurações.</Text>
			</View>
		);
	}

	const { width } = Dimensions.get("window");
	const boxSize = Math.min(width * 0.9, 360); // quadrado responsivo

	return (
		<View style={[styles.container, { paddingBottom: 80 }]}>
			{/* espaço para logo */}
			<View style={styles.logoContainer}>
				<Text style={styles.logoText}>LOGO</Text>
			</View>

			{/* título */}
			<View style={styles.header}>
				<Text style={styles.appTitle}>IntelliMarket</Text>
			</View>

			{/* scanner quadrado tocável */}
			<View style={styles.scannerWrapper}>
				<TouchableOpacity activeOpacity={0.9} onPress={() => { setScanned(false); setMessage(null); }}>
					<View style={[styles.scannerBox, { width: boxSize, height: boxSize }]}>
						<BarCodeScanner
							onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
							style={StyleSheet.absoluteFillObject}
						/>
						{scanned && (
							<View style={styles.overlay}>
								{loading ? (
									<ActivityIndicator size="large" color="#fff" />
								) : (
									<Text style={styles.overlayText}>Toque para ativar o scanner</Text>
								)}
								{message && (
									<View style={{ position: 'absolute', bottom: 24, backgroundColor: 'rgba(0,0,0,0.6)', padding: 8, borderRadius: 6 }}>
										<Text style={{ color: '#fff' }}>{message}</Text>
									</View>
								)}
							</View>
						)}
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#fff" },
	logoContainer: { alignItems: "center", justifyContent: "center", marginTop: 20, marginBottom: 8, height: 80 },
	logoText: { fontSize: 18, fontWeight: "700", color: "#0a84ff" },
	header: { paddingTop: 8, paddingBottom: 8, alignItems: "center" },
	appTitle: { fontSize: 20, fontWeight: "700" },
	scannerWrapper: { flex: 1, justifyContent: "center", alignItems: "center" },
	scannerBox: { borderRadius: 12, overflow: "hidden", backgroundColor: "#000" },
	overlay: { ...StyleSheet.absoluteFillObject, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.35)" },
	overlayText: { color: "#fff", fontSize: 16, fontWeight: "600" },
	center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
});
