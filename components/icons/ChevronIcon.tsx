import { Colors } from '@/constants/Colors';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface ChevronIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const ChevronIcon: React.FC<ChevronIconProps> = ({
  width = 7,
  height = 12,
  color = Colors.light.darkGray,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 7 12" fill="none">
      <Path
        d="M1.56212 11.3723C1.47819 11.4591 1.37766 11.5282 1.2665 11.5753C1.15535 11.6224 1.03585 11.6467 0.915116 11.6467C0.794381 11.6467 0.674879 11.6224 0.563726 11.5753C0.452574 11.5282 0.352042 11.4591 0.268115 11.3723C0.107582 11.2051 0.0128121 10.9856 0.00123731 10.7541C-0.0103375 10.5226 0.0620602 10.2947 0.205116 10.1123L0.268115 10.0403L4.36812 5.82334L0.268115 1.60634C0.107581 1.43915 0.0128112 1.21961 0.00123646 0.988111C-0.0103383 0.756612 0.0620594 0.528718 0.205115 0.346342L0.268115 0.274342C0.426188 0.11089 0.640274 0.0133291 0.867339 0.00127079C1.0944 -0.0107875 1.31762 0.0635495 1.49211 0.209341L1.56111 0.274342L6.30712 5.15834C6.46765 5.32554 6.56242 5.54507 6.57399 5.77657C6.58557 6.00807 6.51317 6.23597 6.37012 6.41834L6.30712 6.49034L1.56212 11.3723Z"
        fill={color}
      />
    </Svg>
  );
};

export default ChevronIcon;