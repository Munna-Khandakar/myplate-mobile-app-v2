import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import YoutubePlayerCard from '../../components/YoutubePlayerCard';
import {API_URL} from '../../utils/Requests';

const VideoScreen = () => {
  const [tutorialLists, setTutorialLists] = useState(null);
  const [loading, setLoading] = useState(false);

  const getTutorialLists = async () => {
    setLoading(true);
    fetch(`${API_URL}/view-tutorials`, {
      method: 'get',
    })
      .then(res => res.json())
      .then(result => {
        // console.log(result);
        setTutorialLists(result);
      })
      .catch(err => {
        console.log(err);
      });
    setLoading(false);
  };
  useEffect(() => {
    getTutorialLists();
  }, []);

  if (loading) {
    return <Text style={{textAlign: 'center', marginTop: 30}}>Loading</Text>;
  } else if (tutorialLists?.length == 0) {
    return (
      <Text style={{textAlign: 'center', marginTop: 30}}>No Order Found</Text>
    );
  } else {
    return (
      <ScrollView>
        {tutorialLists?.map((tutorial, index) => {
          let youtubeId = tutorial?.video_link.split('/')[4]; // taking only the id
          console.log(youtubeId);
          return <YoutubePlayerCard youtubeId={youtubeId} key={index} />;
        })}
      </ScrollView>
    );
  }
};

export default VideoScreen;

const styles = StyleSheet.create({});

/**
 *
 * creted by- Munna Khandakar
 * Youtube player from: https://lonelycpp.github.io/react-native-youtube-iframe/basic-usage
 *
 */
