import React, { useState, useEffect } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';

const ImageSlider = ({ slides }) => {

  const [current, setCurrent] = useState(0);
  const length = slides.length;
  const [SliderData, setSliderData] = useState([0])

  useEffect(() => {
    fetchCarousel()
    next()

  }, []);


  
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }


  const next=()=>{
    setTimeout(() => {
      console.log('next')
      nextSlide()
    }, 5000);

    setTimeout(() => {
      console.log('prev')
      prevSlide()
    }, 10000);
  }

  const fetchCarousel = async () => {

    const res = await fetch('https://13k.up.railway.app/api/allgetcarousel');

    const datacarousel = await res.json();
    
    console.log(datacarousel, 'carousel');

    setSliderData(datacarousel);  
 
};








  return (
    <section className='slider'>
      <FaArrowAltCircleLeft className='left-arrow'  onClick={prevSlide} />
      <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
    
      {SliderData.map((slide, index) => {
        return (
          <div
            className={index === current ? 'slide active' : 'slide'}
            key={index}
          >
            {index === current && (
              <img src={slide.imageURL} alt='image' className='image' />
            )}
          </div>
        );
      })}
    </section>
  );
};

export default ImageSlider;
