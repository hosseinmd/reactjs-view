import { View } from "../../../atoms";

interface LoaderProps {
  size?: number;
  color?: string;
  className?: string;
}

interface SpinProps {
  size?: number;
  color?: string;
}

export const Spin = ({ size = 0.6, color }: SpinProps) => {
  return (
    <View>
      <svg
        width="65px"
        height="65px"
        viewBox="0 0 66 66"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: `scale(${size})` }}
      >
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 33 33;270 33 33"
            begin="0s"
            dur="1.4s"
            repeatCount="indefinite"
          />
          <circle
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            cx="33"
            cy="33"
            r="30"
            strokeDasharray="187"
            strokeDashoffset="610"
          >
            <animate
              attributeName="stroke"
              values={color || "blue"}
              begin="0s"
              dur="5.6s"
              repeatCount="indefinite"
            />
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 33 33;135 33 33;450 33 33"
              begin="0s"
              dur="1.4s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-dashoffset"
              values="187;46.75;187"
              begin="0s"
              dur="1.4s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </svg>
    </View>
  );
};

export const Loader = ({ size = 0.6, color, className }: LoaderProps) => {
  return (
    <View {...{ className }} style={{ flex: 1, height: 40 }}>
      <Spin size={size} color={color} />
    </View>
  );
};
