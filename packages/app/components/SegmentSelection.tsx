import { Text, View } from './Themed';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import * as React from 'react';
import { useAppSelector } from '../hooks/useAppSelector';
import { FontAwesome5 } from '@expo/vector-icons';
import Colors from '../constants/Colors';

export default function SegmentSelection({
  selectSegment,
}: {
  selectSegment: any;
}) {
  const scheme = useColorScheme();
  const colors = useAppSelector((state) => state.settings.colors);

  const synth = useAppSelector((state) => state.synthesizer);
  if (!synth.pipeline || !synth.pipeline.segments) {
    return <ActivityIndicator color={colors.primary} size={"large"} />;
  }

  return synth.pipeline.segments.map((segment, index) => {
    return (
      <TouchableOpacity
        style={[styles.segment, { borderColor: colors.primary2 }]}
        onPress={() => selectSegment(index)}
        key={segment.title}
      >
        <Text numberOfLines={1} style={{ flex: 1, fontSize: 18, width: '100%' }}>
          {segment.title}
        </Text>
        <FontAwesome5
          style={[
            styles.playIcon,
            {
              color: colors.primary2,
            },
          ]}
          name={'play'}
        />
      </TouchableOpacity>
    );
  });
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.5)',
    zIndex: 20,
  },
  headline: {
    padding: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  playIcon: {
    alignSelf: 'flex-end',
    paddingLeft: 10,
    position: 'relative',
    top: -7,
  },
  segment: {
    padding: 15,
    paddingHorizontal: 15,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    height: 60,
  },
  popup: {
    position: 'absolute',
    top: 80,
    zIndex: 20,
    width: Dimensions.get('window').width - 80,
    left: 40,
    right: 40,
    borderStyle: 'solid',
  },
});
