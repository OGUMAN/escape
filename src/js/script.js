$(document).ready(function () { // when document loaded
  let menu = $(".burger__nav");
  let icon = $(".burger__icon");
  let isOpen = false; // is burger open?

  function menuReload() {
    if (!($(window).width() < 525)) {
      menu.hide();
      isOpen = false;
    }
  }

  icon.click(function () { // when clicked on the burger
    icon.toggleClass("burger__icon_active"); // switching class
    isOpen = !isOpen; // opening/closing the burger
    if (isOpen) { // if the burger is open
      menu.show(300); // showing the burger menu
      // adding needed styles for the burger menu
      menu.css({ display: "flex" });
      $("body, html").css({ overflow: "hidden" });
    } else { // if the burger is hidden
      menu.hide(300); // hide the burger
      $("body, html").css({ overflow: "" }); // remove styles from the burger
    }
    menuReload(); // reload the burger
  });

  const scrollToLink = (destination) => {
    $("html:not(:animated),body:not(:animated)").animate(
      { scrollTop: destination },
      900
    );
  }

  $(".header__link, .burger__link, .footer__link, .intro__btn").click( // when any link that need smooth scroll clicked
    function () {
      let elementClick = $(this).attr("href"); // element id that need the page scroll to
      let destination = $(elementClick).offset().top;
      // scrolling
      $("body, html").css({ overflow: "" });
      scrollToLink(destination);
      return false;
    }
  );

  $(".burger__link").click( // when clicked burger link
  function () {
    if ($(window).width() < 525) { // when screen < 525px (burger is open)
      icon.toggleClass("burger__icon_active"); // opening/closing icon
    }
    let elementClick = $(this).attr("href"); // element id that need the page scroll to
    let destination = $(elementClick).offset().top;
    isOpen = false; // hiding burger
    menu.hide(300); // hiding menu
    // scrolling
    $("body, html").css({ overflow: "" });
    scrollToLink(destination);
    return false;
  }
);

  let sliderIndex = 0;
  let links = $(".posts__link");

  function slider(arg) {
    if ($(window).width() < 700) { // when screen < 700px
      if (arg == "+" && sliderIndex < links.length - 1) { // if clicked to the right button and element is not the last
        sliderIndex++; // index +1
        links.hide("fast"); // hiding every slider element
        links.eq(sliderIndex).show("fast"); // but showing the slider element that have right index
      } else if (arg == "-" && sliderIndex > 0) { // if clicked to the left button and element is not the first
        sliderIndex--; // index -1
        links.hide("fast"); // hiding every slider element
        links.eq(sliderIndex).show("fast"); // but showing the slider element that have right index
      } else if (arg == "notClick") { // when it's not even click (when page loaded)
        links.hide(); // hiding every slider element
        links.eq(0).show(); // showing the first element
      }
    } else {
      links.show(); // if screen > 700, show all buttons
    }
    if (sliderIndex == 0) { // if the slider shows the first element
      $("#posts__btn_back").css({ color: "#B2B2B2" }); // making the left button dark (blocked button)
    } else if (sliderIndex == links.length - 1) { // if the slider shows the last element
      $("#posts__btn_next").css({ color: "#B2B2B2" }); // making the right button dark (blocked button)
    } else { // if slider shows not first and not last element
      $("#posts__btn_back").css({ color: "" }); // making the button not dark
      $("#posts__btn_next").css({ color: "" }); // making the button not dark
    }
  }

  // showing first slider element when page loaded
  slider("notClick");

  $("#posts__btn_next").click(function () { // when clicked the right button
    slider("+");
  });

  $("#posts__btn_back").click(function () { // when clicked the left button
    slider("-");
  });

  $(window).resize(function () { // when resizing screen
    menuReload(); // reloading menu
    slider("notClick"); // reloading slider
  });
});
