const $ = require('jquery-slim');

// require('gsap');
require('gsap/CSSPlugin');
const TweenLite = require('gsap/TweenLite');
const TimelineMax = require('gsap/TimelineMax');

module.exports = () => {
    let nextSlide;
    let currentSlide;
    let tl;
    let twBar;

    const animate = current => {
        currentSlide = current;
        if(current.parent().is('#resurection')){
            TweenLite.to($('body'), 0.3, {css:{
                backgroundColor : 'black'
            }});
            TweenLite.to($('footer'), 0.3, {css:{
                color : 'white'
            }})
            TweenLite.to($('#next'), 0.3, {css:{
                color : 'white'
            }});
            TweenLite.to($('#bar'), 0.3, {css:{
                color : 'white'
            }});
        }else{
            TweenLite.to($('body'), 0.3, {css:{
                backgroundColor : 'white'
            }});
            TweenLite.to($('footer'), 0.3, {css:{
                color : 'black'
            }})
            TweenLite.to($('#next'), 0.3, {css:{
                color : 'black'
            }});
            TweenLite.to($('#bar'), 0.3, {css:{
                color : 'black'
            }});
        }
        
        if(current.hasClass('title-slide')){
            TweenLite.to($('#next'), 0.3, {autoAlpha: 1});
            TweenLite.to($('#bar'), 0.3, {autoAlpha: 1});
            TweenLite.to($('.inner-footer'), 0.3, {y: 0});
            tl = new TimelineMax({delay: 1, yoyo: true, repeat: 1, repeatDelay: 1.5, onComplete: () => {
                next(current);
            }});
            TweenLite.set(current, {opacity: 1});
            tl.fromTo(current.find('h1'), 1, {y: -25, opacity: 0}, {y: 0, opacity: 1, ease: Power2.easeOut})
            .fromTo(current.find('h2'), 1, {y: -25, opacity: 0}, {ease: Power2.easeOut, y: 0, opacity: 1, delay: -0.8});
            updateTime(5);
        }else if(current.hasClass('starting')){
            TweenLite.to($('#next'), 0.3, {autoAlpha: 0});
            TweenLite.to($('#bar'), 0.3, {autoAlpha: 0});
            TweenLite.to($('.inner-footer'), 0.3, {y: 30});
            tl = new TimelineMax({delay: 1, yoyo: true, repeat: 1, repeatDelay: 2.5, onComplete: () => {
                next(current);
            }});
            TweenLite.set(current, {opacity: 1});
            tl.fromTo(current.find('h1'), 1, {y: -25, opacity: 0}, {y: 0, opacity: 1, ease: Power2.easeOut})
            .fromTo(current.find('h2'), 1, {y: -25, opacity: 0}, {ease: Power2.easeOut, y: 0, opacity: 1, delay: -0.8});
        }else if (current.hasClass('retry')){
            TweenLite.to($('#next'), 0.3, {autoAlpha: 0});
            TweenLite.to($('#bar'), 0.3, {autoAlpha: 0});
            TweenLite.to($('.inner-footer'), 0.3, {y: 30});
            TweenLite.set(current, {opacity: 1});
            tl = new TimelineMax({delay: 1});
            tl.staggerFromTo(current.find('.col'), 0.4, {autoAlpha: 0, skewY: -5, y: -100}, {autoAlpha: 1, skewY: 0, y: 0}, 0.1);
        }else{
            tl = new TimelineMax({delay: 1, yoyo: true, repeat: 1, repeatDelay: 15, onComplete: () => {
                next(current);
            }});
            TweenLite.set(current, {opacity: 1});
            tl.fromTo(current.find('img'), 1, {x: $('#ideation .slide2 .img').width(), opacity: 0}, {ease: Power4.easeOut, x: 0, opacity: 1})
            .fromTo(current.find('h3'), 1, {y: -50, opacity: 0}, {ease: Power2.easeOut, y: 0, opacity: 1, delay: -1})
            .fromTo(current.find('p'), 1, {y: -50, opacity: 0}, {ease: Power2.easeOut, y: 0, opacity: 1, delay: -0.8});
            updateTime(18.4);
        }
        updateProgress(current);
    }

    const next = current => {
        
        nextSlide = current.next();
        if(!nextSlide.length){
            nextSlide = current.parent().next().find('.title-slide, .retry');
        }
        animate(nextSlide);
    }

    const updateTime = t => {
        if(twBar) twBar.kill();
        TweenLite.set($('#bar span'), {css: {width: '0%'}});
        twBar = TweenLite.to($('#bar span'), t, {css: {width: '100%'},ease: Power0.easeNone});
    }

    const updateProgress = current => {
        let offset;
        const fW = $('.inner-footer').width();
        const percent = current.data('prog');
        switch(percent){
            case 0 :
                offset = 9;
                break;
            case 20 :
                offset = 5;
                break;
            case 40 :
                offset = 3;
                break;
            case 60 :
                offset = -3;
                break;
            case 80 :
                offset = -7;
                break;
            default :
                offset = 0;
                break;
        }
        const finalPlace = (fW * percent / 100) + offset; 
        TweenLite.to($('#here'), 1, {css : {left: `${finalPlace}px`}});
    }

    $('.retry h3').on('click', function() {
        const link = $(`#${$(this).data('link')} .title-slide`);
        const tl2 = new TimelineMax();
        tl2.staggerTo($('.retry .col'), 0.4, {autoAlpha: 0, skewY: -3, y: 50}, 0.1);
        animate(link);
    });

    $('footer .step').on('click', function() {
        tl.stop();
        const link = $(`#${$(this).data('link')} .title-slide, #${$(this).data('link')} .retry`);
        TweenLite.to($('.slide'), 0.3, {opacity: 0, onComplete: () => {
            animate(link);
        }});
        
    });

    $('body').on('keydown', function(e){
        if(e.which == 39){
            tl.reverse(1.2);
            next(currentSlide);
        }
    })

    $('#next').on('click', function(e){
        tl.reverse(1.2);
        next(currentSlide);
    })


    animate($('#start .starting'));

}