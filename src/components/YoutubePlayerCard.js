import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLORS} from '../utils/Colors';
import YoutubePlayer, {getYoutubeMeta} from 'react-native-youtube-iframe';
const YoutubePlayerCard = ({youtubeId}) => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    getYoutubeMeta(youtubeId).then(meta => {
      setTitle(meta.title);
    });
  }, [youtubeId]);
  return (
    <View
      style={{
        marginTop: 10,
        borderTopColor: COLORS.tranparenSecondary,
        borderTopWidth: 1,
        borderBottomColor: COLORS.tranparenSecondary,
        borderBottomWidth: 1,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom: 10,
          paddingLeft: 10,
        }}>
        <Image
          source={require('../assets/icons/grid.png')}
          style={{
            width: 25,
            height: 25,
            resizeMode: 'contain',
          }}
        />
        <Text
          style={{
            color: COLORS.main,
            marginLeft: 10,
            marginRight: 10,
            fontSize: 15,
          }}>
          {title}
        </Text>
      </View>
      <YoutubePlayer height={250} videoId={youtubeId} />
    </View>
  );
};

export default YoutubePlayerCard;

const styles = StyleSheet.create({});
