import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Dimensions, Modal, Platform } from "react-native";
// substitui uso de BarCodeScanner por CameraView + hooks
import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";

// Esconde o header
export const options = {
	headerShown: false,
	header: () => null,
	title: "",
};

export default function Scanner(props: { onQrScanned?: (data: any) => void } = {}) {
	const { onQrScanned } = props;
	// const [hasPermission, setHasPermission] = useState<boolean | null>(null);
	// const [scanned, setScanned] = useState<boolean>(true);
	const [permission, requestPermission] = useCameraPermissions();
	const [modalVisible, setModalVisible] = useState(false);
	const [scanned, setScanned] = useState(false);
	const [lastScanned, setLastScanned] = useState<string | null>(null);
	const [facing, setFacing] = useState<"back" | "front">("back");
	const router = useRouter();

	// quando modal abrir, desbloqueia rotação; quando fechar, volta para portrait
	useEffect(() => {
		const applyOrientation = async () => {
			if (modalVisible) {
				setScanned(false);
				if (Platform.OS !== "web") {
					try {
						const ScreenOrientation = await import("expo-screen-orientation");
						await ScreenOrientation.unlockAsync();
					} catch {
						/* ignore if module missing at runtime */
					}
				}
			} else {
				if (Platform.OS !== "web") {
					try {
						const ScreenOrientation = await import("expo-screen-orientation");
						await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
					} catch {
						/* ignore */
					}
				}
			}
		};
		applyOrientation();
	}, [modalVisible]);

	useEffect(() => {
		return () => {
			(async () => {
				if (Platform.OS !== "web") {
					try {
						const ScreenOrientation = await import("expo-screen-orientation");
						await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
					} catch {
						/* ignore */
					}
				}
			})();
		};
	}, []);

	const handleBarCodeScanned = async ({ type, data }: { type: string; data: string }) => {
		if (scanned) return;
		setScanned(true);
		setLastScanned(data);

		// tenta consultar o backend para obter produtos do setor (por id ou código)
		try {
			const base = "http://localhost:8080";
			const resp = await fetch(`${base}/api/setores/qrcode/${encodeURIComponent(data)}`, {
				method: "GET",
				headers: { Accept: "application/json" },
			});

			if (resp.ok) {
				const produtos = await resp.json();
				router.push({ pathname: "/products", params: { products: JSON.stringify(produtos) } });
			} else if (resp.status === 404) {
				onQrScanned && onQrScanned(null);
				Alert.alert("Não encontrado", "Nenhum setor/produto correspondente ao QR.");
			} else {
				const text = await resp.text();
				onQrScanned && onQrScanned(null);
				Alert.alert("Erro", `Resposta inesperada: ${resp.status}\n${text}`);
			}
		} catch (err: any) {
			onQrScanned && onQrScanned(null);
			Alert.alert("Erro", `Falha ao buscar produtos: ${err?.message ?? String(err)}`);
		} finally {
			setModalVisible(false);
		}
	};

	// mostra estado de permissão se ainda não resolvido
	if (!permission) {
		return (
			<View style={styles.center}>
				<Text>Verificando permissão da câmera...</Text>
			</View>
		);
	}
	if (!permission.granted) {
		return (
			<View style={styles.center}>
				<Text>Sem permissão para câmera. Toque para permitir.</Text>
				<TouchableOpacity
					style={{ marginTop: 12 }}
					onPress={async () => {
						const res = await requestPermission();
						if (!res.granted) Alert.alert("Permissão negada", "Habilite a câmera nas configurações.");
					}}
				>
					<Text style={{ color: "#0a84ff" }}>Permitir câmera</Text>
				</TouchableOpacity>
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
				{lastScanned ? <Text style={{ marginTop: 6, color: "#666" }}>Último QR: {lastScanned}</Text> : null}
			</View>

			{/* scanner quadrado tocável */}
			<View style={styles.scannerWrapper}>
				<TouchableOpacity activeOpacity={0.9} onPress={() => setModalVisible(true)}>
					<View style={[styles.scannerBox, { width: boxSize, height: boxSize }]}>
						{/* preview estático enquanto modal não aberto */}
						<View style={StyleSheet.absoluteFillObject} />
						<View style={styles.overlay}>
							<Text style={styles.overlayText}>Toque para abrir o scanner</Text>
						</View>
					</View>
				</TouchableOpacity>
			</View>

			{/* Modal com CameraView */}
			<Modal visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
				<View style={styles.modalRoot}>
					<TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
						<Ionicons name="close" size={28} color="#fff" />
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.cameraButton}
						onPress={() => setFacing((f) => (f === "back" ? "front" : "back"))}
					>
						<Ionicons name="camera-reverse" size={28} color="#fff" />
					</TouchableOpacity>

					{/* escanear somente QR codes */}
					<CameraView
						style={styles.cameraView}
						facing={facing}
						barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
						onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
					/>

					<View style={styles.modalOverlayCenter}>
						<View style={styles.scanArea} />
						<Text style={styles.instructionText}>Posicione o código dentro da área</Text>
					</View>
				</View>
			</Modal>
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

	modalRoot: { flex: 1, backgroundColor: "#000" },
	cameraView: { flex: 1 },
	modalOverlayCenter: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, justifyContent: "center", alignItems: "center" },
	scanArea: { width: "70%", aspectRatio: 1, borderColor: "#fff", borderWidth: 2, borderRadius: 12 },
	instructionText: { color: "#fff", marginTop: 16, backgroundColor: "rgba(0,0,0,0.6)", padding: 8, borderRadius: 8 },
	closeButton: { position: "absolute", top: 40, right: 20, zIndex: 20 },
	cameraButton: { position: "absolute", top: 40, left: 20, zIndex: 20 },
});
