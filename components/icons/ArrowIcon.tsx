import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface ArrowIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const ArrowIcon: React.FC<ArrowIconProps> = ({
  width = 51,
  height = 37,
  color = '#3B3B3B',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 51 37" fill="none">
      <Path
        d="M45.2622 15.292L3.26736 15.9498"
        stroke={color}
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M33.4516 27.4785L45.2622 15.292"
        stroke={color}
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M33.0757 3.48141L45.2622 15.292"
        stroke={color}
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ArrowIcon;
