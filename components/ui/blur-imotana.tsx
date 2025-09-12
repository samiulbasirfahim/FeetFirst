import React from 'react';
import { View } from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

export function ImotanaBlur({ size, radius, color = '#9F8F72', style }) {
  return (
    <View style={[{ width: size, height: size, position: 'absolute' }, style]}>
      <Svg width="100%" height="100%">
        <Defs>
          <RadialGradient
            id="grad"
            cx="50%"
            cy="50%"
            r="50%"
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0%" stopColor={color} stopOpacity="1" />
            <Stop offset="100%" stopColor={color} stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#grad)" />
      </Svg>
    </View>
  );
}

export default ImotanaBlur;
