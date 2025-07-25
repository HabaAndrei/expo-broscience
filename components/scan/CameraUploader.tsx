import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { Modal, Pressable, StyleSheet, View, } from "react-native";
import { X, RefreshCcw, Image as Img, Camera, NotebookPen} from '@tamagui/lucide-icons';
import * as ImagePicker from 'expo-image-picker';
import GroupButtons from '@/components/Buttons/GroupButtons';

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

  const openCamera = async () => {
    if (!permission) return;
    if (!permission.granted) {
      const newPermission = await requestPermission();
      if (!newPermission.granted) return;
    }
    setIsCamera(true);
  };

  const renderCamera = () => {
    return (
      <View style={styles.cameraOverlay}>
        <CameraView
          ref={ref}
          mode="picture"
          facing={facing}
          mute={false}
          style={{ flex: 1 }}
        />

        {/* close button up right */}
        <View style={styles.topControls}>
          <Pressable onPress={closeCamera}>
            <X size={32} color="white" />
          </Pressable>
        </View>

        {/* Down controlls  */}
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

  return (
    <View style={styles.container}>

      <View style={{alignSelf: 'center'}} >
        <GroupButtons
          buttons={[
            {name: 'Take photo', icon: <Camera/>, func: openCamera},
            {name: 'Upload', icon: <Img/>, func: pickImage},
            {name: 'Tutorial', icon: <NotebookPen/>, func: ()=>console.log('tutorial!!')}
          ]}
        />
      </View>

      <Modal visible={isCamera} animationType="slide" presentationStyle="fullScreen">
        {renderCamera()}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
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
    flex: 1,
    backgroundColor: "black",
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