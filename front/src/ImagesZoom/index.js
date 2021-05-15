import React, { useState } from 'react';
import Slick from 'react-slick';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';

import {
  Overlay, Header, CloseBtn, SlickWrapper, ImgWrapper, Indicator, GlobalStyle,
} from './styles';

const ImagesZoom = ({ images, onClose }) => {
  const serverURL = 'http://localhost:3080/';
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <Overlay>
      <Global styles={GlobalStyle} />
      <Header>
        <h1>상세 이미지</h1>
        <CloseBtn onClick={onClose} />
      </Header>
      <SlickWrapper>
        <div>
          <Slick
            initialSlide={0}
            beforeChange={(slide, newSlide) => setCurrentSlide(newSlide)}
            infinite
            arrows={false}
            slidesToShow={1}
            slidesToScroll={1}
          >
            {images.map((v) => (
              <ImgWrapper key={v.src}>
                <img src={serverURL + v.src} alt={v.src} />
              </ImgWrapper>
            ))}
          </Slick>
          <Indicator>
            <div>
              {currentSlide + 1}
              {' '}
              /
              {' '}
              {images.length}
            </div>
          </Indicator>
        </div>
      </SlickWrapper>
    </Overlay>
  );
};

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
  })).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;
