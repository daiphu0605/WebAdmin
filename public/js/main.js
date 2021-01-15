//replaceBook
function replaceProducts(
  currentpage,
  page,
  search,
  category,
  sort,
  price,
  supplier,
  author,
  publisher,
  status = "Active"
) {
  // $.getJSON("/api/shop/book-list-old", {currentpage}, function(oldbooks){

  // })
  $.getJSON(
    "/api/products/page",
    {
      page,
      search,
      category,
      sort,
      price,
      supplier,
      author,
      publisher,
      status,
    },
    function (temppage) {
      $.getJSON(
        "/api/products/book-list",
        {
          page,
          search,
          category,
          sort,
          price,
          supplier,
          author,
          publisher,
          status,
        },
        function (books) {
          //get template
          var booktemplate = Handlebars.compile($("#product-list").html());
          var pagetemplate = Handlebars.compile($("#page-list").html());

          //get data

          var productHTML = booktemplate({ books });
          var pageHTML = pagetemplate(temppage);

          //display html
          $("#products").html(productHTML);
          $("#page").html(pageHTML);

          //scroll to top of page
          //$('html, body').animate({ scrollTop: $('#products-list-header').offset().top }, 'slow');
          //var urlString = "/shop?page=" + page;
          //window.history.pushState(books,"3 Cat Shop", urlString);
        }
      );
    }
  );
}

function replaceOrders(currentpage, page, search, sort, status) {
  // $.getJSON("/api/shop/book-list-old", {currentpage}, function(oldbooks){

  // })
  $.getJSON(
    "/api/orders/page",
    {
      page,
      search,
      sort,
      status,
    },
    function (temppage) {
      $.getJSON(
        "/api/orders/order-list",
        {
          page,
          search,
          sort,
          status,
        },
        function (orders) {
          //get template
          var booktemplate = Handlebars.compile($("#product-list").html());
          var pagetemplate = Handlebars.compile($("#page-list").html());

          //get data
          
          var productHTML = booktemplate({ orders });
          var pageHTML = pagetemplate(temppage);

          //display html
          $("#products").html(productHTML);
          $("#page").html(pageHTML);

          //scroll to top of page
          //$('html, body').animate({ scrollTop: $('#products-list-header').offset().top }, 'slow');
          //var urlString = "/shop?page=" + page;
          //window.history.pushState(books,"3 Cat Shop", urlString);
        }
      );
    }
  );
}

function replaceUsers(currentpage, page, search, sort, status) {
  // $.getJSON("/api/shop/book-list-old", {currentpage}, function(oldbooks){
  // })
  $.getJSON(
    "/api/users/page",
    { page, search, sort, status },
    function (temppage) {
      $.getJSON(
        "/api/users/user-list",
        {
          page,
          search,
          sort,
          status,
        },
        function (users) {
          
          //get template
          var booktemplate = Handlebars.compile($("#product-list").html());
          var pagetemplate = Handlebars.compile($("#page-list").html());

          //get data
          console.log('Main.js');
          console.log(temppage);
          var productHTML = booktemplate({ users });
          var pageHTML = pagetemplate(temppage);

          //display html
          $("#products").html(productHTML);
          $("#page").html(pageHTML);

          //scroll to top of page
          //$('html, body').animate({ scrollTop: $('#products-list-header').offset().top }, 'slow');
          //var urlString = "/shop?page=" + page;
          //window.history.pushState(books,"3 Cat Shop", urlString);
        }
      );
    }
  );
}

$(document).on("click", "input[type=checkbox]", function (event) {
  if (this.checked) {
    document.getElementById("group_button").hidden = false;
  }
});

/*
$("input[id=mainCheckbox]").click(function () {
  $("input[type=checkbox]").prop("checked", this.checked);
});
*/

