/*!
 * Project Custom JS
 * Author : Ahmed Abdel Moula
 */

$(document).ready(function () {
  // Bootstrap Tooltip Trigger
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });

  function bodyScroll() {
    $('body').toggleClass('no-scroll');
  }

  function srchFormToggle() {
    $("#tae-srch").slideToggle("fast");
    $(".srch-btn").toggleClass("active");
  }

  // Expandable Search Form
  $(".srch-btn").on("click", function (e) {
    srchFormToggle();
    bodyScroll();
    e.stopPropagation();
  });

  $(".srch-close").on("click", function (e) {
    srchFormToggle();
    bodyScroll();
    e.stopPropagation();
  });

  // Button Scroll to Top
  $("#top-animate").click(function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      "slow"
    );
    return false;
  });

  // Stop <body> scroll when mobile menu is expanded
  $(".navbar-toggler").on('click', function () {
    bodyScroll();
  });

});

// Toggle Burger Menu to X when Open
$(document).on('click', function () {
  $('.hamburger-toggle').find('.hamburger').toggleClass('active');
})

//Shrink navigation within scrolling
$(document).on("scroll", function () {
  if ($(document).scrollTop() > 86) {
    $("#tae-header").addClass("shrink");
  } else {
    $("#tae-header").removeClass("shrink");
  }
});