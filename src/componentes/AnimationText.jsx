import { TypeAnimation } from 'react-type-animation';

const AnimationText = () => {
    return (
      <TypeAnimation
        sequence={[
          // Same substring at the start will only be typed out once, initially
          'Desarrollador de software ',
          1000, // wait 1s before replacing "Mice" with "Hamsters"
          'Desarrollador FrontEnd',
          1000,
        ]}
        wrapper="span"
        speed={50}
        style={{ fontSize: '2em', display: 'inline-block' }}
        repeat={Infinity}
        className=""
      />
    );
  };

  export default AnimationText; 