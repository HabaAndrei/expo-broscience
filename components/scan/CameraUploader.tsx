import {
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { useRef, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Button } from 'tamagui';
import { X, RefreshCcw, Image as Img } from '@tamagui/lucide-icons';

export default function CameraUploader() {
  const [permission, requestPermission] = useCameraPermissions();
  const ref = useRef<CameraView>(null);
  const [uri, setUri] = useState<string | null>(null);
  const [facing, setFacing] = useState<CameraType>("back");
  const [isCamera, setIsCamera] = useState(false);

  const takePicture = async () => {
    const photo: any = await ref.current?.takePictureAsync();
    setUri(photo?.uri);
  };

  const uploadImages = () => {
    console.log("get images from device!!");
  };

  const toggleFacing = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  const closeCamera = () => {
    setIsCamera(false);
  };

  const renderPicture = () => {
    return (
      <View style={styles.imagePreviewContainer}>
        <Image
          source={{ uri }}
          contentFit="contain"
          style={styles.imagePreview}
        />
        <Button
          icon={X}
          onPress={() => setUri(null)}
          size="$4"
          theme="active"
          marginTop="$4"
        >
          Take another picture
        </Button>
      </View>
    );
  };

  const renderCamera = () => {
    return (
      <CameraView
        style={styles.camera}
        ref={ref}
        mode="picture"
        facing={facing}
        mute={false}
        responsiveOrientationWhenOrientationLocked
      >
        <View style={styles.topControls}>
          <Pressable onPress={closeCamera}>
            <X size={32} color="white" />
          </Pressable>
        </View>

        <View style={styles.shutterContainer}>
          <Pressable onPress={uploadImages}>
            <Img size={32} color="white" />
          </Pressable>

          <Pressable onPress={takePicture}>
            {({ pressed }) => (
              <View
                style={[
                  styles.shutterBtn,
                  { opacity: pressed ? 0.5 : 1 },
                ]}
              >
                <View style={styles.shutterBtnInner} />
              </View>
            )}
          </Pressable>

          <Pressable onPress={toggleFacing}>
            <RefreshCcw size={32} color="white" />
          </Pressable>
        </View>
      </CameraView>
    );
  };

  const openCamera = () => {
    if (!permission) return;
    if (!permission.granted) {
      requestPermission();
    }
    setIsCamera(true);
  };

  return (
    <View style={styles.container}>
      <Button onPress={openCamera}>Open Camera</Button>
      {uri ? renderPicture() : null}
      {isCamera ? renderCamera() : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  topControls: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
  },
  shutterContainer: {
    position: "absolute",
    bottom: 44,
    left: 0,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  shutterBtn: {
    backgroundColor: "transparent",
    borderWidth: 5,
    borderColor: "white",
    width: 85,
    height: 85,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  shutterBtnInner: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: "white",
  },
  imagePreviewContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  imagePreview: {
    width: 300,
    height: 300,
    borderRadius: 12,
  },
});