<template>
  <b-carousel
    id="carousel-no-animation"
    style="text-shadow: 0px 0px 2px #000"
    no-animation
    controls
    :interval="2000"
    indicators
    img-width="100%"
    img-height="480"
  >
    <b-carousel-slide
      caption="Des produits de qualité"
      img-src="~/assets/images/pq.jpg"
    ></b-carousel-slide>
    <b-carousel-slide
      caption="Second Slide"
      img-src="https://picsum.photos/1024/480/?image=12"
    ></b-carousel-slide>
    <b-carousel-slide
      caption="Third Slide"
      img-src="https://picsum.photos/1024/480/?image=22"
    ></b-carousel-slide>
    <b-carousel-slide
      caption="Bienvenue chez hochea"
      img-src="https://picsum.photos/1024/480/?image=23"
    ></b-carousel-slide>
  </b-carousel>
</template>