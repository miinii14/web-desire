$(function (){ 
  $('.top__slider').slick({
    dots: true,
    arrows: false,
    fade: true,
    autoplay: true,
  })
})

function openRightsideMenu () {
  document.getElementById('rightside-menu').style.transform = "translateX(0)";
}

function closeRightsideMenu () {
  document.getElementById('rightside-menu').style.transform = "translateX(+300%)";
}

