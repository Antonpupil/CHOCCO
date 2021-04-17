let myMap;
const init = () => {
 myMap = new ymaps.Map("map", {
   center: [55.749673, 37.597133],
   zoom: 14,
   controls: [],
 });
 
 let coords = [
     [55.742835, 37.579870],
     [55.758258, 37.582071],
     [55.749622, 37.603579],
     [55.757890, 37.622697],
   ],
   myCollection = new ymaps.GeoObjectCollection({}, {
     draggable: false,
     iconLayout: 'default#image',
     iconImageHref: './../img/fonts/marker.svg',
     iconImageSize: [76, 95],
     iconImageOffset: [-35, -52]
   });
 
 for (let i = 0; i < coords.length; i++) {
   myCollection.add(new ymaps.Placemark(coords[i]));
 }
 
 myMap.geoObjects.add(myCollection);
 
 myMap.behaviors.disable('scrollZoom');
};
 
ymaps.ready(init);