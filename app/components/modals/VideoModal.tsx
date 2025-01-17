import React, { useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import YouTube from 'react-native-youtube-iframe';
import ModalWrapper from './Modal';
import AntDesign from '@expo/vector-icons/AntDesign';
import { opacity } from 'react-native-reanimated/lib/typescript/Colors';
interface IVideoModalProps{
    showModal:boolean;
    onClose:()=>void;
    videoId:string
}
const VideoModal = ({ showModal, onClose, videoId }:IVideoModalProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [playing, setPlaying] = useState(false);

 
  const handleVideoReady = () => {
    setIsLoading(false);
  };

  return (
    <ModalWrapper showModal={showModal} onClose={onClose} contentClassName='pb-0' className='pb-0'>
        {isLoading && (
            <View className='animate-pulse bg-[#C0C0C0] h-[200px]' style={styles.container}>
                <AntDesign name="play" size={24} color="#E0E0E0" />
            </View>
        )}
        <YouTube
        videoId={videoId}
        height={isLoading?0:200}
        onReady={handleVideoReady}
        onChangeState={(event) => {
            if (event === "ended") setPlaying(false);
        }}
        />
    </ModalWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skeletonBar: {
    width: '90%',
    height: 20,
    backgroundColor: '#C0C0C0',
    borderRadius: 4,
  },
});

export default VideoModal;
