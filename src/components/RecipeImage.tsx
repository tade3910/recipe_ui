import { Image } from '@mantine/core';
interface RecipeImageProps {
  imgSrc?: string;
  heght?: number;
}

export default function RecipeImage({ imgSrc, heght }: RecipeImageProps) {
  imgSrc = imgSrc
    ? imgSrc
    : 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png';
  heght = heght ? heght : 160;

  return <Image src={imgSrc} height={heght} alt="Recipe" />;
}
