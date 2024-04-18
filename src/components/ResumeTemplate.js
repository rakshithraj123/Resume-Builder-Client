import React from 'react';
import { Image,CardText } from 'react-bootstrap';

const ResumeTemplate = ({ imagePath,name,onClick  }) => {
  return (
    <div onClick={onClick}>
      <Image src={imagePath} alt="ResumeTemplate Image" style={{width:'500px'}}/>
      <CardText style={{color:"#fff"}}>{name}</CardText>
    </div>
  );
};

export default ResumeTemplate;