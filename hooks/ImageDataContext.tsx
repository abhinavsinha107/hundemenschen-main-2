import React, { createContext, useContext, ReactNode } from 'react';
import { ImageDataProps, useImageData } from './useImageData';

const ImageDataContext = createContext<ImageDataProps | undefined>(undefined);

export const ImageDataProvider = ({ children }: { children: ReactNode }) => {
  const imageUpload = useImageData();
  return (
    <ImageDataContext.Provider value={imageUpload}>
      {children}
    </ImageDataContext.Provider>
  );
};

export const useImageDataContext = (): ImageDataProps => {
  const context = useContext(ImageDataContext);
  if (!context) {
    throw new Error(
      'useImageDataContext must be used within an ImageDataProvider',
    );
  }
  return context;
};
