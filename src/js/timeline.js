const $ = require('jquery-slim');

// require('gsap');
require('gsap/CSSPlugin');
const TweenLite = require('gsap/TweenLite');
const TimelineMax = require('gsap/TimelineMax');

module.exports = () => {
    let nextSlide;

    const animate = current => {
        
        if(current.hasClass('title-slide')){
            console.log('in');
            const tl = new TimelineMax({delay: 1, yoyo: true, repeat: 1, repeatDelay: 1.5, onComplete: () => {
                next(current);
            }});
            TweenLite.set(current, {opacity: 1});
            tl.fromTo(current.find('h1'), 1, {y: -25, opacity: 0}, {y: 0, opacity: 1, ease: Power2.easeOut})
            .fromTo(current.find('h2'), 1, {y: -25, opacity: 0}, {ease: Power2.easeOut, y: 0, opacity: 1, delay: -0.5});
        }else{
            const tl = new TimelineMax({delay: 1, yoyo: true, repeat: 1, repeatDelay: 10, onComplete: () => {
                next(current);
            }});
            TweenLite.set(current, {opacity: 1});
            tl.fromTo(current.find('img'), 1.5, {x: $('#ideation .slide2 .img').width(), opacity: 0}, {ease: Power4.easeOut, x: 0, opacity: 1})
            .fromTo(current.find('h3'), 1, {y: -50, opacity: 0}, {ease: Power2.easeOut, y: 0, opacity: 1, delay: -1})
            .fromTo(current.find('p'), 1, {y: -50, opacity: 0}, {ease: Power2.easeOut, y: 0, opacity: 1, delay: -0.8});
        }
        
    }

    const next = current => {
        console.log('next');
        nextSlide = current.next();
        if(!nextSlide.length){
            nextSlide = current.parent().next().find('.title-slide');
        }
        animate(nextSlide);

    }


    animate($('#ideation .title-slide'));

}