import React from "react";
import PropTypes from 'prop-types';
import styled from '@emotion/styled'

import { PlusOutlined } from "@ant-design/icons";

const ImageContainer = styled.div`
  margin-top: 10px;
`

const PostImages = ({images}) => {
  if(images.length === 1){
    return(
      <ImageContainer>
        <img role="presentation" src={images[0].src} alt={images[0].src} />
      </ImageContainer>
    )
  }
  if(images.length === 2){
    return(
      <ImageContainer>
        <div>
          <img role="presentation" style={{width: "50%"}} src={images[0].src} alt={images[0].src} />
          <img role="presentation" style={{width: "50%"}} src={images[1].src} alt={images[1].src} />
        </div>
      </ImageContainer>
    )
  }
  return(
    <ImageContainer>
      <div>
        <img role="presentation" style={{width: "50%"}} src={images[0].src} alt={images[0].src} />
        <div
          role="presentation"
          style={{display:"inline-block", width: "50%", textAlign: "center", verticalAlign: "center"}}
        >
          <PlusOutlined />
          <br />
          {images.length - 1}
          개의 사진 더보기 
        </div>
      </div>
    </ImageContainer>
  )
}

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
  })).isRequired,
};

export default PostImages;