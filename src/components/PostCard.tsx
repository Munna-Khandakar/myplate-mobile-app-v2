import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef} from 'react';
import {COLORS} from '../utils/Colors';
import RBSheet from 'react-native-raw-bottom-sheet';
import OrderBottomSheet from './OrderBottomSheet';
import {Blurhash} from 'react-native-blurhash';
import {HostPlateType} from '../types/HostPlateType';

type PostCardProps = {
  plate: HostPlateType;
};
const PostCard = (props: PostCardProps) => {
  const {plate} = props;
  const refRBSheet = useRef<RBSheet | null>(null);
  //console.log(plate);
  return (
    <View style={styles.PostCardContainer}>
      <View style={styles.PostHeaderContainer}>
        {/* <Image
          style={styles.userImage}
          source={
            !plate?.host_profile?.profile_image
              ? require('../assets/chef.png')
              : {
                  uri: plate?.host_profile?.profile_image,
                }
          }
        /> */}
        <View style={styles.PostTitleContainer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.PostCardTitle}>{plate?.title}</Text>
            <Image
              source={require('../assets/icons/three-dot.png')}
              style={styles.threeDotIcon}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {/* <Text style={{fontSize: 14, color: COLORS.secondary}}>
              {plate?.postedBy?.name}
            </Text>
            {plate?.postedBy?.myCertification && (
              <Image
                source={require('../assets/icons/verified.png')}
                style={styles.verifiedIcon}
              />
            )} */}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 12, color: COLORS.secondary}}>
              {plate?.quantity} Plates Remaining
            </Text>
            <Image
              source={require('../assets/icons/dot.png')}
              style={styles.dotIcon}
            />
            <Text style={{fontSize: 12, color: COLORS.secondary}}>
              All time available
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.PostCardDescriptionContainer}>
        <Text style={styles.PostCardDescription}>{plate?.description}</Text>
      </View>
      {/* {plate?.plate_images && plate?.plate_images.length > 0 && (
        <View style={styles.PostCardImageContainer}>
          {plate?.plate_images[0] ? (
            <Image
              style={styles.PostCardImage}
              source={{
                uri: plate?.plate_images[0],
              }}
            />
          ) : (
            <Blurhash
              blurhash="LGFFaXYk^6#M@-5c,1J5@[or[Q6."
              style={styles.PostCardImage}
            />
          )}
        </View>
      )} */}

      <View style={styles.PostCardButtonContainer}>
        <TouchableOpacity
          style={styles.PostCardButton}
          onPress={() => refRBSheet?.current?.open()}>
          <View>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 18,
                paddingTop: 3,
                paddingBottom: 3,
              }}>
              ORDER NOW
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: COLORS.main,
              borderRadius: 10,
              paddingLeft: 18,
              paddingRight: 8,
              paddingTop: 5,
              paddingBottom: 5,
              // color: COLORS.main,
              position: 'absolute',
              right: 0,
            }}>
            <Text
              style={{color: COLORS.main, fontWeight: 'bold', fontSize: 15}}>
              ৳ {plate?.price}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* @ts-ignore */}
      <RBSheet
        ref={refRBSheet as any}
        closeOnDragDown={true}
        closeOnPressMask={true}
        animationType="slide"
        height={560}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: COLORS.secondary,
            width: 50,
          },
        }}
        onOpen={() => console.log('first')}>
        <OrderBottomSheet plate={plate} />
      </RBSheet>
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  PostCardContainer: {
    marginTop: 10,
    borderTopColor: COLORS.tranparenSecondary,
    borderTopWidth: 1,
    borderBottomColor: COLORS.tranparenSecondary,
    borderBottomWidth: 1,
    minHeight: 100,
    padding: 10,
  },
  PostHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImage: {
    height: 60,
    width: 60,
    resizeMode: 'cover',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: COLORS.main,
  },
  PostTitleContainer: {
    marginLeft: 10,
    flex: 1,
  },
  PostCardTitle: {
    color: COLORS.main,
    fontWeight: 'bold',
    fontSize: 18,
  },
  verifiedIcon: {
    marginLeft: 10,
    height: 15,
    width: 15,
  },
  dotIcon: {
    marginLeft: 5,
    marginRight: 5,
    height: 10,
    width: 10,
  },
  threeDotIcon: {
    height: 15,
    width: 15,
  },
  PostCardDescriptionContainer: {
    marginTop: 10,
  },
  PostCardDescription: {
    color: COLORS.main,
    fontSize: 15,
    textAlign: 'justify',
  },
  PostCardImageContainer: {
    marginTop: 10,
  },
  PostCardImage: {
    height: 300,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  PostCardButtonContainer: {
    marginTop: 10,
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    paddingTop: 8,
    paddingBottom: 8,
  },
  PostCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'center',
  },
});
