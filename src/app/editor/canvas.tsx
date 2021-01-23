import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

interface CanvasProps {
  image: Blob;
}

const Canvas: React.FC<CanvasProps> = ({ image }: CanvasProps) => {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    if (FileReader && image) {
      const fr = new FileReader();
      fr.onload = function () {
        setImageData(fr.result);
      };
      fr.readAsDataURL(image);
    }
  }, [image]);

  return (
    <Box height={500} width={500} bg="gray.500">
      <img src={imageData} />
    </Box>
  );
};

export default Canvas;
