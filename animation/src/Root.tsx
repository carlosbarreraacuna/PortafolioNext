import React from "react";
import { AbsoluteFill, Composition, useCurrentFrame } from "remotion";
import { Character, VIEW } from "./Character";
import { CLIPS, FPS, type ClipName } from "./pose";

const Clip: React.FC<{ clip: ClipName }> = ({ clip }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Character pose={CLIPS[clip].pose(frame)} />
    </AbsoluteFill>
  );
};

export const Root: React.FC = () => (
  <>
    {(Object.keys(CLIPS) as ClipName[]).map((name) => (
      <Composition
        key={name}
        id={name}
        component={Clip}
        defaultProps={{ clip: name }}
        durationInFrames={CLIPS[name].frames}
        fps={FPS}
        width={VIEW.w}
        height={VIEW.h}
      />
    ))}
  </>
);