(function ($, sr) {
  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
    var timeout;
    return function debounced() {
      var obj = this,
        args = arguments;
      function delayed() {
        if (!execAsap) func.apply(obj, args);
        timeout = null;
      }
      if (timeout) clearTimeout(timeout);
      else if (execAsap) func.apply(obj, args);
      timeout = setTimeout(delayed, threshold || 100);
    };
  };
  // smartresize
  jQuery.fn[sr] = function (fn) {
    return fn ? this.bind("resize", debounce(fn)) : this.trigger(sr);
  };
})(jQuery, "smartresize");

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $("#blah").attr("src", e.target.result);
    };

    reader.readAsDataURL(input.files[0]); // convert to base64 string
  }
}
/*
$(document).ready(function () {
  ///////////////////////////////
  // Set Home Slideshow Height
  ///////////////////////////////
  function setHomeBannerHeight() {
    var windowHeight = jQuery(window).height();
    jQuery("#header").height(windowHeight);
  }
  ///////////////////////////////
  // Center Home Slideshow Text
  ///////////////////////////////
  function centerHomeBannerText() {
    var bannerText = jQuery("#header > .center");
    var bannerTextTop =
      jQuery("#header").actual("height") / 2 -
      jQuery("#header > .center").actual("height") / 2 -
      20;
    bannerText.css("padding-top", bannerTextTop + "px");
    bannerText.show();
  }
  setHomeBannerHeight();
  centerHomeBannerText();
  //Resize events
  jQuery(window).smartresize(function () {
    setHomeBannerHeight();
    centerHomeBannerText();
  });

  function scroll() {
    if ($(window).scrollTop() == 0) {
      //$('.nav > li').removeClass('active');
      console.log($(window).scrollTop());
    } else {
    }
  }
  document.onscroll = scroll;
  var $scrollDownArrow = $("#scrollDownArrow");
  var animateScrollDownArrow = function () {
    $scrollDownArrow.animate(
      {
        top: 5,
      },
      400,
      "linear",
      function () {
        $scrollDownArrow.animate(
          {
            top: -5,
          },
          400,
          "linear",
          function () {
            animateScrollDownArrow();
          }
        );
      }
    );
  };
  animateScrollDownArrow();
  //Set Down Arrow Button
  jQuery("#scrollDownArrow").click(function (e) {
    e.preventDefault();
    jQuery.scrollTo("#story", 1000, {
      offset: -jQuery("#header #menu").height(),
      axis: "y",
    });
  });
  jQuery(".nav > li > a, #logo a").click(function (e) {
    e.preventDefault();

    jQuery.scrollTo(jQuery(this).attr("href"), 400, {
      offset: -jQuery("#header #menu").height(),
      axis: "y",
    });
  });
});
*/
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

