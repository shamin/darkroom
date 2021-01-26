import { Box } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { ResizeLocation } from '../../shared/types/resizer';

interface ResizerProps {}

const Resizer: React.FC<ResizerProps> = (props: ResizerProps) => {
  const { onResize, resizerBoxProps } = useResizer();
  return (
    <Box bg="white" position="relative" border="2px solid #000" {...resizerBoxProps}>
      <ResizerPoint location="top-left" onResize={onResize} />
      <ResizerPoint location="top-right" onResize={onResize} />
      <ResizerPoint location="bottom-left" onResize={onResize} />
      <ResizerPoint location="bottom-right" onResize={onResize} />
    </Box>
  );
};

interface ResizerPointProps {
  location: ResizeLocation;
  size?: number;
  onResize: (location: ResizeLocation, e: React.SyntheticEvent) => void;
}

const ResizerPoint: React.FC<ResizerPointProps> = ({
  location,
  size = 14,
  onResize,
  ...props
}: ResizerPointProps) => {
  const getCursor = () => {
    switch (location) {
      case 'top-left':
        return 'nwse-resize';
      case 'top-right':
        return 'nesw-resize';
      case 'bottom-left':
        return 'nesw-resize';
      case 'bottom-right':
        return 'nwse-resize';
    }
  };

  const pointStyles = {
    left: location.includes('left') ? `-${size / 2}px` : 'unset',
    right: location.includes('right') ? `-${size / 2}px` : 'unset',
    top: location.includes('top') ? `-${size / 2}px` : 'unset',
    bottom: location.includes('bottom') ? `-${size / 2}px` : 'unset',
    cursor: getCursor(),
  };

  return (
    <Box
      w={`${size}px`}
      h={`${size}px`}
      bg="black"
      borderRadius={'50%'}
      position="absolute"
      onMouseDown={(e) => onResize(location, e)}
      {...pointStyles}
      {...props}
    ></Box>
  );
};

export default Resizer;

function useResizer() {
  const [watchMove, setWatchMove] = useState(false);
  const [location, setLocation] = useState<ResizeLocation>(null);
  const ref = useRef<HTMLDivElement>();

  const [resizerBoxStyles, setResizerBoxStyles] = useState({
    width: 40,
    height: 40,
    top: 30,
    left: 30,
  });

  const setNewBoxStyle = (mouseX: number, mouseY: number) => {
    const { x, y, width, height } = ref.current.getBoundingClientRect();

    if (location === 'bottom-right') {
      setResizerBoxStyles((styles) => {
        const newWidth = (styles.width * (mouseX - x)) / width;
        const newHeight = (styles.height * (mouseY - y)) / height;
        return {
          ...styles,
          width:
            newWidth > 10 && newWidth + styles.left <= 100 ? newWidth : styles.width,
          height:
            newHeight > 10 && newHeight + styles.top <= 100
              ? newHeight
              : styles.height,
        };
      });
    } else if (location === 'top-right') {
      setResizerBoxStyles((styles) => {
        const newWidth = (styles.width * (mouseX - x)) / width;
        const newHeight = styles.height + (styles.height * (y - mouseY)) / height;
        return {
          ...styles,
          width:
            newWidth > 10 && newWidth + styles.left <= 100 ? newWidth : styles.width,
          height:
            newHeight > 10 && newHeight + styles.top <= 100
              ? newHeight
              : styles.height,
          top:
            newHeight > 10 && newHeight + styles.top <= 100
              ? styles.top - (newHeight - styles.height)
              : styles.top,
        };
      });
    } else if (location === 'top-left') {
      setResizerBoxStyles((styles) => {
        const newWidth = styles.width + (styles.width * (x - mouseX)) / width;
        const newHeight = styles.height + (styles.height * (y - mouseY)) / height;
        return {
          ...styles,
          width:
            newWidth > 10 && newWidth + styles.left <= 100 ? newWidth : styles.width,
          height:
            newHeight > 10 && newHeight + styles.top <= 100
              ? newHeight
              : styles.height,
          top:
            newHeight > 10 && newHeight + styles.top <= 100
              ? styles.top - (newHeight - styles.height)
              : styles.top,
          left:
            newWidth > 10 && newWidth + styles.left <= 100
              ? styles.left - (newWidth - styles.width)
              : styles.left,
        };
      });
    } else if (location === 'bottom-left') {
      setResizerBoxStyles((styles) => {
        const newWidth = styles.width + (styles.width * (x - mouseX)) / width;
        const newHeight = (styles.height * (mouseY - y)) / height;
        return {
          ...styles,
          width:
            newWidth > 10 && newWidth + styles.left <= 100 ? newWidth : styles.width,
          height:
            newHeight > 10 && newHeight + styles.top <= 100
              ? newHeight
              : styles.height,
          left:
            newWidth > 10 && newWidth + styles.left <= 100
              ? styles.left - (newWidth - styles.width)
              : styles.left,
        };
      });
    }
  };
  const onMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    setNewBoxStyle(e.clientX, e.clientY);
  };

  const onMouseUp = (e: MouseEvent) => {
    e.preventDefault();
    setWatchMove(false);
  };

  useEffect(() => {
    if (watchMove) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [watchMove]);

  const onResize = (location: ResizeLocation, e: React.SyntheticEvent) => {
    e.preventDefault();
    setLocation(location);
    setWatchMove(true);
  };

  return {
    onResize,
    resizerBoxProps: {
      w: `${resizerBoxStyles.width}%`,
      h: `${resizerBoxStyles.height}%`,
      left: `${resizerBoxStyles.left}%`,
      top: `${resizerBoxStyles.top}%`,
      ref,
    },
  };
}
