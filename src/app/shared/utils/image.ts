import { Dimensions } from '../types/image';

export function getImageDimensions(image: string) {
  return new Promise<Dimensions>((resolve) => {
    const imageObj = new Image(100, 100);
    imageObj.src = image;
    imageObj.onload = () => {
      const { naturalWidth: width, naturalHeight: height } = imageObj;
      resolve({ width, height });
    };

    imageObj.onerror = (e) => {
      console.log(e);
    };
  });
}
