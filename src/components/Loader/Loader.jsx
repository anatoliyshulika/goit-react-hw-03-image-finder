import Box from 'components/Box/Box';
import { RotatingLines } from 'react-loader-spinner';

export default function Loader() {
  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      backgraundColor="transparent"
      position="fixed"
      top="0"
      right="0"
      left="0"
      bottom="0"
      zIndex="3000"
    >
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </Box>
  );
}