(function ($) {
  "use strict";

  /*[ Load page ]
    ===========================================================*/
  /*
  $(".animsition").animsition({
    inClass: "fade-in",
    outClass: "fade-out",
    inDuration: 1500,
    outDuration: 800,
    linkElement: ".animsition-link",
    loading: true,
    loadingParentElement: "html",
    loadingClass: "animsition-loading-1",
    loadingInner: '<div class="loader05"></div>',
    timeout: false,
    timeoutCountdown: 5000,
    onLoadEvent: true,
    browser: ["animation-duration", "-webkit-animation-duration"],
    overlay: false,
    overlayClass: "animsition-overlay-slide",
    overlayParentElement: "html",
    transition: function (url) {
      window.location.href = url;
    },
  });
  */
  /*[ Back to top ]
    ===========================================================*/
  var windowH = $(window).height() / 2;

  $(window).on("scroll", function () {
    if ($(this).scrollTop() > windowH) {
      $("#myBtn").css("display", "flex");
    } else {
      $("#myBtn").css("display", "none");
    }
  });

  $("#myBtn").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 300);
  });

  /*==================================================================
    [ Fixed Header ]*/
  var headerDesktop = $(".container-menu-desktop");
  var wrapMenu = $(".wrap-menu-desktop");

  if ($(".top-bar").length > 0) {
    var posWrapHeader = $(".top-bar").height();
  } else {
    var posWrapHeader = 0;
  }

  if ($(window).scrollTop() > posWrapHeader) {
    $(headerDesktop).addClass("fix-menu-desktop");
    $(wrapMenu).css("top", 0);
  } else {
    $(headerDesktop).removeClass("fix-menu-desktop");
    $(wrapMenu).css("top", posWrapHeader - $(this).scrollTop());
  }

  $(window).on("scroll", function () {
    if ($(this).scrollTop() > posWrapHeader) {
      $(headerDesktop).addClass("fix-menu-desktop");
      $(wrapMenu).css("top", 0);
    } else {
      $(headerDesktop).removeClass("fix-menu-desktop");
      $(wrapMenu).css("top", posWrapHeader - $(this).scrollTop());
    }
  });

  /*==================================================================
    [ Menu mobile ]*/
  $(".btn-show-menu-mobile").on("click", function () {
    $(this).toggleClass("is-active");
    $(".menu-mobile").slideToggle();
  });

  var arrowMainMenu = $(".arrow-main-menu-m");

  for (var i = 0; i < arrowMainMenu.length; i++) {
    $(arrowMainMenu[i]).on("click", function () {
      $(this).parent().find(".sub-menu-m").slideToggle();
      $(this).toggleClass("turn-arrow-main-menu-m");
    });
  }

  $(window).resize(function () {
    if ($(window).width() >= 992) {
      if ($(".menu-mobile").css("display") == "block") {
        $(".menu-mobile").css("display", "none");
        $(".btn-show-menu-mobile").toggleClass("is-active");
      }

      $(".sub-menu-m").each(function () {
        if ($(this).css("display") == "block") {
          console.log("hello");
          $(this).css("display", "none");
          $(arrowMainMenu).removeClass("turn-arrow-main-menu-m");
        }
      });
    }
  });

  /*==================================================================
    [ Show / hide modal search ]*/
  $(".js-show-modal-search").on("click", function () {
    $(".modal-search-header").addClass("show-modal-search");
    $(this).css("opacity", "0");
  });

  $(".js-hide-modal-search").on("click", function () {
    $(".modal-search-header").removeClass("show-modal-search");
    $(".js-show-modal-search").css("opacity", "1");
  });

  $(".container-search-header").on("click", function (e) {
    e.stopPropagation();
  });

  /*==================================================================
    [ Isotope ]*/
  var $topeContainer = $(".isotope-grid");
  var $filter = $(".filter-tope-group");

  // filter items on button click
  $filter.each(function () {
    $filter.on("click", "button", function () {
      var filterValue = $(this).attr("data-filter");
      $topeContainer.isotope({ filter: filterValue });
    });
  });

  // init Isotope
  $(window).on("load", function () {
    var $grid = $topeContainer.each(function () {
      $(this).isotope({
        itemSelector: ".isotope-item",
        layoutMode: "fitRows",
        percentPosition: true,
        animationEngine: "best-available",
        masonry: {
          columnWidth: ".isotope-item",
        },
      });
    });
  });

  var isotopeButton = $(".filter-tope-group button");

  $(isotopeButton).each(function () {
    $(this).on("click", function () {
      for (var i = 0; i < isotopeButton.length; i++) {
        $(isotopeButton[i]).removeClass("how-active1");
      }

      $(this).addClass("how-active1");
    });
  });

  /*==================================================================
    [ Filter / Search product ]*/
  $(".js-show-filter").on("click", function () {
    $(this).toggleClass("show-filter");
    $(".panel-filter").slideToggle(400);

    if ($(".js-show-search").hasClass("show-search")) {
      $(".js-show-search").removeClass("show-search");
      $(".panel-search").slideUp(400);
    }
  });

  $(".js-show-search").on("click", function () {
    $(this).toggleClass("show-search");
    $(".panel-search").slideToggle(400);

    if ($(".js-show-filter").hasClass("show-filter")) {
      $(".js-show-filter").removeClass("show-filter");
      $(".panel-filter").slideUp(400);
    }
  });

  /*==================================================================
    [ Cart ]*/
  $(".js-show-cart").on("click", function () {
    $(".js-panel-cart").addClass("show-header-cart");
  });

  $(".js-hide-cart").on("click", function () {
    $(".js-panel-cart").removeClass("show-header-cart");
  });

  /*==================================================================
    [ Cart ]*/
  $(".js-show-sidebar").on("click", function () {
    $(".js-sidebar").addClass("show-sidebar");
  });

  $(".js-hide-sidebar").on("click", function () {
    $(".js-sidebar").removeClass("show-sidebar");
  });

  /*==================================================================
    [ +/- num product ]*/
  $(".btn-num-product-down").on("click", function () {
    var numProduct = Number($(this).next().val());
    if (numProduct > 0)
      $(this)
        .next()
        .val(numProduct - 1);
  });

  $(".btn-num-product-up").on("click", function () {
    var numProduct = Number($(this).prev().val());
    $(this)
      .prev()
      .val(numProduct + 1);
  });

  /*==================================================================
    [ Rating ]*/
  $(".wrap-rating").each(function () {
    var item = $(this).find(".item-rating");
    var rated = -1;
    var input = $(this).find("input");
    $(input).val(0);

    $(item).on("mouseenter", function () {
      var index = item.index(this);
      var i = 0;
      for (i = 0; i <= index; i++) {
        $(item[i]).removeClass("zmdi-star-outline");
        $(item[i]).addClass("zmdi-star");
      }

      for (var j = i; j < item.length; j++) {
        $(item[j]).addClass("zmdi-star-outline");
        $(item[j]).removeClass("zmdi-star");
      }
    });

    $(item).on("click", function () {
      var index = item.index(this);
      rated = index;
      $(input).val(index + 1);
    });

    $(this).on("mouseleave", function () {
      var i = 0;
      for (i = 0; i <= rated; i++) {
        $(item[i]).removeClass("zmdi-star-outline");
        $(item[i]).addClass("zmdi-star");
      }

      for (var j = i; j < item.length; j++) {
        $(item[j]).addClass("zmdi-star-outline");
        $(item[j]).removeClass("zmdi-star");
      }
    });
  });

  /*==================================================================
    [ Show modal1 ]*/
  $(".js-show-modal1").on("click", function (e) {
    e.preventDefault();
    $(".js-modal1").addClass("show-modal1");
  });

  $(".js-hide-modal1").on("click", function () {
    $(".js-modal1").removeClass("show-modal1");
  });
})(jQuery);
