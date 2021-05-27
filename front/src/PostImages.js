import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { PlusOutlined } from '@ant-design/icons';

import ImagesZoom from './ImagesZoom';
import { backendURL } from '../config/config';

const ImageContainer = styled.div`
  margin-top: 10px;
`;

const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);
  const serverURL = `${backendURL}/`;

  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);

  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  if (images.length === 1) {
    return (
      <ImageContainer>
        <img role="presentation" src={serverURL + images[0].src} alt={images[0].src} onClick={onZoom} />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </ImageContainer>
    );
  }
  if (images.length === 2) {
    return (
      <ImageContainer>
        <div>
          <img role="presentation" style={{ width: '50%' }} src={serverURL + images[0].src} alt={images[0].src} onClick={onZoom} />
          <img role="presentation" style={{ width: '50%' }} src={serverURL + images[1].src} alt={images[1].src} onClick={onZoom} />
        </div>
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </ImageContainer>
    );
  }
  return (
    <ImageContainer>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: '1' }}>
          <img role="presentation" style={{ width: '100%' }} src={serverURL + images[0].src} alt={images[0].src} onClick={onZoom} />
        </div>
        <div
          role="presentation"
          style={{
            display: 'flex', flex: '1', width: '100%', textAlign: 'center', justifyContent: 'center', alignItems: 'center', border: 'dashed 0.5px',
          }}
          onClick={onZoom}
        >
          <div>
            <PlusOutlined />
            <br />
            {images.length - 1}
            개의 사진 더보기
          </div>
        </div>
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </div>
    </ImageContainer>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
  })).isRequired,
};

export default PostImages;
