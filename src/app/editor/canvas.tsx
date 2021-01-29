import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Dimensions } from '../shared/types/image';
import { getImageDimensions } from '../shared/utils/image';
import Resizer from './cropper/resizer';

interface CanvasProps {
  image: Blob;
}

const Canvas: React.FC<CanvasProps> = ({ image }: CanvasProps) => {
  const [imageData, setImageData] = useState(null);
  const [dimensions, setDimensions] = useState<Dimensions>(null);

  const setImageDimensions = async (image: string) => {
    const data = await getImageDimensions(image);
    console.log(data);
    setDimensions(data);
  };

  useEffect(() => {
    if (FileReader && image) {
      const fr = new FileReader();
      fr.onload = function () {
        setImageData(fr.result);
        setImageDimensions(fr.result as string);
      };
      fr.readAsDataURL(image);
    }
  }, [image]);

  return (
    <Box width={500} position="relative">
      <Box position="absolute" w="100%" h="100%" top={0} left={0}>
        <Resizer />
      </Box>
      <Box as="img" src={imageData} width="100%" />
    </Box>
  );
};

export default Canvas;
