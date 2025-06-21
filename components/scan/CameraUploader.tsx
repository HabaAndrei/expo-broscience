import {
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { useRef, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Button } from 'tamagui';
import { X, RefreshCcw, Image as Img } from '@tamagui/lucide-icons';
import * as ImagePicker from 'expo-image-picker';

export default function CameraUploader(props: any) {
  const [permission, requestPermission] = useCameraPermissions();
  const ref = useRef<CameraView>(null);
  const [facing, setFacing] = useState<CameraType>("back");
  const [isCamera, setIsCamera] = useState<boolean>(false);

  const pickImage = async () => {
    if (isCamera) setIsCamera(false);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      props.setUri(result.assets[0].uri);
    }
  };

  const takePicture = async () => {
    const photo: any = await ref.current?.takePictureAsync();
    props.setUri(photo?.uri);
    setIsCamera(false);
  };

  const toggleFacing = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  const closeCamera = () => {
    setIsCamera(false);
  };


  const renderCamera = () => {
    return (
      <View style={styles.cameraOverlay}>
        <CameraView
          style={StyleSheet.absoluteFill}
          ref={ref}
          mode="picture"
          facing={facing}
          mute={false}
          responsiveOrientationWhenOrientationLocked
        />

        {/* CONTROALE PESTE CAMERA */}
        <View style={styles.topControls}>
          <Pressable onPress={closeCamera}>
            <X size={32} color="white" />
          </Pressable>
        </View>

        <View style={styles.shutterContainer}>
          <Pressable onPress={pickImage}>
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
      </View>
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
      <View>
        <Button onPress={openCamera}>Open Camera</Button>
        <Button onPress={pickImage}>Upload image</Button>
      </View>
      {isCamera ? renderCamera() : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    width: "100%",
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
  cameraOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
    elevation: 999,
  },
  topControls: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1000,
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
    zIndex: 1000,
  },
});