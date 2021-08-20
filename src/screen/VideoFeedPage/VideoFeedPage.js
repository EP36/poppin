import React from 'react';
import { Video } from 'expo-av';

export default function VideoFeedPage() {
  return (
    <Video 
      source={{ uri: videoUrl }}
      // style={s.video} 
      shouldPlay={isPlaying}
      resizeMode="contain"
      useNativeControls={isPlaying}
      onLoad={onLoad}
      onError={onError}
    />
  )
}