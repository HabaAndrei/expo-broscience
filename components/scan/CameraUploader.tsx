import {
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { useRef, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Button } from 'tamagui';
import { X, RefreshCcw, Image as Img } from '@tamagui/lucide-icons'

export default function CameraUploader() {
  const [permission, requestPermission] = useCameraPermissions();
  const ref = useRef<CameraView>(null);
  const [uri, setUri] = useState<string | null>(null);
  const [facing, setFacing] = useState<CameraType>("back");
  const [isCamera, setIsCamera] = useState(false);

  const takePicture = async () => {
    const photo = await ref.current?.takePictureAsync();
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
  }

  const renderPicture = () => {
    return (
      <View>
        <Image
          source={{ uri }}
          contentFit="contain"
          style={{ width: 300, aspectRatio: 1 }}
        />
        <Button onPress={() => setUri(null)} title="Take another picture" />
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
        <View>
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
                  {
                    opacity: pressed ? 0.5 : 1,
                  },
                ]}
              >
                <View
                  style={[
                    styles.shutterBtnInner,
                    {
                      backgroundColor: "white",
                    },
                  ]}
                />
              </View>
            )}
          </Pressable>
          <Pressable onPress={toggleFacing}>
            <RefreshCcw size={32} color="white" />
          </Pressable>
        </View>
      </CameraView>
    )
  }

  const openCamera = () => {

    console.log(permission);

    if (!permission) {
      return null;
    }
    if (!permission.granted) {
      requestPermission();
    }
    setIsCamera(true);
  };

  return (
    <View style={styles.container}>
      <Button onPress={()=>openCamera()} >open camera</Button>
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
  },
});