import React from 'react';
import {useState} from 'react';
import Card from './card';
export default function Carousel() {
 
  return (
    <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner" id='carousel'>
          
          <div className="carousel-item active">
            <img src="https://source.unsplash.com/random/1200x400/?shirt" className="d-block w-100" alt="shirt" style={{ objectFit: "cover", height: "400px" }} />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/1000x400/?necklace" className="d-block w-100" alt="dress" style={{ objectFit: "cover", height: "400px" }} />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/1200x400/?shoes" className="d-block w-100" alt="shoes" style={{ objectFit: "cover", height: "400px" }} />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
