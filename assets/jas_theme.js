var elessiShopify,sliderFinalWidth = 480, maxQuickWidth = 960;
(function( $ ) {
   "use strict";
   elessiShopify = (function() {
   var elessiTheme = {
         popupAnimation: 'mfp-move-horizontal',
         pjaxLink: '.select_orderby a, .nt_ajaxFilter a, .nt-pagination-ajax a, .nav_filters a, .widget_product_tag_cloud a',
         nt_btn_load_more : '.nt-products-load-more.load-on-scroll',
         money_format : '${{amount}}'
   };
   return {
      init: function() { 
         //this.initMasonry();
         //this.EqualHeight();
         this.initStickyMenu();
         this.spb_animate();
         this.initSearchForm();
         this.searchDropdown();
         //this.ajaxSearch();
         this.initMegaMenu();
         this.initDropdownMenu();
         this.initPushMenu();
         //this.initfooterMenu();
         this.initQuickView();
         this.NTQuickShop();
         this.parallax();
         this.AJAXAddToCart();
         this.AJAXFormAddToCart();
         this.AJAXchangeFromCart();
         this.AJAXRemoveFromCart();
         this.initMiniCart();
         this.stickyFooter();
         this.ajaxFilters();
         this.categoriesMenu();
         this.productsLoadMore();
         this.productsTabs();
         this.productsjasTabs();
         this.newsletterPopup();
         this.EuCookies();
         this.initCountdown();
         this.initCountdown_page();
         this.wcQuantityAdjust();
         this.wcExtraContent();
         this.initMagnificPopup();
         this.initCategoryFilter();
         this.wcInitPopupVideo();
         this.product360Button();
         this.wishList();
         this.loginWishlist();
         this.removeWishlist();
         this.catelog_mode();
         this.swatchesOnGrid();
         this.swatchesOnBGGrid();
         this.productImages();
         //this.wcPopupAddtocart();
         this.NTtableResponsive();
         this.fullHeightRow();
         this.initVideoBackgrounds();
         this.nt_map();
         this.ajaxchimp();
         this.spInitSwitchLayout();
         this.spInitSidebarFilter();
         this.spInitSidebarDefault();
         this.nathanDropdown('.input-dropdown-inner_pr');
         this.nathanDropdown_cat();
         this.spAccordion();
         this.spToogle();
         this.spStickySidebar();
         this.categoriesAccordion();
         this.nanoScroller();
         this.save_note();
         this.checkoutIndicator();
         this.pin__type();
         this.clickproduct();
         this.favicon_counter(nathan_settings.cart_count);
         this.backToTop();
         this.announcement_bar();
         this.add_sticky();
         this.loginSide();
         this.beforeAfter();
         this.currencyForm();
         $(window).resize();
        $('body').addClass('shopify-ready');
      },    

      // Check is mobile
      isMobile : function() {
         return (/Android|iPhone|iPad|iPod|BlackBerry/i).test(navigator.userAgent || navigator.vendor || window.opera);
      },
      
      //  Load more button for products
      productsLoadMore: function() {
          
          var process = false,intervalID;

          $('.nt-products-element').each(function() {
              var $this = $(this),
                  cache = [],
                  inner = $this.find('.nt-products-holder');

              if( ! inner.hasClass('paginate-arrows') && ! inner.hasClass('paginate-more-btn') ) return;
              cache[1] = inner.html();
              $this.on('recalc', function() {
                  calc();
              });

              if( inner.hasClass('paginate-arrows') ) {
                  $(window).resize(function() {
                      calc();
                  });
              }

              var calc = function() {
                  var height = inner.outerHeight();
                  if( $this.hasClass('collection_banner') ) {
                     $this.removeAttr("style");
                     var height = $this.outerHeight();
                  }
                  $this.stop().css({height: height});
              };

              // sticky buttons

              var body = $('body'),
                  btnWrap = $this.find('.products-footer'),
                  btnLeft = btnWrap.find('.products-load-prev'),
                  btnRight = btnWrap.find('.products-load-next'),
                  loadWrapp = $this.find('.nt-products-loader'),
                  scrollTop,
                  holderTop,
                  btnLeftOffset,
                  btnRightOffset,
                  holderBottom,
                  holderHeight,
                  holderWidth,
                  btnsHeight,
                  offsetArrow = 50,
                  offset,
                  windowWidth;

              if( body.hasClass('rtl') ) {
                  btnLeft = btnRight;
                  btnRight = btnWrap.find('.products-load-prev');
              }

              // $(window).scroll(function() {
              //     buttonsPos();
              // });

              // function buttonsPos() {

              //     offset = $(window).height() / 2;

              //     windowWidth = $(window).outerWidth(true) + 17;

              //     holderWidth = $this.outerWidth(true) + 10;

              //     scrollTop = $(window).scrollTop();

              //     holderTop = $this.offset().top - offset;

              //     btnLeftOffset = $this.offset().left - offsetArrow;

              //     btnRightOffset = btnLeftOffset + holderWidth + offsetArrow;

              //     btnsHeight = btnLeft.outerHeight();

              //     holderHeight = $this.height() - 50 - btnsHeight;

              //     holderBottom = holderTop + holderHeight;

              //     if(windowWidth <= 1047 && windowWidth >= 992 || windowWidth <= 825 && windowWidth >= 768 ) {
              //         btnLeftOffset += 18;
              //         btnRightOffset -= 18;
              //     }

              //     if(windowWidth < 768 || body.hasClass('wrapper-boxed') || body.hasClass('wrapper-boxed-small')) {
              //         btnLeftOffset += 51;
              //         btnRightOffset -= 51;
              //     }

              //     btnLeft.css({
              //         'left' : btnLeftOffset + 'px'
              //     });

              //     btnRight.css({
              //         'left' : btnRightOffset + 'px'
              //     });


              //     if (scrollTop < holderTop || scrollTop > holderBottom) {
              //         btnWrap.removeClass('show-arrow');
              //         loadWrapp.addClass('hidden-loader');
              //     } else {
              //         btnWrap.addClass('show-arrow');
              //         loadWrapp.removeClass('hidden-loader');
              //     }

              // };

              $this.find('.products-load-prev, .products-load-next').on('click', function(e) {
                  e.preventDefault();

                  if( process || $(this).hasClass('disabled') ) return; //process = true;

                  clearInterval(intervalID);

                  var $this = $(this),
                            holder = $this.parent().siblings('.nt-products-holder'),
                            next = $this.parent().find('.products-load-next'),
                            prev = $this.parent().find('.products-load-prev'),
                            nt_ajaxurl = $(this).attr('href');

                  loadProducts(holder, nt_ajaxurl, $this, function(data) {
                      holder.addClass('nt-animated-products');

                      data = jQuery(data);
                           var html = data.find('#nt_data_products').html(),
                                nt_url_prev = data.find('#nt_section_previous').attr('href'),
                                nt_class_prev = data.find('#nt_section_previous').attr('class'),
                                nt_url_nev = data.find('#nt_section_next').attr('href'),
                                nt_class_nev = data.find('#nt_section_next').attr('class'),
                                data_status = data.find('#nt_data_arrow').attr("data-status");
                               // var pagination = data.find('#nt_data_arrow').html();
                               holder.addClass('nt-animated-products').html( html );
                               prev.attr({ href: nt_url_prev, class: nt_class_prev });
                               next.attr({ href: nt_url_nev, class: nt_class_nev });
                     holder.imagesLoaded().progress(function() {
                        holder.parent().trigger('recalc');
                     });
                     //if( data_status == 'have-posts' ) {process = false;} else {process = true;}

                     if( $(window).width() < 768 ) {
                          $('html, body').stop().animate({
                              scrollTop: holder.offset().top - 150
                          }, 400);
                      }

                      var iter = 0;
                      intervalID = setInterval(function() {
                          holder.find('.nt-grid-item').eq(iter).addClass('start_animation animated');
                          iter++;
                      }, 100);
                  });

              });
          });

          elessiShopify.clickOnScrollButton( elessiTheme.nt_btn_load_more , false );

          $(document).off('click', '.nt-products-load-more').on('click', '.nt-products-load-more', function(e) {
                e.preventDefault();
                 //console.log(process);
                if (process) return;
                var $this = $(this),
                    holder = $this.parent().siblings('.nt-products-holder'),
                    nt_ajaxurl = $(this).attr('href');
                loadProducts(holder, nt_ajaxurl, $this, function(data) {
                  data = jQuery(data);
                  var html = data.find('#nt_data_products').html(),
                      result = data.find('#shopify_result_count').html(),
                      data_status = data.find('#nt_data_arrow').attr("data-status"),
                      data_load_more = data.find('#nt_section_next').attr("href");
                  if( holder.hasClass('nt-masonry') ) {
                    isotopeAppend(holder, html);
                  } else {
                    holder.append(html);
                  }
                  if ($(".sp_result_html").length > 0) {
                    $('.sp_result_html').text(result);
                  }
                  holder.imagesLoaded().progress(function() {
                     elessiShopify.clickOnScrollButton( elessiTheme.nt_btn_load_more , true );
                  });
                  //console.log(data_status)
                  if( data_status == 'have-posts' ) {
                    $this.attr("href", data_load_more);
                    process = false;
                  } else {
                    //$this.find('.load-label').hide().remove();
                    process = true;
                    //$this.attr("href", "javascript:void(0);");
                    $this.find('.load-label').hide();
                    $this.addClass('finished').find('.load-finished').show();
                  }
                });
              });
           var loadProducts = function(holder, ajaxurl, btn,callback) {

                    holder.addClass('loading').parent().addClass('element-loading');

                    btn.addClass('loading');

                    $.ajax({
                        dataType: "html",
                        type: 'GET',
                        url: ajaxurl,
                        success: function(data) {
                            callback( data );
                        },
                        error: function(data) {
                            console.log('ajax error');
                        },
                        complete: function() {
                            //countDown
                            elessiShopify.initCountdown();
                            holder.removeClass('loading').parent().removeClass('element-loading');
                            btn.removeClass('loading');
                           // if (holder.hasClass('equal-nt')) {
                           //   holder.nt_equlize({
                           //       child: '> [class*=col-] .product-img'
                           //   });
                           // }
                           //currency
                            if (nathan_settings.show_multiple_currencies && elessiShopifyPre.StorageCurrency() !== null) {
                                Currency.convertAll(shopCurrency, elessiShopifyPre.StorageCurrency(), '.nt-products-holder span.money');
                              }
                           //process = false;
                           //product review
                           if ( (typeof SPR !== 'undefined' ) && nathan_settings.productreviews && $(".shopify-product-reviews-badge").length > 0 ) {
                            return window.SPR.registerCallbacks(), window.SPR.initRatingHandler(), window.SPR.initDomEls(), window.SPR.loadProducts(), window.SPR.loadBadges();
                           }
                           if( !$('body').hasClass('use_animation') || typeof $.waypoints != 'function' ) return;
                           holder.find(".spb_animate:not(.start_animation)").waypoint(function(){
                                $(this).addClass("start_animation animated");
                           }, { offset: '85%' });
                        },
                    });
                };

          var isotopeAppend = function(el, items) {
              var items = $(items);
              el.append(items).isotope( 'appended', items );
              el.isotope('layout');
              setTimeout(function() {
                  el.isotope('layout');
              }, 100);
              el.imagesLoaded().progress(function() {
                  el.isotope('layout');
              });
          };

      },
      //  Helper function that make btn click when you scroll page to it
      clickOnScrollButton: function( btnClass, destroy ) {
          if( typeof $.waypoints != 'function' ) return;
          
          var $btn = $(btnClass);
          if( destroy ) {
              $btn.waypoint('destroy');
          }
          $btn.waypoint(function(){
              $btn.trigger('click');
          }, { offset: '100%' });
      },
      
      //  Helper function that make btn click when you scroll page to it
      spb_animate: function( ) {
         //85%
          if( !$('body').hasClass('use_animation') || typeof $.waypoints != 'function' ) return;

          $(".spb_animate:not(.start_animation)").waypoint(function(){
              $(this).addClass("start_animation animated");
          }, { offset: '85%' });
      },
      
      //Products tabs element AJAX loading
      productsjasTabs: function() {
         if( $('.nt_tta-tabs-list').length == 0 ) return;
         $("body").on("click", "ul.nt_tta-tabs-list li a", function(b) {
            b.preventDefault();
            var c = $(this)
              , d = c.closest(".nt_tta-container")
              ,siblings = d.siblings('.nt_tta-panels-container')
              ,holder = siblings.find('.nt_section_eqh')
              , e = d.find("ul.nt_tta-tabs-list");
            e.find("li").removeClass("nt_active"),
            d.find(".nt_tta-panel.not_ajax").removeClass("nt_active"),
            c.closest("li").addClass("nt_active"),
            d.find(c.attr("href")).addClass("nt_active")
        });
      },
      
      productsTabs: function() {
         if( $('.nt_tta-container').length == 0 ) return;
          $('.nt_tta-container').each(function() {
              var $this = $(this),
                  $inner = $this.find('.nt_tta-panel-body'),
                  $panel = $this.find('.nt_tta-panel'),
                  $holder = $this.find('.nt_tta-tabs-container');
              $this.find('.products_tabs_ajax li.li_ajax').on('click', function(e) {
                  e.preventDefault();
                  var $this = $(this),
                      ajaxurl = $this.data('atts'),
                      index = $this.index();
                  loadTab(ajaxurl, index, $holder,$panel, $inner, $this, function(data) {
                      $inner.html(data);
                  });
              });

          });

          var loadTab = function(ajaxurl, index,$holder,$panel, holder, btn, callback) {

              btn.parent().find('.active-tab-title').removeClass('active-tab-title');
              btn.addClass('active-tab-title');
              $panel.addClass('loading');
              $holder.addClass('element-loading');
              btn.addClass('loading');

              $.ajax({
                  dataType: "html",
                  type: 'GET',
                  url: ajaxurl,
                  success: function(data) {
                      callback( data );
                  },
                  error: function(data) {
                      console.log('ajax error');
                  },
                  complete: function() {
                     //countDown
                     elessiShopify.initCountdown();
                    
                     if (nathan_settings.show_multiple_currencies && elessiShopifyPre.StorageCurrency() !== null) {
                       Currency.convertAll(shopCurrency, elessiShopifyPre.StorageCurrency(), '.type_nt_fea_coll_tab span.money');
                     }
                     if (nathan_settings.show_multiple_currencies && elessiShopifyPre.StorageCurrency() !== null) {
                       Currency.convertAll(shopCurrency, elessiShopifyPre.StorageCurrency(), '.type_nt_fea_coll_tab span.money');
                     }
                     //product review
                     if ( (typeof SPR !== 'undefined' ) && $(".shopify-product-reviews-badge").length > 0 && nathan_settings.productreviews ) {
                      return window.SPR.registerCallbacks(), window.SPR.initRatingHandler(), window.SPR.initDomEls(), window.SPR.loadProducts(), window.SPR.loadBadges();
                     }
                     if( !$('body').hasClass('use_animation') || typeof $.waypoints != 'function' ) return;
                           holder.find(".spb_animate:not(.start_animation)").waypoint(function(){
                                $(this).addClass("start_animation animated");
                           }, { offset: '85%' });
                  },
              }).done(function() {

                  // if(ajaxurl.indexOf('img_size_true') != -1) {
                  //    elessiShopify.EqualHeight();
                  //    setTimeout(function(){elessiShopify.EqualHeight(); }, 400);
                  // }
                  if(ajaxurl.indexOf('sidetoshow_') != -1) {
                      holder.find( '.nt-carousel' ).not( '.slick-initialized' ).slick();
                  } else {
                     elessiShopify.productsLoadMore();
                  }
                 setTimeout(function(){
                  btn.removeClass('loading');
                  $panel.removeClass('loading');
                  $holder.removeClass('element-loading');
                }, 600);
              });
          };
      },

      nt_currency: function() {
         if (nathan_settings.show_multiple_currencies && elessiShopifyPre.StorageCurrency() !== null) {
         Currency.convertAll(shopCurrency, elessiShopifyPre.StorageCurrency(), 'form[action="/cart/add"] span.money');
         }
      },
      nt_productreviews: function() {
          if(theme.nt_productreviews && $(".spr-badge").length > 0 ) {
              $.getScript(window.location.protocol + "//productreviews.shopifycdn.com/assets/v4/spr.js");
          }
      },

      // Initialize search form in header.
      initSearchForm : function() {
         if( nathan_settings.style_search != 'full-screen' ) return;
         var HS = $('.header__search'),
             body = $( 'body' );
         // Open search form
         $( '.nt_search_full-screen>a' ).on( 'click', function( e ) {
            e.preventDefault();
            body.addClass('open_search');
            $('.nt_overlay_content').addClass('visible');
            $('.nt_overlay_footer').addClass('visible');
            $('.nt_overlay_header').addClass('visible');
            if ($(window).width() > 1024){setTimeout(function(){HS.find('input[type="text"]').focus(); }, 500);}
            elessiShopify.ajaxSearch('json');
         });
        $('.search_extended input[name="q"]').focus(function(){
          elessiShopify.ajaxSearch('drop_json');
        });
         $( '.nt_close_search' ).on( 'click', function(e) {
            e.preventDefault();
            body.removeClass('open_search');
            $('.nt_overlay_header').removeClass('visible');
            $('.nt_overlay_content').removeClass('visible');
            $('.nt_overlay_footer').removeClass('visible');
         });
      },

      searchDropdown: function() {
         if( nathan_settings.style_search != 'dropdown' ) return;
          var body = $('body'),searchWrapper;
        $('.search_extended input[name="q"]').focus(function(){
          elessiShopify.ajaxSearch('drop_json');
        });
          body.on('click', '.nt_search_dropdown>a', function(e) {
              e.preventDefault();
              searchWrapper = $(this).closest('.nt_search_dropdown');
              if( isOpened() ) {
                  closeWidget();
              } else {
                  setTimeout( function() {
                      openWidget();
                      elessiShopify.ajaxSearch('drop_json');
                  }, 10);
              }
          });

        
          body.on("click", ".nt_search_dropdown, .site_header, #nathan-content", function(event) {
              if ( ! $(event.target).is('.nt_search_dropdown') && $(event.target).closest(".nt_search_wrapper").length ) return;
              
              if( isOpened() ) {
                  closeWidget();
              }
          });

          var closeWidget = function() {
              $('body').removeClass('open_search');
            $('.nt_overlay_content').removeClass('visible');
            $('.nt_overlay_footer').removeClass('visible');
          };
          // var closeByEsc = function( e ) {
          //     if (e.keyCode === 27) {
          //         closeWidget();
          //         body.unbind('keyup', closeByEsc);
          //     }
          // };

          var openWidget = function() {
               // Close by esc
               //body.bind('keyup', closeByEsc);

              $('body').addClass('open_search');
              $('.nt_overlay_content').addClass('visible');
            $('.nt_overlay_footer').addClass('visible');
              setTimeout(function() {
                  searchWrapper.find('input[type="text"]').focus();
                  // $(window).one('scroll', function() {
                  //     if( isOpened() ) {
                  //         closeWidget();
                  //     }
                  // });
              }, 300);

          };

          var isOpened = function() {
              return $('body').hasClass('open_search');
          };
      },

      ajaxSearch: function(url) {
         if( !nathan_settings.live_search ) return;
         var currentAjaxRequest = null,
            search_form = $('form.nt-ajax-search');
         search_form.each(function() {
            var input = $(this).find('input[name="q"]');
            input.attr('autocomplete', 'off').bind('keyup', function() {
              //$('.autocomplete-suggestions').html('').hide();
               $('.autocomplete-suggestions').html('').addClass('oh');
               $('.search_extended .autocomplete-suggestions').html('').addClass('oh');
               var term = $(this).val(),
                  form = $(this).closest('form');
                  //console.log(term.trim())
               if (term.trim() == '') {
                  $('.autocomplete-suggestions').html('');
                  // $('.autocomplete-suggestions').html('').hide();
               }else{
                  if( nathan_settings.ajax_search_product ) {
                     var searchURL = '/search?type=product&q=' + term;
                  } else {
                     var searchURL = '/search?q=' + term;
                  }
                  $('body').addClass('search-loading');
                  if (currentAjaxRequest != null) currentAjaxRequest.abort();
                  currentAjaxRequest = jQuery.get(searchURL + '&view='+url, function(data) {
                     $('.autocomplete-suggestions').html(data);
                     $('.search_extended .autocomplete-suggestions').html(data);
                  }).done(function() {
                        if (nathan_settings.show_multiple_currencies && elessiShopifyPre.StorageCurrency() !== null) {
                        Currency.convertAll(shopCurrency, elessiShopifyPre.StorageCurrency(), '.autocomplete-suggestions span.money');
                       }
                     setTimeout(function(){
                       //$('.autocomplete-suggestions').show();
                       $('body').removeClass('search-loading');  
                     }, 800);
                     setTimeout(function(){
                       $('.autocomplete-suggestions').removeClass('oh');  
                     }, 2500);
                  });
               }
            });
         });
         $('body').bind('click', function(){
            //$('.autocomplete-suggestions').hide();
            //$('body').removeClass('search-loading');
            // $('.nt_overlay_header').removeClass('visible');
            //  $('.nt_overlay_content').removeClass('visible');
            // $('.nt_overlay_footer').removeClass('visible');
        });
      },

      // Init push on header
      initPushMenu : function() {
         $( 'a.push-menu-btn' ).on( 'click', function (e) {
            e.preventDefault();
            $( 'body' ).addClass( 'menu-opened' );
            $( '.mask-overlay, .close-menu' ).on( 'click', function() {
               $( 'body' ).removeClass( 'menu-opened' );
            });
         });
      },

      pin__type : function() {
         if ( $(".pin__wrapper").length == 0 ) return;
         $('body').on('click', '.pin__type:not(.pin__opened)', function(e) {
            //console.log('pin__type');
            e.preventDefault();
            $( '.pin__type' ).removeClass( 'pin__opened' );
             $('.nt_lookbook_masonry,.type_nt_pin_lookbook,.nt_lookbook_slider').css("z-index", "");
            $( this ).addClass( 'pin__opened' );
            $( this ).closest('.shopify-section').css("z-index", "9999999");
         });
         $('body').on('click', '.pin__opened', function(e) {
            e.preventDefault();
             if ($(e.target).closest(".popup__content").length ) return;
           // console.log('pin__opened');
            $( this ).removeClass( 'pin__opened' );
            $('.nt_lookbook_masonry,.type_nt_pin_lookbook,.nt_lookbook_slider').css("z-index", "");
         });
         $( '.pin__wrapper' ).on( 'click', function(e) {
             e.preventDefault();
             if ( $(e.target).is('.pin__title.flex.c_center.alin_center') || $(e.target).closest(".popup__content").length ) return;
            //console.log('pin__wrapper');
            $( '.pin__type' ).removeClass( 'pin__opened' );
            $('.nt_lookbook_masonry,.type_nt_pin_lookbook,.nt_lookbook_slider').css("z-index", "");
         });
         $( '.pin__wrapper .product-info-wrap .name a,.nt_lookbook_masonry .hover-wrap a,.pin__wrapper .hover-overlay>a' ).on( 'click', function(e) {
            var url = $(this).attr('href');
              window.location.href = url;
         });
         $( ".pin__type" ).hover(function() {
            $(this).closest('.pin__wrapper').addClass('pin__mask');
          }, function(){
            $('.pin__wrapper').removeClass('pin__mask');
         });
      },
       
      // Accordion mobile menu
      initDropdownMenu : function() {
         $( 'body' ).on('click','.holderr',function(e) {
            e.preventDefault();
            var el = $( this ).closest( 'li' );
            if ( el.hasClass( 'open' ) ) {
               el.removeClass( 'open' );
               el.find( 'li' ).removeClass( 'open' );
               el.closest ( 'ul' ).removeClass( 'ul_open' );
            } else {
               el.addClass( 'open' );
               el.closest ( 'ul' ).addClass( 'ul_open' );
               el.siblings( 'li' ).removeClass( 'open' );
               el.siblings( 'li' ).find( 'li' ).removeClass( 'open' );
            }
         });
         $( 'body' ).on('click','.black_menu>a',function(e) {
            e.preventDefault();
            var el = $( this ).closest( 
               'li.open' );
            el.removeClass( 'open' );
            el.closest ( 'ul' ).removeClass( 'ul_open' );
         });
         $(".nt-canvas-menu").on('click', '.nt-mobile-tabs h3', function() {
           if( $(this).hasClass('active') ) return;
           var menuName = $(this).data('tab');
           $(this).parent().find('.active').removeClass('active');
           $(this).addClass('active');
           $('.nt_ui_menu').removeClass('active');
           $('#' + menuName).addClass('active');
       });
      },

      // Accordion mobile footer
      initfooterMenu : function() {
         if( $(window).width() >= 768 && ! $( "#nt_footer" ).hasClass( "footer__collapsed" )) return;
         $( 'body' ).on('click','.footer__collapsed .widget-title',function(e) {
            e.preventDefault();
            var el = $( this ).closest( 'aside' );
            if ( el.hasClass( 'footer-quick-links__collapsed' ) ) {
               el.removeClass( 'footer-quick-links__collapsed' );
            } else {
               //$( '#jas-footer aside' ).removeClass( 'footer-quick-links__collapsed' );
               el.addClass( 'footer-quick-links__collapsed' );
            }
         });
      },

      // Sticky menu
      initStickyMenu : function() {
        var body = $("body"),
            StickyMenu = $(".site_header"),
            stuckClass = "live_stuck",
            stuckStart = 0;

        if( !nathan_settings.header_sticky) return;
        var header_section = $('.header_section');
        if( $('.header_top').length > 0 ) {
            stuckStart = $('.header_top').outerHeight();
        }
        if( $( '.announcement_bar ' ).length > 0  ) {
            stuckStart += $( '.announcement_bar ' ).outerHeight();
        }
        header_section.css("height", "").css("height", header_section.outerHeight());
         $(window).resize(function() {
           // header_section.css("height", header_section.outerHeight());
            //alert(header_section.outerHeight());
         });
         $(window).on("scroll", function(e){
             if($(this).scrollTop() > stuckStart + 30){
                 StickyMenu.addClass(stuckClass);
             }else {
                 StickyMenu.removeClass(stuckClass);
                 //header_section.css("height", "").css("height", header_section.outerHeight());
             }
         });
      },

      // announcement_bar
      announcement_bar : function() {
        var body = $("body"),header_section = $('.header_section');
        if( !body.hasClass('promo_bar_on')) return;
         $( 'body' ).on('click','.close_an_bar',function(e) {
            e.preventDefault();
            body.addClass('hidden_an_bar');
            if( !nathan_settings.header_sticky) return;
            header_section.css("height", "").css("height", header_section.outerHeight() - $( '.announcement_bar ' ).outerHeight());
            $( '.section_transparent .announcement_bar' ).hide();
            $( '.announcement_bar' ).html('');
         });
      },

      // Initialize WC quantity adjust.
      wcQuantityAdjust : function() {
         if ( ! String.prototype.getDecimals ) {
              String.prototype.getDecimals = function() {
                  var num = this,
                      match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
                  if ( ! match ) {
                      return 0;
                  }
                  return Math.max( 0, ( match[1] ? match[1].length : 0 ) - ( match[2] ? +match[2] : 0 ) );
              }
          }
         
          function ShopifyCartChange(variant_id, quantity, callback) {
            var params = {
              type: 'POST',
              url: '/cart/change.js',
              data:  'quantity='+quantity+'&line='+variant_id,
              dataType: 'json',
              success: function(cart) { 
                if ((typeof callback) === 'function') {
                  callback(cart);
                }
              },
              error: function(XMLHttpRequest, textStatus) {
                 elessiShopify.onError(XMLHttpRequest, textStatus);
              }
            };
            jQuery.ajax(params);
          }
          
          $( document ).on( 'change keyup', '.custom-qty', function() {
            var $this = $(this);
            var vid = $this.data('vid'),val = parseInt($this.val()), format = $this.data('format'),price = $this.data('price'), max = $this.attr('max');
            if(isNaN(val)) return 0;
            
            max = isNaN(parseInt(max)) ? 9999: parseInt(max);
            console.log(max);
            if(val > max )
            {
              console.log('xxxx'+ max);
              $this.attr('value', max).val(max);
            }
            val = (val > max) ? max : val;
            
            if(val <= 0 ){
              $this.closest('tr').remove();
            }
            ShopifyCartChange(vid,val, function(res){
               $('.order-total .shopify-Price-amount,.cart-subtotal .shopify-Price-amount').html(elessiShopifyPre.formatMoney(res.total_price,nathan_settings.moneyFormat));
                $this.closest('tr').find('.product-subtotal .shopify-Price-amount').html(elessiShopifyPre.formatMoney(price * val,nathan_settings.moneyFormat));
              $('.cartCount').html(res.item_count);
              if (nathan_settings.show_multiple_currencies && elessiShopifyPre.StorageCurrency() !== null) {
              Currency.convertAll(shopCurrency, elessiShopifyPre.StorageCurrency(), '.container_cat span.money');
             }
              jQuery.get('/cart?view=ship', function(data) {
                   $('.ship_nt_wrap').html(data);
                   setTimeout(function() {
                        if (nathan_settings.show_multiple_currencies && elessiShopifyPre.StorageCurrency() !== null) {
                        Currency.convertAll(shopCurrency, elessiShopifyPre.StorageCurrency(), '.container_cat span.money');
                       }
                   }, 200);   
                });
            });
          });

          $( document ).on( 'click', '.plus, .minus', function() {
              // Get values
              var $qty        = $( this ).closest( '.quantity' ).find( '.qty'),
                  currentVal  = parseFloat( $qty.val() ),
                  max         = parseFloat( $qty.attr( 'max' ) ),
                  min         = parseFloat( $qty.attr( 'min' ) ),
                  step        = $qty.attr( 'step' );

              // Format values
              if ( ! currentVal || currentVal === '' || currentVal === 'NaN' ) currentVal = 0;
              if ( max === '' || max === 'NaN' ) max = '';
              if ( min === '' || min === 'NaN' ) min = 0;
              if ( step === 'any' || step === '' || step === undefined || parseFloat( step ) === 'NaN' ) step = 1;
              // Change the value
              if ( $( this ).is( '.plus' ) ) {
                  if ( max && ( currentVal >= max ) ) {
                      $qty.val( max );
                  } else {
                      $qty.val( ( currentVal + parseFloat( step )).toFixed( step.getDecimals() ) );
                  }
              } else {
                  if ( min && ( currentVal <= min ) ) {
                      $qty.val( min );
                  } else if ( currentVal > 0 ) {
                      $qty.val( ( currentVal - parseFloat( step )).toFixed( step.getDecimals() ) );
                  }
              }

              // Trigger change event
              $qty.trigger( 'change' );
          });
      },

      // Back to top button
      backToTop : function() {
         if (!nathan_settings.backtop || (!nathan_settings.backtop_mobile && $(window).width() < 768) ) return;
         var el = $( '#nt_backtop' );
         $( window ).scroll(function() {
            if( $( this ).scrollTop() > 100 ) {
               el.addClass('show');
            } else {
               el.removeClass('show');
            }
         });
         el.click( function() {
            $( 'body,html' ).animate({
               scrollTop: 0
            }, 500);
            return false;
         });
      },

      // Init Magnific Popup
      initMagnificPopup : function() {
         if ( $( '.nt-magnific-image' ).length > 0 ) {
            $( '.nt-magnific-image' ).magnificPopup({
               type: 'image',
               removalDelay: 500,
               image: {
                  verticalFit: true
               },
               callbacks: {
                  beforeOpen: function() {
                     this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                     this.st.mainClass = this.st.el.attr('data-effect');
                  },
                  open: function() {},
               },
               closeOnContentClick: false,
               midClick: true 
            });
         }
      },
      resizeQuickView : function() {
          var quickViewLeft = ($(window).width() - $('.cd-quick-view').width()) / 2
            , quickViewTop = ($(window).height() - $('.cd-quick-view').height()) / 2;
          $('.cd-quick-view').css({
              "top": quickViewTop,
              "left": quickViewLeft,
          });
      },
      closeQuickView : function(finalWidth, maxQuickWidth) {
          var close = $('.cd-close')
            , activeSliderUrl = close.siblings('.cd-slider-wrapper').find('.selected img').attr('src')
            , selectedImage = $('.empty-box').find('img');
          if ($('.empty-box .main-img').hasClass('nt_bg_lz')) {selectedImage = $('.empty-box').find('.main-img');}
          if (!$('.cd-quick-view').hasClass('velocity-animating') && $('.cd-quick-view').hasClass('add-content')) {
              //selectedImage.attr('src', activeSliderUrl);
             //console.log(' close cd-quick-view');
              elessiShopify.animateQuickView(selectedImage, finalWidth, maxQuickWidth, 'close');
          } else {
              elessiShopify.closeNoAnimation(selectedImage, finalWidth, maxQuickWidth);
          }
      },
      animateQuickView : function(image, finalWidth, maxQuickWidth, animationType) {
          var parentListItem = image.closest('.nt-grid-item')
            , topSelected = image.offset().top - $(window).scrollTop()
            , leftSelected = image.offset().left
            , widthSelected = image.width()
            , heightSelected = image.height()
            , windowWidth = $(window).width()
            , windowHeight = $(window).height()
            , finalLeft = (windowWidth - finalWidth) / 2
            , finalHeight = finalWidth * heightSelected / widthSelected
            , finalTop = (windowHeight - finalHeight) / 2
            , quickViewWidth = (windowWidth * .8 < maxQuickWidth) ? windowWidth * .8 : maxQuickWidth
            , quickViewLeft = (windowWidth - quickViewWidth) / 2;
           // console.log(widthSelected);
          if (animationType == 'open') {
              parentListItem.addClass('empty-box');
              $('.cd-quick-view').css({
                  "top": topSelected,
                  "left": leftSelected,
                  "width": widthSelected,
              }).velocity({
                  'top': finalTop + 'px',
                  'left': finalLeft + 'px',
                  'width': finalWidth + 'px',
              }, 1000, [400, 20], function() {
                  $('.cd-quick-view').addClass('animate-width').velocity({
                      'left': quickViewLeft + 'px',
                      'width': quickViewWidth + 'px',
                  }, 300, 'ease', function() {
                      $('.cd-quick-view').addClass('add-content');
                      $('.product-images-slider_on_ani').slick({
                        rtl: $('body').hasClass('rtl'),
                         dots: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: false,
                        adaptiveHeight: true
                      });
                      elessiShopify.initCountdown_page();
                      elessiShopify.nathanDropdown('.input-dropdown-inner_qv');
                      setTimeout(function() {
                        jQuery(".nt-scroll-quick").nanoScroller({
                          paneClass: "nt-scroll-pane",
                          sliderClass: "nt-scroll-slider",
                          contentClass: "nt-scroll-content-quick",
                          preventPageScrolling: !1
                        });
                      }, 300);
                      if (nathan_settings.show_multiple_currencies && elessiShopifyPre.StorageCurrency() !== null) {
                          Currency.convertAll(shopCurrency, elessiShopifyPre.StorageCurrency(), '.cd-quick-view span.money');
                        }
                      if ( (typeof SPR !== 'undefined' ) && nathan_settings.productreviews && $(".shopify-product-reviews-badge").length > 0 ) {
                         return window.SPR.registerCallbacks(), window.SPR.initRatingHandler(), window.SPR.initDomEls(), window.SPR.loadProducts(), window.SPR.loadBadges();
                        }
                  });
              }).addClass('is-visible');
          } else {
              $('.cd-quick-view').removeClass('add-content').velocity({
                  'top': finalTop + 'px',
                  'left': finalLeft + 'px',
                  'width': finalWidth + 'px',
              }, 300, 'ease', function() {
                  $('body').removeClass('open_quickview');
                  $('.cd-quick-view').removeClass('animate-width').velocity({
                      "top": topSelected,
                      "left": leftSelected,
                      "width": widthSelected,
                  }, 500, 'ease', function() {
                      $('.cd-quick-view').removeClass('is-visible');
                      parentListItem.removeClass('empty-box');
                  });
              });
          }
      },
      closeNoAnimation : function(image, finalWidth, maxQuickWidth) {
          var parentListItem = image.parent('.cd-item')
            , topSelected = image.offset().top - $(window).scrollTop()
            , leftSelected = image.offset().left
            , widthSelected = image.width();
          $('body').removeClass('open_quickview');
          parentListItem.removeClass('empty-box');
          $('.cd-quick-view').velocity("stop").removeClass('add-content animate-width is-visible').css({
              "top": topSelected,
              "left": leftSelected,
              "width": widthSelected
          });
      },

      // Product quick view
      initQuickView  : function() {
                  
         $( 'body' ).on( 'click', '.open-quick-view', function(e) {
           e.preventDefault();
            var btn = $(this);
            $.ajax({
              beforeSend : function (){
                btn.addClass('btn-loading');
              },
              url: $(this).attr('data-ajax'),
              success: function(data) {
                // alert(response)
                $('.cd-quick-view').empty().html(data);
                     var product = btn.parents('.nt-grid-item'),
                        selectedImage = product.find('img').first(),
                        main_img = (product.find('.main-img').hasClass('nt_bg_lz')), 
                        slectedImageUrl = selectedImage.attr('src');
                     if (main_img) {selectedImage = product.find('.main-img');}
                     $('.cd-quick-view img').slice( 0, 1 ).imagesLoaded().done( function( instance ) {
                       $('body').addClass('open_quickview');
                      elessiShopify.animateQuickView(selectedImage, sliderFinalWidth, maxQuickWidth, 'open');
                      btn.removeClass('btn-loading');
                     });
              },
              complete: function() {Shopify.PaymentButton.init();}
            }).done(function() {
                
            })
         });
         $( 'body' ).on( 'click', '.open-qv-mpf', function(e) {
           e.preventDefault();
            var btn = $(this);
            $.ajax({
              beforeSend : function (){
                btn.addClass('btn-loading');
                $('body').addClass('open_gl_quick_view');
              },
              url: $(this).attr('data-ajax'),
              success: function(data) {
                $('.popup-quick-view img').slice(0).imagesLoaded().done( function( instance ) {
                   $.magnificPopup.open({
                     items: {
                       src: '<div class="mfp-with-anim popup-quick-view" id="content_quickview">' + data + '</div>', // can be a HTML string, jQuery object, or CSS selector
                       type: 'inline'
                     },
                     removalDelay: 500, //delay removal by X to allow out-animation
                     callbacks: {
                       beforeOpen: function() {
                         this.st.mainClass = 'mfp-move-horizontal';
                       },
                       open: function() {
                         $('.product-images-slider_on_mfp').slick({
                           rtl: $('body').hasClass('rtl'),
                            dots: true,
                           slidesToShow: 1,
                           slidesToScroll: 1,
                           infinite: false
                         });
                          elessiShopify.initCountdown_page();
                         elessiShopify.nathanDropdown('.input-dropdown-inner_qv');
                         Shopify.PaymentButton.init();
                         if (nathan_settings.show_multiple_currencies && elessiShopifyPre.StorageCurrency() !== null) {
                             Currency.convertAll(shopCurrency, elessiShopifyPre.StorageCurrency(), '.product-quick-view span.money');
                           }
                         if ( (typeof SPR !== 'undefined' ) && nathan_settings.productreviews && $(".shopify-product-reviews-badge").length > 0 ) {
                            return window.SPR.registerCallbacks(), window.SPR.initRatingHandler(), window.SPR.initDomEls(), window.SPR.loadProducts(), window.SPR.loadBadges();
                           }
                       },
                       close: function() {
                         $( '#content_quickview' ).empty();
                        $('body').removeClass('open_gl_quick_view');
                       }
                     },
                  });
               });
              },
              complete: function() {Shopify.PaymentButton.init();}
            }).done(function() {
                btn.removeClass('btn-loading');
                //$('body').removeClass('open_gl_quick_view');
            })
         });
      },

      // QuickShop
      NTQuickShop: function() {
         var btnSelector = '.btn-quick-shop';


         $(document).on('click', btnSelector, function( e ) {
              e.preventDefault();
              var $this = $(this),
                  $product = $this.parents('.product').first(),
                  $content = $product.find('.nt-qs-form'),
                  ajaxurl = $(this).attr('data-ajax'),
                  id = $(this).attr('data-id'),
                  loadingClass = 'btn-loading';
                  console.log($('.nt-qs-shown.nt-qs-loaded.nt_'+id).length > 0)
               if ($('.nt-qs-shown.nt-qs-loaded.nt_'+id).length > 0){
                  //$('.nt-qs-shown.nt-qs-loaded .nt-qs-close-'+id).click();
                  $('.nt-qs-shown.nt-qs-loaded.nt_'+id).removeClass('nt-qs-shown nt-qs-loaded');
                  $('.product.nt_'+id+' .nt-qs-form').html('');
               }
              if( $this.hasClass(loadingClass) ) return;


              // Simply show quick shop form if it is already loaded with AJAX previously
              if( $product.hasClass('nt-qs-loaded') ) {
                  $product.addClass('nt-qs-shown');
                  return;
              }

              $this.addClass(loadingClass);
              $product.addClass('loading-qs');

              $.ajax({
                  url: ajaxurl,
                  dataType: 'html',
                  type: 'GET',
                  success: function(data) {
                     $content.append(data);

                  },
                  complete: function() {
                      $this.removeClass(loadingClass);
                      $product.removeClass('loading-qs');
                      $product.addClass('nt-qs-shown nt-qs-loaded');
                      //elessiShopify.nathanDropdown_qs();
                      elessiShopify.nathanDropdown('.input-dropdown-inner_qs'+id);
                      setTimeout(function() {
                     jQuery(".nt-scroll-quick-shop").nanoScroller({
                       paneClass: "nt-scroll-pane",
                       sliderClass: "nt-scroll-slider",
                       contentClass: "nt-scroll-content-quick-shop",
                       preventPageScrolling: !1
                     });
                   }, 300);
                      if (nathan_settings.show_multiple_currencies && elessiShopifyPre.StorageCurrency() !== null) {
                       Currency.convertAll(shopCurrency, elessiShopifyPre.StorageCurrency(), '.variations_form_qs span.money');
                     }
                     //Shopify.PaymentButton.init();
                  },
                  error: function() {
                     console.log('Quick Shop error')
                  },
              });

          })

          .on('click', '.nt-qs-close', function() {
              var $this = $(this),
                  $product = $this.parents('.product'),
                  $content = $product.find('.nt-qs-form');;

              $product.removeClass('nt-qs-shown');
               //$product.removeClass('nt-qs-shown nt-qs-loaded');
              //$content.html('');
          });

         $( document.body ).on( 'added_to_cart', function() {
              $('.nt-qs-close').click();
         });

      },

      // catelog mode
      catelog_mode: function() {
         if( ! $('body').hasClass('catalog_mode_on') ) return;
         var body = $("body");
            var html = [
                '<div class="added-to-cart">',
                    '<h3>' + nathan_settings.catelog_title + '</h3>',
                    '<p>' + nathan_settings.catelog_info + '</p>',
                    '<p>' + nathan_settings.catelog_info_2 + '</p>',
                    '<a href="#" class="cate-close-popup button view-cart">' + nathan_settings.catelog_btn + '</a>',
                '</div>',
            ].join("");
            // Append new quantity selector then remove original
            $.magnificPopup.open({
                callbacks: {
                    beforeOpen: function() {
                        this.st.mainClass = elessiTheme.popupAnimation + ' cart-popup-wrapper';
                    },
                },
                items: {
                    src: '<div id="login-wishlist" class="nt_login-wishlist white-popup popup-catelog_mode popup-added_to_cart">' + html + '</div>',
                    type: 'inline'
                }
            });

            $('.nt_login-wishlist').on('click', '.cate-close-popup', function(e) {
                e.preventDefault();
                $.magnificPopup.close();
            });
      },

      // Login before using wishlist
      loginWishlist: function() {
         if( !nathan_settings.wishlist ) return;
         var body = $("body");
         body.on('click', '.nitro_wishlist_login', function(event) {
            event.preventDefault();
            var $this = $(this);
            $this.parent().addClass("feid-in");
            var html = [
                '<div class="added-to-cart">',
                    '<p>' + nathan_settings.info_wishlist + '</p>',
                    '<a href="#" class="btn-style-link close-popup">' + nathan_settings.continue_shopping + '</a>',
                    '<a href="/account/login" class="button view-cart">' + nathan_settings.login + '</a>',
                '</div>',
            ].join("");
            // Append new quantity selector then remove original
            $.magnificPopup.open({
                callbacks: {
                    beforeOpen: function() {
                        this.st.mainClass = elessiTheme.popupAnimation + ' cart-popup-wrapper';
                    },
                     close: function() {
                      $this.parent().removeClass("feid-in");
                     }
                },
                items: {
                    src: '<div id="login-wishlist" class="nt_login-wishlist white-popup add-to-cart-popup popup-added_to_cart">' + html + '</div>',
                    type: 'inline'
                }
            });

            $('.nt_login-wishlist').on('click', '.close-popup', function(e) {
                e.preventDefault();
                $.magnificPopup.close();
            });
          }); 
      },
      
      // Add wishlist
       wishList: function() {
         if( !nathan_settings.wishlist ) return;
          var body = $("body");
          body.on("click", ".nt_add_wishlist > a", function(event) {
            event.preventDefault();
            var $this = $(this),
               id = $this.data('id'),
               holder = $('.add-to-wishlist-'+id),
               pr_this = holder.find('.nt_add_wishlist'),
               load = holder.find('.nt_adding_wishlist'),
               added = holder.find('.nt_addedbrowse_wishlist');
            pr_this.hide();
            load.show();
            $.ajax({
               url: 'https://nitro-wishlist.teathemes.net?shop='+ Shopify.shop,
               type: 'POST',
               cache: true,
               data: $this.data(),
               success: function(data,status) {
                  try{
                     data = $.parseJSON(data);
                  }
                  catch(ex){
                     //console.log(ex);
                  }
                  if(data.status == 'success' && status == 'success')
                  {
                     added.show();
                     load.hide();
                     pr_this.hide();
                     $('.nt_count_wishlist').html(function(i, val) { return val*1+1 });
                  }else{
                     load.hide();
                     pr_this.show();
                     console.log('Error: '+data.message);
                  }
               },
               error: function(data) {
                  load.hide();
                  pr_this.show();
                  if(data.status==404) {
                     alert('This feature is not available because there is no  Nitro Wishlist app installed. Please install Nitro Wishlist app first  when using Wishlist in Shop.');
                  } else {
                     console.log('Error: '+data.message);
                  }
               },
           });
         });
      },
      
      // Remove wishlist
      removeWishlist: function() {
         if( !nathan_settings.wishlist ) return;
         var body = $("body");
         body.on("click", ".remove_from_wishlist", function(event) {
            event.preventDefault();
            var $this = $(this),
               value = $(this).data('id');
            $.ajax({
              url: 'https://nitro-wishlist.teathemes.net?shop='+ Shopify.shop,
              type: 'POST',
               data: $this.data(),
               beforeSend: function(data){
                 $.blockUI({
                    message: null,
                    css: {
                      backgroundColor: '#fff',
                      opacity: 0.6
                    }
                  });
               },
               success: function(data,status) {
                  try{
                     data = $.parseJSON(data);
                  }
                  catch(ex){
                     //console.log(ex);
                  }
                  if(data.status == 'success' && status == 'success') {
                     $('.nt_count_wishlist').html(function(i, val) { return val*1-1 });
                     $("#yith-wcwl-row-" + value).remove();
                     var rowCount = $('.wishlist_table > tbody > tr').length;
                     if (rowCount < 1) {
                         $('.wishlist_table tbody').empty();
                         $('.wishlist_table tbody').append('<tr><td colspan="6" class="wishlist-empty tc">'+ nathan_settings.nowishlist +'</td>');
                     } 
                  } else {
                     console.log('Error: '+data.message);
                  }
               },
               error: function(data) {
                  $( '.loader' ).remove();
                  console.log('Error: '+data.message);
               },
               complete: function() {
                  setTimeout(function() {
                    $.unblockUI();
                  }, 200);
               }
            });
         });
      },
    
      // Extra content on single product ( Help & Shipping - Return )
      wcExtraContent : function() {
        if ( $( '.nt-wc-help' ).length > 0 ) {
           $('.nt-wc-help').magnificPopup({
               type: 'inline',
               removalDelay: 500,
               callbacks: {
                 beforeOpen: function() {
                    this.st.mainClass = this.st.el.attr('data-effect');
                 }
              },
              midClick: true
            });
        }
      },

      // Init mini cart on header
      initMiniCart : function() {
         $( 'body' ).on( 'click', '.ajax-cart__toggle > a', function (e) {
            e.preventDefault();
            $( 'body' ).addClass( 'cart-opened drawer--active' );
            if ($('.cart-drawer__content').height() < $('.cart-drawer__content-container').height()) {
             $('.cart-drawer').addClass('is-scrollable');
             setTimeout(function(){ $('.cart-drawer').removeClass('is-scrollable')}, 1500);
            }
            $( 'body' ).on( 'click', '.mask-overlay, .close-cart', function () {
               $( 'body' ).removeClass( 'cart-opened drawer--active' );
            });
            $(document).keyup(function(event) {
                if (event.which == '27' && $('body').hasClass('cart-opened')) {
                 $( 'body' ).removeClass( 'cart-opened drawer--active' );
                }
            });
         });
      },

      loginSide : function() {
         $( 'body' ).on( 'click', '.login_side_open', function (e) {
            e.preventDefault();
            $( 'body' ).addClass( 'login-opened drawer--active' );
            $( 'body' ).on( 'click', '.mask-overlay, .close-cart', function () {
               $( 'body' ).removeClass( 'login-opened drawer--active' );
            });
            $(document).keyup(function(event) {
                if (event.which == '27' && $('body').hasClass('login-opened')) {
                 $( 'body' ).removeClass( 'login-opened drawer--active' );
                }
            });
         });
      },
      
      // Error functionality with AJAX
      onError: function(XMLHttpRequest, textStatus) {
         var data = eval('(' + XMLHttpRequest.responseText + ')');
            var html = [
             '<div class="pop_up_notify pop_up_notify_error"><div class="notify_error_wrapper"><span class="icon_nt"><i class="fa fa-frown-o" aria-hidden="true"></i></span>',
                 '<span class="error_text_nt">' +data.message + ': ' + data.description + '</span>',
             '</div></div>',
         ].join("");
         $('.pop_up_notify_error').remove();
         $('body').prepend(html); 
      },

      // Add from cart functionality with AJAX
      AJAXFormAddToCart: function() {
          $( document ).on('click', '.ajax_form_cart', function(e) {
              e.preventDefault();
              var $this = $(this);
              $(this).attr('disabled', 'disabled').css('pointer-events', 'none').addClass('btn--loader-active');
              $.ajax({
                  type: 'POST',
                  url: '/cart/add.js',
                  data: $this.closest('form').serialize(),
                  dataType: 'json',
                  success:function( cart ) {
                        $.get('/cart?view=json', function(data,status) {
                          /*optional stuff to do after success */
                          $('.widget_shopping_cart_content').html(data);
                        }).always(function() {
                           var subtotal = parseFloat($('.widget_shopping_cart_body').data('subtotal'));
                           $(".nathan-cart-subtotal >span").html(elessiShopifyPre.formatMoney(subtotal, nathan_settings.moneyFormat));
                           $(".cartCount").html($('.widget_shopping_cart_body').data('count'));
                           elessiShopify.favicon_counter(parseInt($('.widget_shopping_cart_body').data('count')));
                           elessiShopify.nanoScroller();
                           if (nathan_settings.show_multiple_currencies && elessiShopifyPre.StorageCurrency() !== null) {
                              Currency.convertAll(shopCurrency, elessiShopifyPre.StorageCurrency(), '.widget_shopping_cart_content span.money');
                              Currency.convertAll(shopCurrency, elessiShopifyPre.StorageCurrency(), '.nathan-cart-subtotal span.money');
                           }
                           if (parseInt($('.widget_shopping_cart_body').data('count')) > 0 ) { elessiShopify.initAddToCart(cart.image,cart.title);}
                           $this.removeAttr("disabled").css('pointer-events', 'auto').removeClass("btn--loader-active");
                        });
                        
                  },
                  error: function(XMLHttpRequest, textStatus) {
                     $this.removeAttr("disabled").css('pointer-events', 'auto').removeClass("btn--loader-active");
                    elessiShopify.onError(XMLHttpRequest, textStatus);
                  }
              });
          })
      },

      // Add to cart functionality with AJAX
      AJAXAddToCart: function() {
          $( document ).on('click', '.ajax_add_to_cart', function(e) {
              e.preventDefault();
              var $this = $(this),
                  gridItem = $this.closest('.nt-grid-item'),
                  aniItem = $('.cart-animation'),
                  variant_id = $this.data('pid');
              $this.addClass('btn-loading');
               $this.parent().addClass('fix_nt_tt');
              $.ajax({
                  type: 'POST',
                  url: '/cart/add.js',
                  data: {quantity: 1, id:variant_id},
                  dataType: 'json',
                  success:function( cart ) {
                        $.get('/cart?view=json', function(data) {
                             /*optional stuff to do after success */
                             $('.widget_shopping_cart_content').html(data);
                           }).always(function() {
                              var subtotal = parseFloat($('.widget_shopping_cart_body').data('subtotal'));
                           $(".nathan-cart-subtotal >span").html(elessiShopifyPre.formatMoney(subtotal, nathan_settings.moneyFormat));
                               var quantity = parseInt(gridItem.find('[name="quantity"]').val(), 10) || 1;
                              //elessiShopify.cartAnimation($this,quantity,aniItem);
                              elessiShopify.favicon_counter(parseInt($('.widget_shopping_cart_body').data('count')));
                              $(".cartCount").html($('.widget_shopping_cart_body').data('count'));
                              //elessiShopify.nanoScroller();
                              if (nathan_settings.show_multiple_currencies && elessiShopifyPre.StorageCurrency() !== null) {
                               Currency.convertAll(shopCurrency, elessiShopifyPre.StorageCurrency(), '.widget_shopping_cart_content span.money');
                               Currency.convertAll(shopCurrency, elessiShopifyPre.StorageCurrency(), '.nathan-cart-subtotal span.money');
                             }
                             if (parseInt($('.widget_shopping_cart_body').data('count')) > 0 ) { elessiShopify.initAddToCart(cart.image,cart.title);}
                             if (window.Shopify && Shopify.StorefrontExpressButtons && nathan_settings.use_additional_checkout_buttons) {
                                Shopify.StorefrontExpressButtons.initialize();
                              }
                             $this.removeAttr("disabled").css('pointer-events', 'auto').removeClass("btn-loading");
                          });
                  },
                  error: function(XMLHttpRequest, textStatus) {
                    $this.removeClass("btn-loading");
                    elessiShopify.onError(XMLHttpRequest, textStatus);
                  }
              }).done(function() {
              });
          })
      },

      // Trigger add to cart button
      initAddToCart : function(image,title) {
           var timeoutNumber = 0;
           if( nathan_settings.add_to_cart_action == 'popup' ) {
               var html = [
                   '<div class="added-to-cart">',
                       '<p>' + nathan_settings.added_to_cart + '</p>',
                       '<a href="#" class="btn btn-style-link close-popup">' + nathan_settings.continue_shopping + '</a>',
                       '<a href="/cart" class="button view-cart">' + nathan_settings.view_cart + '</a>',
                   '</div>',
               ].join("");
               $.magnificPopup.open({
                   callbacks: {
                       beforeOpen: function() {
                           this.st.mainClass = elessiTheme.popupAnimation + '  cart-popup-wrapper';
                       },
                   },
                   items: {
                       src: '<div class="white-popup add-to-cart-popup popup-added_to_cart">' + html + '</div>',
                       type: 'inline'
                   }
               });

               $('.white-popup').on('click', '.close-popup', function(e) {
                   e.preventDefault();
                   $.magnificPopup.close();
               });
             } else if( nathan_settings.add_to_cart_action == 'popup_upsell' ) {
               $.ajax({
                  url: '/cart/?view=upsell',
                  dataType: 'html',
                  type: 'GET',
                  beforeSend : function (){
                     $( 'body' ).addClass('cart__popup_opend');
                    $( '#jas-wrapper' ).after( '<div class="loader"><div class="loader-inner"></div></div>' );
                  },
                  success: function(data) {
                    // Open directly via API
                    $.magnificPopup.open({
                      items: {
                        src: '<div class="mfp-with-anim product-quickview popup-quick-view cart__popup cart__popup_upsell pr"><div id="content_cart__popup_nt">' + data + '</div></div>',
                        type: 'inline'
                      },
                      removalDelay: 500, //delay removal by X to allow out-animation
                      callbacks: {
                        beforeOpen: function() {
                          this.st.mainClass = 'mfp-move-horizontal';
                        },
                        open: function() {
                           //elessiShopify.search_true('#upsell_nt',NTsettingspr.ProductID,'nathan_upsell');
                           elessiShopify.checkoutIndicator();
                           elessiShopify.wcPopupAddtocart();
                           // if (nathan_settings.show_multiple_currencies && elessiShopifyPre.StorageCurrency() !== null) {
                       //      Currency.convertAll(shopCurrency, elessiShopifyPre.StorageCurrency(), '#content_cart__popup_nt span.money');
                       //    }
                       //    elessiShopify.nanoScroller();
                        },
                        change: function() { },
                        close: function() {
                           $( 'body' ).removeClass('cart__popup_opend');
                          $( '#content_cart__popup_nt' ).empty();
                        }
                      },
                    });
                  },
                  complete: function() {
                     if (nathan_settings.show_multiple_currencies && elessiShopifyPre.StorageCurrency() !== null) {
                         Currency.convertAll(shopCurrency, elessiShopifyPre.StorageCurrency(), '#content_cart__popup_nt span.money');
                       }
                     if (window.Shopify && Shopify.StorefrontExpressButtons && nathan_settings.use_additional_checkout_buttons) {
                             Shopify.StorefrontExpressButtons.initialize();
                           }
                       elessiShopify.nanoScroller();
                    $( '.loader' ).remove();
                  },
                  error: function() {
                    $( '.loader' ).remove();
                    console.log('Quick view error');
                  }
                });
            } else if( nathan_settings.add_to_cart_action == 'popup_2' ) { 
               $('.pop_up_notify_pr').remove();
               $('body').prepend('<div class="pop_up_notify pop_up_notify_pr"><div class="notify_img" style="background-image:url('+image.replace(".jpg", "_350x.jpg").replace(".png", "_350x.png").replace(".gif", "_350x.gif")+')"></div><div class="notify_text">'+nathan_settings.notify_cart.replace("{{title}}", title)+'</div></div>');  
            } else if( nathan_settings.add_to_cart_action == 'popup_upsell' ) {
               $.ajax({
                  url: '/cart/?view=upsell',
                  dataType: 'html',
                  type: 'GET',
                  beforeSend : function (){
                     $( 'body' ).addClass('cart__popup_opend');
                    $( '#jas-wrapper' ).after( '<div class="loader"><div class="loader-inner"></div></div>' );
                  },
                  success: function(data) {
                    // Open directly via API
                    $.magnificPopup.open({
                      items: {
                        src: '<div class="mfp-with-anim product-quickview popup-quick-view cart__popup cart__popup_upsell pr"><div id="content_cart__popup_nt">' + data + '</div></div>',
                        type: 'inline'
                      },
                      removalDelay: 500, //delay removal by X to allow out-animation
                      callbacks: {
                        beforeOpen: function() {
                          this.st.mainClass = 'mfp-move-horizontal';
                        },
                        open: function() {
                          // elessiShopify.checkoutIndicator();
                           if (nathan_settings.show_multiple_currencies && elessiShopifyPre.StorageCurrency() !== null) {
                            Currency.convertAll(shopCurrency, elessiShopifyPre.StorageCurrency(), '.cart__popup_upsell span.money');
                          }
                       //    elessiShopify.nanoScroller();
                        },
                        change: function() { },
                        close: function() {
                           $( 'body' ).removeClass('cart__popup_opend');
                          $( '#content_cart__popup_nt' ).empty();
                        }
                      },
                    });
                  },
                  complete: function() {
                     if (nathan_settings.show_multiple_currencies && elessiShopifyPre.StorageCurrency() !== null) {
                         Currency.convertAll(shopCurrency, elessiShopifyPre.StorageCurrency(), '#content_cart__popup_nt span.money');
                       }
                     if (window.Shopify && Shopify.StorefrontExpressButtons && nathan_settings.use_additional_checkout_buttons) {
                             Shopify.StorefrontExpressButtons.initialize();
                           }
                       //elessiShopify.nanoScroller();
                    $( '.loader' ).remove();
                  },
                  error: function() {
                    $( '.loader' ).remove();
                    console.log('Quick view error');
                  }
                });
            } else if( nathan_settings.add_to_cart_action == 'no' ) {
               document.location.href="/cart";
            } else {
               // Display Hidden sidebar or dropdown
               clearTimeout(timeoutNumber);
                  if( $('.ajax-cart__toggle').length > 0 ) {
                        if( $('body').hasClass('open_gl_quick_view') ) {
                           $.magnificPopup.close();
                        }
                        if( $('body').hasClass('open_quickview') ) {
                           elessiShopify.closeQuickView(sliderFinalWidth, maxQuickWidth);
                        }
                      $('.ajax-cart__toggle > a').trigger('click');
                  } else {
                     $('.nathan-action .nathan-cart-icon').addClass('nt_hover event_hover');
                     if( $('body').hasClass('open_gl_quick_view') ) {
                        $.magnificPopup.close();
                     }
                     if ($(window).scrollTop() > 100 && $('.site_header').hasClass('live_stuck') == false ) {
                        $('html, body').animate({
                           scrollTop: 0
                        }, 1000);
                     }
                     timeoutNumber = setTimeout(function() {
                        $('.nathan-action .nathan-cart-icon').removeClass('event_hover');
                     }, 3500 );
                     timeoutNumber = setTimeout(function() {
                        $('.nathan-action .nathan-cart-icon').removeClass('nt_hover');
                     }, 4000 );
                     if (window.Shopify && Shopify.StorefrontExpressButtons && nathan_settings.use_additional_checkout_buttons) {
                        Shopify.StorefrontExpressButtons.initialize();
                     }
                  }
               if ($('.cart-drawer__content').height() < $('.cart-drawer__content-container').height()) {
                $('.cart-drawer').addClass('is-scrollable');
                setTimeout(function(){ $('.cart-drawer').removeClass('is-scrollable')}, 1500);
               }
           }
      },
      
      // Remove from cart functionality with AJAX
      AJAXRemoveFromCart: function() {
          $( document ).on('click', '.widget_shopping_cart_content .remove', function(e) {
              e.preventDefault();

              var $this = $(this),
                  $widget = $('.widget_shopping_cart_content'),
                  remove_item = $this.data('remove_item'),
                  variant_id = $this.data('product_id');

              $widget.addClass('removing-process');
              $.ajax({
                  type: 'POST',
                  url: '/cart/change.js',
                  data:  'quantity=0&line='+variant_id,
                  dataType: 'json',
                  success:function( cart ) {
                    $.get('/cart?view=json', function(data) {
                        $('.widget_shopping_cart_content').html(data);
                    }).always(function() {
                        var subtotal = parseFloat($('.widget_shopping_cart_body').data('subtotal'));
                        //console.log(subtotal)
                        $(".nathan-cart-subtotal >span").html(elessiShopifyPre.formatMoney(subtotal, nathan_settings.moneyFormat));
                        $(".cartCount").html($('.widget_shopping_cart_body').data('count'));
                         elessiShopify.favicon_counter(parseInt($('.widget_shopping_cart_body').data('count')));
                        //elessiShopify.nanoScroller();
                           if (nathan_settings.show_multiple_currencies && elessiShopifyPre.StorageCurrency() !== null) {
                           Currency.convertAll(shopCurrency, elessiShopifyPre.StorageCurrency(), '.widget_shopping_cart_content span.money');
                           Currency.convertAll(shopCurrency, elessiShopifyPre.StorageCurrency(), '.nathan-cart-subtotal span.money');
                          }
                          if (window.Shopify && Shopify.StorefrontExpressButtons && nathan_settings.use_additional_checkout_buttons) {
                             Shopify.StorefrontExpressButtons.initialize();
                           }
                        $widget.removeClass('removing-process');
                      });
                  },
               error: function(XMLHttpRequest, textStatus) {
                  elessiShopify.onError(XMLHttpRequest, textStatus);
                   $widget.removeClass('removing-process');
               }
             });
         })
      },

      //
      AJAXchangeFromCart: function() {
         $( document ).on( 'change','.cart__popup-qty--input', function( e ) {
              e.preventDefault();
              $('.widget_shopping_cart_body input[type="number"]').attr('disabled', true); 
              var $this = $(this),
                  $widget = $('.widget_shopping_cart_content'),
                  qty_item = parseInt($this.val()),
                  max_qty = $this.attr("max"),
                  data_val = $this.attr("data-val"),
                  variant_id = $this.data('product_id');

              $widget.addClass('removing-process');
              if(qty_item > max_qty) {
                 var html = [
                   '<div class="pop_up_notify pop_up_notify_error"><div class="notify_error_wrapper"><span class="icon_nt"><i class="fa fa-frown-o" aria-hidden="true"></i></span>',
                       '<span class="error_text_nt">' +nathan_settings.we_only_stock.replace('[max]', max_qty) + '</span>',
                   '</div></div>',
                ].join("");
                $('.pop_up_notify_error').remove();
                $('body').prepend(html); 
                $this.val(data_val);
                $widget.removeClass('removing-process');
                $('.widget_shopping_cart_body input[type="number"]').attr('disabled', false); 
               return false;
              }
              if ($('.cart__popup-qty--input').hasClass('on_page')) return;
              $.ajax({
                  type: 'POST',
                  url: '/cart/change.js',
                  data:  'quantity='+qty_item+'&line='+variant_id,
                  dataType: 'json',
                  success:function( cart ) {
                     $this.attr("data_val",qty_item);
                     $.get('/cart?view=json', function(data) {
                        $('.widget_shopping_cart_content').html(data);
                    }).always(function() {
                        var subtotal = parseFloat($('.widget_shopping_cart_body').data('subtotal'));
                        //console.log(subtotal)
                        $(".nathan-cart-subtotal >span").html(elessiShopifyPre.formatMoney(subtotal, nathan_settings.moneyFormat));
                        $(".cartCount").html($('.widget_shopping_cart_body').data('count'));
                         elessiShopify.favicon_counter(parseInt($('.widget_shopping_cart_body').data('count')));
                        //elessiShopify.nanoScroller();
                           if (nathan_settings.show_multiple_currencies && elessiShopifyPre.StorageCurrency() !== null) {
                           Currency.convertAll(shopCurrency, elessiShopifyPre.StorageCurrency(), '.widget_shopping_cart_content span.money');
                           Currency.convertAll(shopCurrency, elessiShopifyPre.StorageCurrency(), '.nathan-cart-subtotal span.money');
                          }
                          if (window.Shopify && Shopify.StorefrontExpressButtons && nathan_settings.use_additional_checkout_buttons) {
                             Shopify.StorefrontExpressButtons.initialize();
                          }
                        $widget.removeClass('removing-process');
                        $('.widget_shopping_cart_body input[type="number"]').attr('disabled', false); 
                      });
                  },
               error: function(XMLHttpRequest, textStatus) {
                  elessiShopify.onError(XMLHttpRequest, textStatus);
                   $widget.removeClass('removing-process');
                   $this.val(data_val);
                   $('.widget_shopping_cart_body input[type="number"]').attr('disabled', false); 
               }
             });
         })
      },
      
      save_note: function() {
         if( ! nathan_settings.save_note ) return;
          // Save note anytime it's changed
          $(document.body).on('change', '.CartSpecialInstructions', function() {
            var newNote = $(this).val(),
                $widget = $('.widget_shopping_cart_content'),
                $checkout = $('.cart-drawer__cart, [name="checkout"], [name="goto_pp"], [name="goto_gc"]'),
                $cart__popup = $('.cart__popup_upsell');
            // Update the cart note in case they don't click update/checkout
            $widget.addClass('removing-process');
            $cart__popup.addClass('loading');
            $checkout.attr('disabled', 'disabled').css('pointer-events', 'none');
            $.ajax({
              type: 'POST',
              url: '/cart/update.js',
              data: 'note=' + elessiShopify.attributeToString(newNote),
              dataType: 'json',
              error: function(XMLHttpRequest, textStatus) {
                elessiShopify.onError(XMLHttpRequest, textStatus);
                 $cart__popup.removeClass('loading');
                $widget.removeClass('removing-process');
              },
              complete: function() {
                $widget.removeClass('removing-process');
                $cart__popup.removeClass('loading');
                $checkout.removeAttr("disabled").css('pointer-events', 'auto');
              }
            });
          });
       },
       attributeToString: function(attribute) {
        if ((typeof attribute) !== 'string') {
          attribute += '';
          if (attribute === 'undefined') {
            attribute = '';
          }
        }
        return jQuery.trim(attribute);
      },

      // Open video in popup
      wcInitPopupVideo : function() {
         if ( $( '.p-video-youtube' ).length > 0 ) {
            $( '.jas-popup-url' ).magnificPopup({
               disableOn: 0,
               type: 'iframe',
            });

            $( '.jas-popup-mp4' ).magnificPopup({
               disableOn: 0,
               type: 'inline',
            });
         }
      },
      
      //Product 360 button
      product360Button: function() {
          $('.p-video-360 a').magnificPopup({
              type: 'inline',
              mainClass: 'mfp-fade',
              removalDelay: 160,
              disableOn: false,
              preloader: false,
              fixedContentPos: false,
              callbacks: {
                  open: function() {
                      $(window).resize()
                  },
              },

          });
      },
      
      // Init wc switch layout
         spInitSwitchLayout: function() {
         $( 'body' ).on( 'click', '.sp-col-switch a', function(e) {
            e.preventDefault();
            var _this     = $( this ),
               _col      = _this.data( 'col' ),
               _parent   = _this.closest( '.sp-col-switch' ),
               $products = $( '.products' ),
               $btnload = $( '.nt-products-load-more' ),
               product = $( '.products .product' ),
               _img_lazy = product.find('.attachment-shop_catalog'),
               _bgimg_lazy = product.find('.nt_bg_lz'),
               _sizer    = $( '.products .grid-sizer' );

            if ( _this.hasClass( 'active' ) ) {
               return;
            }
            _parent.addClass('nt_clicked');
            $('.main-page-wrapper').attr( 'data-perrow',_col );
            elessiShopify.clickOnScrollButton( elessiTheme.nt_btn_load_more , true );
            // $products.find(".spb_animate:not(.start_animation)").waypoint(function(){
            //      $(this).addClass("start_animation animated");
            // }, { offset: '85%' });
            if ($btnload.length > 0){
               var href = $btnload.attr('href'),
                   text = href.replace('inajax15','inajax'+_col).replace('inajax12','inajax'+_col).replace('inajax6','inajax'+_col).replace('inajax4','inajax'+_col).replace('inajax3','inajax'+_col).replace('inajax2','inajax'+_col);
               $btnload.attr('href', text);
             }
            _parent.find( 'a' ).removeClass( 'active' );
            _this.addClass( 'active' );
            if ($products.hasClass('metro') && $(window).width() >= 1024) {
               var _product_small = product.not('.metro-item'),
                  _product_big = $products.find('.metro-item');
                if (_col == '3' || _col == '2') {
                   _product_small.removeClass( 'col-lg-2 col-lg-3 col-lg-4 col-lg-6 col-lg-12 col-lg-15' ).addClass( 'col-lg-' + _col );
                   _product_big.removeClass( 'col-lg-2 col-lg-3 col-lg-4 col-lg-6 col-lg-12 col-lg-15' ).addClass( 'col-lg-6' );
                } else {
                  product.removeClass( 'col-lg-2 col-lg-3 col-lg-4 col-lg-6 col-lg-12 col-lg-15' ).addClass( 'col-lg-' + _col );
                }
            }else if ($(window).width() >= 1024){
               product.removeClass( 'col-lg-2 col-lg-3 col-lg-4 col-lg-6 col-lg-12 col-lg-15' ).addClass( 'col-lg-' + _col );
            }else{
               if (_col == '4' || _col == '6' ) {
               product.removeClass( 'col-md-2 col-md-3 col-md-4 col-md-6 col-md-12 col-md-15' ).addClass( 'col-md-' + _col );
               product.removeClass( 'col-2 col-3 col-4 col-6 col-12 col-15' ).addClass( 'col-6' );
              } else{
               product.removeClass( 'col-md-2 col-md-3 col-md-4 col-md-6 col-md-12 col-md-15' ).addClass( 'col-md-4' );
               product.removeClass( 'col-2 col-3 col-4 col-6 col-12 col-15' ).addClass( 'col-12' );
              }
            }
           // _sizer.removeClass( 'size-2 size-3 size-4 size-6 size-12 size-15' ).addClass( 'size-' + _col )
            if ( $( '.products' ).hasClass( 'nt-masonry' ) ) {
                setTimeout(function(){ $( '.jas-filter-wrap' ).removeClass( 'oh' ); }, 500);
                if (_bgimg_lazy.length == 0){
                  //console.log('nohas')
                  _img_lazy.removeClass('lazyloaded').addClass('lazyload')
               } else {
                  //console.log('has')
                  //elessiShopify.EqualHeight();
                  _bgimg_lazy.removeClass('lazyloaded').addClass('lazyload')
               }
               $('.nt-masonry').isotope('layout');
               setTimeout(function(){ $('.nt-masonry').isotope('layout'); }, 800);
            }
         });
      },

      // Init sidebar filter
      spInitSidebarFilter : function() {
         if ( $( '.nt_pop_sidebar' ).length > 0 ) {
          $( 'body' ).on( 'click', '.nt_pop_sidebar,.nt_fil_sidebar', function(e) {
            $( '#nathan-wrapper' ).removeClass( 'pr' );
            $( 'body' ).toggleClass( 'filter_opened' );
            $( this ).toggleClass('opened');
            $( '.mask-overlay,.close-filter' ).on( 'click', function() {
              $( '#nathan-wrapper' ).addClass( 'pr' );
                $( 'body' ).removeClass( 'filter_opened' );
               $( '.nt_pop_sidebar' ).removeClass( 'opened' );
            });
            $('body').on('click', elessiTheme.pjaxLink, function() {
              $( '#nathan-wrapper' ).addClass( 'pr' );
              $( 'body' ).removeClass( 'filter_opened' );
              $( '.nt_pop_sidebar' ).removeClass( 'opened' );
            });
            e.preventDefault();
         });
        } else if ( $( '.nt-top-sidebar' ).length > 0 ) {
           $( 'body' ).on( 'click', '.nt_fil_sidebar', function(e) {
              e.preventDefault();
              $('.pop_default ').click();
              $('html, body').stop().animate({
                  scrollTop: $('.container_cat').offset().top - 100
              }, 400);
           });
         }
      },

       // Init sidebar filter
      spInitSidebarDefault : function() {
         if ( $( '.nt_sidebar_default' ).length <= 0 ) return;
         $( 'body' ).on( 'click', '.nt_sidebar_default', function(e) {
            $( '#nathan-wrapper' ).removeClass( 'pr' );
            $( 'body' ).toggleClass( 'default_opened' );
            $( '.mask-overlay,.close-filter,.widget_product_categories a' ).on( 'click', function() {
                $( '#nathan-wrapper' ).addClass( 'pr' );
                $( 'body' ).removeClass( 'default_opened' );
            });
            $('body').on('click', elessiTheme.pjaxLink, function() {
                $( '#nathan-wrapper' ).addClass( 'pr' );
              $( 'body' ).removeClass( 'default_opened' );
            });
            e.preventDefault();
         });
         
      },

      // CategoryFilter nt_pop_sidebar,pop_default
      initCategoryFilter: function() {
         if ( $( '.pop_default' ).length <= 0 ) return;
         $( 'body' ).on('click','.pop_default',function(e) {
            $( this ).toggleClass('opened');
            if ( $( ".nt-top-sidebar" ).is( ":hidden" ) ) {
               $( ".nt-top-sidebar" ).stop().slideDown(200);
               setTimeout(function () {
                 elessiShopify.nanoScroller();
             }, 200);
            } else {
               $( ".nt-top-sidebar" ).slideUp(200);
            }
            $('body').on('click', elessiTheme.pjaxLink, function() {
               $( ".nt-top-sidebar" ).slideUp(200);
            });
            e.preventDefault();
         });
      },
      
      stickySidebarBtn: function () {
        var $trigger = $('.nt_filter');
        var $stickyBtn = $('.nt_fil_sidebar');

        if ($stickyBtn.length <= 0 || $trigger.length <= 0 || $(window).width() > 1024) return;

        var stickySidebarBtnToggle = function () {
            var btnOffset = $trigger.offset().top + $trigger.outerHeight();
            var windowScroll = $(window).scrollTop();

            if (btnOffset < windowScroll) {
                $stickyBtn.addClass('btn_shown');
            } else {
                $stickyBtn.removeClass('btn_shown');
            }
        };

        stickySidebarBtnToggle();

        $(window).scroll(stickySidebarBtnToggle);
        $(window).resize(stickySidebarBtnToggle);
      },
      
      stickySidebarDefaultBtn: function () {
        var $trigger = $('.shop-content-area');
        var $stickyBtn = $('.nt_sidebar_default');

        if ($stickyBtn.length <= 0 || $trigger.length <= 0 || $(window).width() > 1024) return;

        var stickySidebarBtnToggle = function () {
            var btnOffset = $trigger.offset().top + $trigger.outerHeight();
            var windowScroll = $(window).scrollTop();

            if (btnOffset < windowScroll) {
                $stickyBtn.addClass('btn_shown');
            } else {
                $stickyBtn.removeClass('btn_shown');
            }
        };

        stickySidebarBtnToggle();

        $(window).scroll(stickySidebarBtnToggle);
        $(window).resize(stickySidebarBtnToggle);
      },

      // Init product accordion
      spAccordion : function() {
         $( ".nt_accordions_js .tab-heading" ).click( function( e ) {
            e.preventDefault();

            var _this = $( this );
            var parent = _this.closest( '.sp-accordion' );
            var parent_top = _this.closest( '.nt_accordions_js' );

            if ( parent.hasClass( 'active' ) ) {
               parent.removeClass( 'active' );
               parent.find( '.entry-content' ).stop( true, true ).slideUp();
            } else {
               parent_top.find( '.sp-accordion' ).removeClass( 'active' );
               parent.addClass( 'active' );
               parent_top.find( '.entry-content' ).stop( true, true ).slideUp();
               parent.find( '.entry-content' ).stop( true, true ).slideDown();
            }
         });
      },
      spToogle : function() {
         if ($(window).width() <= 736) {
            $('.footer__collapsed .sp-toogle:not(.active) .entry-content').stop( true, true ).slideUp();
         }
         $( '.sp-toogles .tab-heading' ).click( function( e ) {
            e.preventDefault();

            var _this = $( this );
            var parent = _this.closest( '.sp-toogle' );

            if ( parent.hasClass( 'active' ) ) {
               parent.removeClass( 'active' );
               parent.find( '.entry-content' ).stop( true, true ).slideUp();
            } else {
               parent.addClass( 'active' );
               parent.find( '.entry-content' ).stop( true, true ).slideDown();
            }
         });
      },

      // Sticky sidebar for single product layout 3 nt-sidebar-sticky
      spStickySidebar : function() {
      if ( $( '.nt-single-3' ).length > 0 && $(window).width() > 740) {
            //$( '.nt-sidebar-sticky' ).stick_in_parent({parent: ".single-product-content",offset_top : 100});
            
            // var offset_top = 20;
            // if ( $( 'body' ).hasClass('header_sticky_on' ) ) {offset_top = 100}
            // $( '.nt-sidebar-sticky' ).stick_in_parent({offset_top : offset_top,inner_scrolling:false});
            jQuery('.product-images,.product-infors').theiaStickySidebar({
            // Settings
            additionalMarginTop: 100
          });
         }
      },

      // Init Countdown
      initCountdown : function() {
         $('.nt-countdown-simple').each(function() {
            $(this).countdown($(this).data('time'), {elapse: true})
            .on('update.countdown', function(event) {
              var $this = $(this);
              if (event.elapsed) {
                $this.closest('.countdown-time-simple').html('');
              } else {
                  $this.html(event.strftime(''
                  + '<div class="dib"><span class="dib cw fs__13">%-D</span> <span class="dib tu fs__13">'+nathan_settings.countdown_days+'</span></div>, '
                  + '<div class="dib"><span class="dib cw fs__13">%H</span><span class="dib">: </span></div>'
                  + '<div class="dib"><span class="dib cw fs__13">%M</span><span class="dib">: </span></div>'
                  + '<div class="dib"><span class="dib cw fs__13">%S</span></div>')).closest('.countdown-time-simple').addClass('show');
              }
            });
         });
      },

      // Init Countdown 2018/07/31 23:59:59
      initCountdown_page : function() {
         $('.nt_countdow_page').each(function() {
            var d = new Date(),
               st_d = d+'',
               local_date = d.getFullYear()+'/'+("0" + (d.getMonth() + 1)).slice(-2)+'/'+("0" + d.getDate()).slice(-2),
               dta_time = $(this).data('time'),
               dta_zone = $(this).data('zone');
               if ( $(this).hasClass('nt_loop_deal') && st_d.indexOf(dta_zone) == -1 ) {
                  var setttime = $(this).data('setttime').split(','),
                      local_time = d.getHours()+("0" + d.getMinutes()).slice(-2)+("0" + d.getSeconds()).slice(-2);
                  if ( $(this).data('setttime').indexOf(',') != -1 ) {
                     var i,time_i;
                     for (i = 0; i < setttime.length; i++) { 
                        time_i = setttime[i].replace(":", "").replace(":", "").replace(":", "").replace(":", "");
                        if (parseInt(time_i) >= parseInt(local_time)) {
                           dta_time = local_date+' '+setttime[i];
                          break; 
                        }
                     }
                  } else {
                     dta_time = local_date;
                  }
               }
               //console.log(dta_time)
            $(this).countdown(dta_time, {elapse: true})
               .on('update.countdown', function(event) {
                 var $this = $(this);
                 if (event.elapsed) {
                     $this.html('');$('.deal_title ').html('');
                 } else {
                     $this.html(event.strftime(''
                     + '<div class="pr tc dib"><span class="db fs__18 fwb lh__1">%-D</span><span class="db tu mt__5 fs__12">'+nathan_settings.countdown_days+'</span></div>'
                     + '<div class="pr tc dib"><span class="db fs__18 fwb lh__1">%H</span><span class="db tu mt__5 fs__12">'+nathan_settings.countdown_hours+'</span></div>'
                     + '<div class="pr tc dib"><span class="db fs__18 fwb lh__1">%M</span><span class="db tu mt__5 fs__12">'+nathan_settings.countdown_mins+'</span></div>'
                     + '<div class="pr tc dib"><span class="db fs__18 fwb lh__1">%S</span><span class="db tu mt__5 fs__12">'+nathan_settings.countdown_sec+'</span></div>'));
                 }
            });
         });
      },

      // Init OpenSwatch 
      swatchesOnGrid: function() {

          $('body').on('click', '.nt_on_img:not(.current-swatch)', function() {

              var src, dtsrc, srcset;

              var imageSrc = $(this).data('src'),
                  imagedtSrc = $(this).data('dtsrc'),
                  imageSrcset = $(this).data('srcset'),
                  aspectratio = $(this).data('aspectratio');

              if( typeof imageSrc == 'undefined' ) return;

              var product = $(this).parents('.nt-grid-item'),
                  image = product.find('img').first(),
                  src_img = image.attr('data-chksrc');

                  $(this).parent().find('.current-swatch').removeClass('current-swatch');
                  $(this).addClass('current-swatch');
                  product.addClass('nt-swatched');
                  src = imageSrc;
                  dtsrc= imagedtSrc;
                  srcset = imageSrcset;
             
             if( src == src_img ) return;
              product.addClass('loading-qs');
              //console.log(product);
              image.attr('src', src).attr('data-src', dtsrc).attr('data-aspectratio', aspectratio).removeClass('lazyautosizes lazyloaded').addClass('lazyload').one('load', function() {
                 image.attr('data-chksrc', src);
                  product.removeClass('loading-qs');
              });
          });

      },
      swatchesOnBGGrid: function() {

          $('body').on('click', '.nt_on_bg:not(.current-swatch)', function() {

              var imagebg = $(this).data('bgset'),
                  imageSrc = $(this).data('src');

              var product = $(this).parents('.nt-grid-item'),
                  image = product.find('.main-img'),
                  src_img = image.attr('data-chksrc');

                  $(this).parent().find('.current-swatch').removeClass('current-swatch');
                  $(this).addClass('current-swatch');
                  product.addClass('nt-swatched');
               if( imageSrc  == src_img ) return;
               product.addClass('loading-qs');
               image.attr('data-bgset', imagebg).removeClass('lazyautosizes lazyloaded').addClass('lazyload lazypreload').imagesLoaded( { background: true }, function() {
                  image.attr('data-chksrc', imageSrc);
                  product.removeClass('loading-qs');
              });

          });

      },

      // Ajax filters
      ajaxFilters: function() {
          if( ! $('body').hasClass('template-collection') && ! $('body').hasClass('ajax-shop-true') ) return;

          var that = this,
              products = $('.products');

          // $('body').on('click', '.nt-pagination-ajax a', function(e) {
          //     scrollToTop();
          // });

          $(document).pjax(elessiTheme.pjaxLink, '.container_cat', {
              timeout: 5000,
              fragment: '.container_cat',
              scrollTo: false
          });
         $(document).pjax('.widget_product_categories a,.cat_shopify a', '.main-page-wrapper', {
              timeout: 5000,
              fragment: '.main-page-wrapper',
              scrollTo: false
          });

          $(document).on('pjax:error', function(xhr, textStatus, error, options) {
              console.log('pjax error ' + error);
          });

          $(document).on('pjax:start', function(xhr, options) {
              $('body').addClass('nt-loading');
               scrollToTop();
          });

          $(document).on('pjax:complete', function(xhr, textStatus, options) {
               if ($('.nt_filter_color .chosen').length == 1) {var str = $('.nt_filter_color .chosen a div').attr('class');$('.swatch__list--item[data-nt="'+str.replace("filter-swatch bg_color_", "")+'"]').trigger("click")}
               if (nathan_settings.show_multiple_currencies && elessiShopifyPre.StorageCurrency() !== null) {
                 Currency.convertAll(shopCurrency, elessiShopifyPre.StorageCurrency(), '.container_cat span.money');
               }
               //console.log(xhr.target.className)
               that.shopPageInit();
               // if (xhr.target.className == 'main-page-wrapper') {
               //    that.parallax();
               //    console.log('run parallax')
               // }
              that.initCountdown();
              var perrow = $('.main-page-wrapper').attr( 'data-perrow');
              $(".sp-col-switch a[data-col="+perrow+"]").trigger("click");
              //$('body').removeClass('nt-loading');
              //elessiShopify.stickySidebarBtn();
              if ( (typeof SPR !== 'undefined' ) && nathan_settings.productreviews && $(".shopify-product-reviews-badge").length > 0 ) {
                return window.SPR.registerCallbacks(), window.SPR.initRatingHandler(), window.SPR.initDomEls(), window.SPR.loadProducts(), window.SPR.loadBadges();
               }

          });

          $(document).on('pjax:end', function(xhr, textStatus, options) {
              //setTimeout(function(){ $('.nt-masonry').isotope('layout'); }, 1000);
              $('body').removeClass('nt-loading');

          });

          var scrollToTop = function() {
              if ( nathan_settings.ajax_scroll ) return false;
              var $scrollTo = $('.main-page-wrapper'),
                  scrollTo = $scrollTo.offset().top - nathan_settings.ajax_scroll_offset;

              $('html, body').stop().animate({
                  scrollTop: $('.container_cat').offset().top - 100
              }, 400);
          };

      },

      // Ajax filters
      shopPageInit: function() {
         elessiShopifyPre.initMasonry();
          // if( nathan_settings.shop_equal_img ) {
          //   setTimeout(function(){elessiShopify.EqualHeight();}, 400);
          //   }
            // if ($('.nt-masonry').length > 0) {
            //    setTimeout(function(){$('.nt-masonry').isotope('layout'); }, 500);
            //    setTimeout(function(){$('.nt-masonry').isotope('layout'); }, 1000);
            // }
            if( typeof $.waypoints == 'function' && $('body').hasClass('use_animation') ) {
              $('.nt-products-holder').find(".spb_animate:not(.start_animation)").waypoint(function(){
                 $(this).addClass("start_animation animated");
              }, { offset: '85%' });
            }
          //this.instagram();
          //this.nt_pr_recent();
          this.nathanDropdown_cat();
          this.nanoScroller();
          this.categoriesMenuBtns();
          this.categoriesAccordion();
          this.spToogle();
           elessiShopify.clickOnScrollButton( elessiTheme.nt_btn_load_more , false );
      },
      
      //Categories toggle accordion
      categoriesAccordion: function() {

          var $widget = $('.widget_product_categories'),
              $list = $widget.find('.product-categories'),
              $openBtn = $('<div class="nt-cats-toggle" />'),
              time = 300;

          $list.find('.cat-parent').append( $openBtn );

          $list.on('click', '.nt-cats-toggle', function() {
              var $btn = $(this),
                  $subList = $btn.prev();

              if( $subList.hasClass('list-shown') ) {
                  $btn.removeClass('toggle-active');
                  $subList.stop().slideUp(time).removeClass('list-shown');
              } else {
                  $subList.parent().parent().find('> li > .list-shown').slideUp().removeClass('list-shown');
                  $subList.parent().parent().find('> li > .toggle-active').removeClass('toggle-active');
                  $btn.addClass('toggle-active');
                  $subList.stop().slideDown(time).addClass('list-shown');
              }
          });

          if( $list.find(' > li.current-cat.cat-parent, > li.current-cat-parent').length > 0 ) {
              $list.find(' > li.current-cat.cat-parent, > li.current-cat-parent').find('> .nt-cats-toggle').click();
          }

      },

      categoriesMenu: function() {
          if( $(window).width() > 991 ) return;

          var categories = $('.cat_shopify'),time = 200;

          this.categoriesMenuBtns();

          $('body').on('click','.icon-drop-category', function(){
              if($(this).parent().find('> ul').hasClass('child-open')){
                  $(this).removeClass("basel-act-icon").parent().find('> ul').slideUp(time).removeClass('child-open');
              }else {
                  $(this).addClass("basel-act-icon").parent().find('> ul').slideDown(time).addClass('child-open');
              }
          });

          $('body').on('click', '.show-cat', function(e) {
              e.preventDefault();

              //console.log('close click');

              if( isOpened() ) {
                  closeCats();
              } else {
                  //setTimeout(function() {
                      openCats();
                  //}, 50);
              }
          });

          $('body').on('click', '.cat_shopify a', function(e) {
              closeCats();
              categories.stop().attr('style', '');
          });

          var isOpened = function() {
              return $('.cat_shopify').hasClass('categories-opened');
          };

          var openCats = function() {
              $('.cat_shopify').addClass('categories-opened').stop().slideDown(time);
              $('.show-cat').addClass('button-open');

          };

          var closeCats = function() {
              $('.cat_shopify').removeClass('categories-opened').stop().slideUp(time);
              $('.show-cat').removeClass('button-open');
          };
      },


      categoriesMenuBtns: function() {
          if( $(window).width() > 991 ) return;

          var categories = $('.cat_shopify'),
              subCategories = categories.find('li > ul'),
              iconDropdown = '<span class="icon-drop-category"></span>';

          categories.addClass('responsive-cateogires');
          subCategories.parent().addClass('has-sub').prepend(iconDropdown);
      },

      productImages: function() {

          var currentImage,
              $productGallery = $('.shopify-product-gallery'),
              $single_thumbnail = $('.single-product-thumbnail'),
              $mainImages = $('.p-thumb'),
              $thumbs = $productGallery,
              currentClass = 'current-image',
              gallery = $('.photoswipe-images'),
              PhotoSwipeTrigger = '.nt-show-product-gallery',
              galleryType = 'photo-swipe'; // magnific photo-swipe

          $thumbs.addClass('thumbnails-ready');

          if( $productGallery.hasClass( 'image-action-popup') ) {
              PhotoSwipeTrigger += ', .shopify-product-gallery__image a';
          }

          $productGallery.on('click', '.shopify-product-gallery__image a', function(e) {
              e.preventDefault();
          });

          $single_thumbnail.on('click', PhotoSwipeTrigger, function(e) {
              e.preventDefault();
              currentImage = $(this).attr('href');

              if( galleryType == 'magnific' ) {
                  $.magnificPopup.open({
                      type: 'image',
                      image: {
                          verticalFit: false
                      },
                      items: getProductItems(),
                      gallery: {
                          enabled: true,
                          navigateByImgClick: false
                      },
                  }, 0);
              }

              if( galleryType == 'photo-swipe' ) {

                  // build items array
                  var items = getProductItems();

                  callPhotoSwipe( getCurrentGalleryIndex(e), items );

              }

          });

          gallery.each(function() {
              var $this = $(this);
              $this.on('click', 'a', function(e) {
                  e.preventDefault();
                  var index = $(e.currentTarget).data('index') - 1;
                  var items = getGalleryItems($this, []);
                  callPhotoSwipe(index, items);
              } );
          })

          var callPhotoSwipe = function( index, items ) {
              var pswpElement = document.querySelectorAll('.pswp')[0];

              if( $('body').hasClass('rtl') ) {
                  index = items.length - index - 1;
                  items = items.reverse();
              }

              // define options (if needed)
              var options = {
                  history:false,
                  // optionName: 'option value'
                  // for example:
                  index: index, // start at first slide
                  shareButtons:[
                      {id:'facebook', label:nathan_settings.share_fb, url:'https://www.facebook.com/sharer/sharer.php?u={{url}}'},
                      {id:'twitter', label:nathan_settings.tweet, url:'https://twitter.com/intent/tweet?text={{text}}&url={{url}}'},
                      {id:'pinterest', label:nathan_settings.pin_it, url:'http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}'},
                      {id:'download', label:nathan_settings.download_image, url:'{{raw_image_url}}', download:false}
                  ],
                  getThumbBoundsFn: function(index) {

                  }
              };

              // Initializes and opens PhotoSwipe
              var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
              gallery.init();
          };

          var getCurrentGalleryIndex = function( e ) {
              if( $mainImages.hasClass('nt-carousel') || $mainImages.hasClass('nt-group-carousel') )
                  return $mainImages.find('.slick-current').index();
              else return $(e.currentTarget).parent().index();
          };

          var getProductItems = function() {
              var items = [];

              $mainImages.find('.nt_img_ptw a >img').each(function() {
                  var src = $(this).attr('data-large_image'),
                      width = $(this).attr('data-large_image_width'),
                      height = $(this).attr('data-large_image_height'),
                      caption = $(this).data('caption');
              
                      items.push({
                          src: src,
                          w: width,
                          h: height,
                          title: ( nathan_settings.product_images_captions == 'yes' ) ? caption : false
                      });

              });

              return items;
          };

          var getGalleryItems = function( $gallery, items ) {
              var src, width, height, title;

              $gallery.find('a').each(function() {
                  src = $(this).attr('href');
                  width = $(this).data('width');
                  height = $(this).data('height');
                  title = $(this).attr('title');
                  if( ! isItemInArray(items, src) ) {
                      items.push({
                          src: src,
                          w: width,
                          h: height,
                          title: title
                      });
                  }
              });

              return items;
          };

          var isItemInArray = function( items, src ) {
              var i;
              for (i = 0; i < items.length; i++) {
                  if (items[i].src == src) {
                      return true;
                  }
              }

              return false;
          };

          /* Fix zoom for first item firstly */

          if( $productGallery.hasClass( 'image-action-zoom') ) {
              var zoom_target   = $( '.shopify-product-gallery__image img' );
              var image_to_zoom = zoom_target.find( 'img' );

              // But only zoom if the img is larger than its container.
              zoom_target.each(function() {
               var $this = $(this);
                 if ( $this.attr( 'data-large_image_width' ) > $( '.shopify-product-gallery__image' ).width() ) {
                     $this.trigger( 'zoom.destroy' );
                     var zoom_parent = $this.closest('.shopify-product-gallery__image')
                     zoom_parent.zoom({
                        url: $this.attr( 'data-large_image' ), 
                         touch: false
                     });
                 }
              });
          }

      },
      Ntproduct_grouped: function(selector,prefix) {
        if ($(selector+' table.group_table').length == 0) return;
        var selectorCurent = $(selector);
        selectorCurent.find('table.group_table .quantity:first').focus();
        $('#cart-form'+prefix+' [max]').change(function() {
          var max = parseInt($(this).attr('max'), 10);
          var value = parseInt($(this).val(), 10) || 0;
          if (value > max) { 
            var html = [
                 '<div class="added-to-cart">',
                     '<p>' +nathan_settings.we_only_stock.replace('[max]', max) + '</p>',
                 '</div>',
             ].join("");
             $.magnificPopup.open({
                 callbacks: {
                     beforeOpen: function() {
                         this.st.mainClass = 'mfp-move-horizontal cart-popup-wrapper';
                     },
                 },
                 items: {
                     src: '<div class="white-popup add-to-cart-popup popup-added_to_cart nt_change_cart">' + html + '</div>',
                     type: 'inline'
                 }
             });

             $('.white-popup').on('click', '.close-popup', function(e) {
                 e.preventDefault();
                 $.magnificPopup.close();
             });
            $(this).val(max); 
          }    
        });
         selectorCurent.find('.product-form_group_variants').on('change', function() {
         var $this = $(this).find('option:selected'),
             parent = $(this).parent().parent(),
             input = $(this).closest('.tr_table').find('.nt_group_quantity'),
             onsale = $this.data('onsale'),
             compare = $this.data('compare'),
             price = $this.data('price'),
             quantity = $this.data('quantity'),
             value = $this.attr('value'),
             image = $this.data('image');
             //console.log(quantity)
             input.attr('max',quantity).attr('data-variant-id',value).val(1).attr('value',1);
             parent.find('img').attr('src',image);
              var variantPrice = elessiShopifyPre.formatMoney(price, nathan_settings.moneyFormat);
             if (onsale === 'true' || onsale === true ) {
               var variantcomparePrice = elessiShopifyPre.formatMoney(compare, nathan_settings.moneyFormat);
               var variantPriceFormat = '<del class="old-product-price">' + variantcomparePrice + '</del> ';
                   variantPriceFormat += '<ins class="product-price">' + variantPrice + '</ins>';
               parent.find('.price').html(variantPriceFormat);
             } else {
               parent.find('.price').html(variantPrice);
             }
             if (nathan_settings.show_multiple_currencies && elessiShopifyPre.StorageCurrency() !== null ) {
                  Currency.convertAll(shopCurrency, elessiShopifyPre.StorageCurrency(), '.group_table .grouped_info span.money');
              }
         });
         $( document ).on('click', '#multi-variant-add'+prefix, function(e) {
            e.preventDefault();
            var $this = $(this);
            $this.attr('disabled', 'disabled').css('pointer-events', 'none').addClass('btn--loader-active');
            Shopify.queue = [];
            selectorCurent.find('.nt_group_quantity').each(function() {
               var a=jQuery(this),id=a.data('variant-id'),qty=a.val();
               if ( qty > 0 && id !== '') {
                  Shopify.queue.push({
                      variantId: id,
                      quantity: parseInt(qty, 10) || 0
                  });
               }
            });
            Shopify.moveAlong = function() {
              // If we still have requests in the queue, let's process the next one.
              console.log(Shopify.queue);
              if (Shopify.queue.length) {
                var request = Shopify.queue.shift();
                  $.ajax({
                     type: 'POST',
                     url: '/cart/add.js',
                     data: {quantity: request.quantity, id:request.variantId},
                     dataType: 'json',
                     success:function(cart) {
                       Shopify.moveAlong();
                     },
                     error: function(XMLHttpRequest, textStatus) {
                       $this.removeAttr("disabled").css('pointer-events', 'auto').removeClass("btn--loader-active");
                       elessiShopify.onError(XMLHttpRequest, textStatus);
                     }
                  });
              }
              // If the queue is empty, we will redirect to the cart page.
              else {
                  jQuery.get('/cart?view=json', function(data) {
                     $('.widget_shopping_cart_content').html(data);
                   }).always(function() {
                     $(".cartCount").html($('.widget_shopping_cart_body').data('count'));
                     if (nathan_settings.show_multiple_currencies && elessiShopifyPre.StorageCurrency() !== null) {
                        Currency.convertAll(shopCurrency, elessiShopifyPre.StorageCurrency(), '.widget_shopping_cart_content span.money');
                        Currency.convertAll(shopCurrency, elessiShopifyPre.StorageCurrency(), '.nathan-cart-subtotal span.money');
                     }
                     if (parseInt($('.widget_shopping_cart_body').data('count')) > 0 ) { elessiShopify.initAddToCart();}
                     $this.removeAttr("disabled").css('pointer-events', 'auto').removeClass("btn--loader-active");
                  });
              }
            };
            Shopify.moveAlong();
         });
      },

      clickproduct: function() {
         if (!$('body').hasClass('template-product')) return;
          $(document).on("click",".shopify-product-rating", function(e) {  
             var anchor = $(this);     
             jQuery(".reviews_tab > a,.reviews_tab .tab-heading").trigger("click");
             setTimeout(function() {
                 window.scrollTo(0, 0);
             }, 1);
             setTimeout(function() {
                 $('html, body').stop().animate({
                     scrollTop: $(anchor.attr('href')).offset().top - 100
                 }, 400);
             }, 10);
             e.preventDefault();      
           });
          $("body").on("init", ".sp-tabs-wrapper, .shopify-tabs", function() {
              $(".sp-tab, .shopify-tabs .sp_panel").hide().removeClass("active");
              var b = window.location.hash
                , c = window.location.href
                , d = $(this).find(".sp-tabs, ul.tabs").first();
              b.toLowerCase().indexOf("comment-") >= 0 || "#reviews" === b || "#tab-reviews" === b ? d.find("li.reviews_tab a").click() : c.indexOf("comment-page-") > 0 || c.indexOf("cpage=") > 0 ? d.find("li.reviews_tab a").click() : d.find("li:first a").click()
          }).on("click", ".sp-tabs li a, ul.tabs li a", function(b) {
              b.preventDefault();
              var c = $(this)
                , d = c.closest(".sp-tabs-wrapper, .shopify-tabs")
                , e = d.find(".sp-tabs, ul.tabs");
              e.find("li").removeClass("active"),
              d.find(".sp-tab, .sp_panel").hide().removeClass("active"),
              c.closest("li").addClass("active"),
              d.find(c.attr("href")).show().addClass("active")
          }),
          void $(".sp-tabs-wrapper, .shopify-tabs").trigger("init");
      },

      progressbar: function(selector) {
         //.nt_progress_bar_pr
         var randomIntFromInterval = function(min, max) {return Math.floor(Math.random() * (max - min + 1) + min);};
         var updateMeter = function(a,remaining_items) {
              var b = 100 * remaining_items / total_items;
              if (remaining_items < 10) {
                  a.find('.progressbar div:first').addClass('less-than-ten')
              }
              a.find('.progressbar').addClass('active progress-striped');
              setTimeout(function() {
                  a.find('.progressbar div:first').css('width', b + '%');
                  a.find('.progressbar').removeClass('active progress-striped')
              }, 300);
         };
         var selectorCurent = $(selector),
              total_items = 60;
            var min_items_left = nathan_settings.stock_from;
            var max_items_left = nathan_settings.stock_to;
            var remaining_items = randomIntFromInterval(min_items_left, max_items_left);
            var check_stock = false;
            var timer = null,timerinterval = null;
            var min_of_remaining_items = 1;
            var decrease_after = 1.7; 
            var decrease_after_first_item = 0.17; 
        selectorCurent.html('');
        var $this = selectorCurent,a = "<p>"+nathan_settings.stock_message_first+" <span id='nt_count_page' class='count'>" + remaining_items + "</span> "+nathan_settings.stock_message_last+"</p>" + "<div class='progressbar'><div style='width:100%'></div></div>";
        $this.addClass('items-count');
        $this.html(a + $this.html());
        updateMeter($this,remaining_items);
        var b = $this;
        timer = setTimeout(function() {
            remaining_items--;
            if (remaining_items < min_of_remaining_items) {
                remaining_items = randomIntFromInterval(min_items_left, max_items_left)
            }
            selectorCurent.find('.count').css('background-color', nathan_settings.stock_bg_process);
            selectorCurent.find('.count').css('color', '#fff');
            setTimeout(function() {
                selectorCurent.find('.count').css('background-color', '#fff');
                selectorCurent.find('.count').css('color', nathan_settings.stock_bg_process)
            }, 1000 * 60 * 0.03);
            b.find(".count").text(remaining_items);
            updateMeter(b,remaining_items)
        }, 1000 * 60 * decrease_after_first_item );
        //1000 * 60 * decrease_after_first_item 
        timerinterval = setInterval(function() {
            remaining_items--;
            if (remaining_items < min_of_remaining_items) {
                remaining_items = randomIntFromInterval(min_items_left, max_items_left)
            }
            selectorCurent.find('.count').css('background-color', nathan_settings.stock_bg_process);
            selectorCurent.find('.count').css('color', '#fff');
            setTimeout(function() {
                selectorCurent.find('.count').css('background-color', '#fff');
                selectorCurent.find('.count').css('color', nathan_settings.stock_bg_process)
            }, 1000 * 60 * 0.03);
            b.find(".count").text(remaining_items);
            updateMeter(b,remaining_items)
        }, 1000 * 60 * decrease_after);
      },
        
      beforeAfter: function() {
        if ( $('.beafimg-inner').length == 0) return;
          $('.beafimg-inner').each(function(){ $(this).beforeAfter(); });
      },
      real_time: function(selector) {
         if (!nathan_settings.real_time) return;
         var min = nathan_settings.real_time_min,max = nathan_settings.real_time_max,t=1,r=nathan_settings.real_time_max;
         t=Math.ceil(t),
         r=Math.floor(r);
         var o=Math.floor(Math.random()*(r-t+1))+t,
         n=["1","2","4","3","6","10","-1","-3","-2","-4","-6"],
         h="",e="",l=["10","20","15"],h="",e="",M="";
         setInterval(function(){
            if(h=Math.floor(Math.random()*n.length),e=n[h],o=parseInt(o)+parseInt(e),min>=o){
               M=Math.floor(Math.random()*l.length);
               var a=l[M];o+=a
            }
            if(o<1 || o>max ){
               o=Math.floor(Math.random()*(r-t+1))+t;
            }
            jQuery("#number_counter>span").html((parseInt(o)));jQuery('.counter_real_time').show()
         },nathan_settings.real_interval_time);
      },
      
      flashSoldBar: function(prefix) {
         //if (!nathan_settings.flash_sold) return;
            var minQty = nathan_settings.flash_sold_min;
            var maxQty = nathan_settings.flash_sold_max;
            var minTime = nathan_settings.flash_min_time;
            var maxTime = nathan_settings.flash_max_time;
            minQty = Math.ceil(minQty);
            maxQty = Math.floor(maxQty);
            minTime = Math.ceil(minTime);
            maxTime = Math.floor(maxTime);

            var qty = Math.floor(Math.random() * (maxQty - minQty + 1)) + minQty;
            qty = parseInt(qty);
            if(qty <= minQty){
              qty = minQty;
            }
            if(qty > maxQty){
              qty = maxQty;
            }
            jQuery(".nt_flash_total_day"+prefix).html(qty);

            var time = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
            time = parseInt(time);
            if(time <= minTime){
              time = minTime;
            }
            if(time > maxTime){
              time = maxTime;
            }
            jQuery(".nt_flash_in_hour"+prefix).html(time);
      },

      delivery_order: function(selector) {
         //if (!nathan_settings.enable_delivery_option && !nathan_settings.enable_delivery_order) return;
         var selectorCurent = $(selector);
         var nt_DateFmt = function() {
           this.dateMarkers = { 
             d:['getDate',function(v) { return ("0"+v).substr(-2,2)}], 
             m:['getMonth',function(v) {
               var mthNames = ["01","02","03","04","05","06","07","08","09","10","11","12"];
               return mthNames[v];
             }],
             n:['getMonth',function(v) {
               var mthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
               return mthNames[v];
             }],
             w:['getDay',function(v) {
               var dayNames = nathan_settings.order_dayNames.split(" ");
               return dayNames[v];
             }],
             y:['getFullYear'],
             H:['getHours',function(v) { return ("0"+v).substr(-2,2)}],
             M:['getMinutes',function(v) { return ("0"+v).substr(-2,2)}],
             S:['getSeconds',function(v) { return ("0"+v).substr(-2,2)}],
             i:['toISOString',null]
           };

           this.format = function(date, fmt) {
             var dateMarkers = this.dateMarkers
             var dateTxt = fmt.replace(/%(.)/g, function(m, p){
               var rv = date[(dateMarkers[p])[0]]()

               if ( dateMarkers[p][1] != null ) rv = dateMarkers[p][1](rv)

               return rv
             });
             var date = dateTxt.split(" ");
             var datetxt = date[0]+' '+date[1]+'/'+date[2]+'/'+date[3];
             return datetxt 
             //return dateTxt
           };
           this.format_2 = function(str, fmt) {
             str = str+ '';
             var mnths = { 
               Jan:"01", Feb:"02", Mar:"03", Apr:"04", May:"05", Jun:"06",
               Jul:"07", Aug:"08", Sep:"09", Oct:"10", Nov:"11", Dec:"12"
                 },
                 date = str.split(" ");

             return [ date[2], mnths[date[1]], date[3] ].join("/");
           }
         };
         if (nathan_settings.enable_delivery_option && selector == "#nt_product_delivery") {
            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + $(".date_start_delivery").data("datestart"));
            if($(".date_start_delivery").data("datestart") > 1){ tomorrow.setDate(tomorrow.getDate() - 1); }
            var excludeDays = nathan_settings.delivery_off_days;
            excludeDays = excludeDays.split(" ");
            $.each(excludeDays, function(key, daySingle){
              if(daySingle === "SUN"){
                excludeDays[key] = 0;
              }
              if(daySingle === "MON"){
                excludeDays[key] = 1;
              }
              if(daySingle === "TUE"){
                excludeDays[key] = 2;
              }
              if(daySingle === "WED"){
                excludeDays[key] = 3;
              }
              if(daySingle === "THU"){
                excludeDays[key] = 4;
              }
              if(daySingle === "FRI"){
                excludeDays[key] = 5;
              }
              if(daySingle === "SAT"){
                excludeDays[key] = 6;
              }
            });
            if(excludeDays.length >= 7){
            excludeDays = [];
            }
            do {
              tomorrow.setDate(tomorrow.getDate() + 1);
            } while($.inArray(tomorrow.getDay(), excludeDays) > -1);
            var fmt = new nt_DateFmt();
            $(".date_start_delivery").html(fmt.format(tomorrow,nathan_settings.order_date_format));
          
            var tomorrow2 = new Date(),
                dateend = $(".shipping_delivery_option .date_end_delivery").data("dateend");
            tomorrow2.setDate(tomorrow2.getDate() + dateend);
            if(dateend > 1){ tomorrow2.setDate(tomorrow2.getDate() - 1); }  
            do {
              tomorrow2.setDate(tomorrow2.getDate() + 1);
            } while($.inArray(tomorrow2.getDay(), excludeDays) > -1);
            var fmt = new nt_DateFmt();
            //console.log(tomorrow2)
            $(".shipping_delivery_option .date_end_delivery").html(fmt.format(tomorrow2,nathan_settings.order_date_format));
         }
         if (nathan_settings.enable_delivery_order && selectorCurent.length > 0 ) {
             var startTime = new Date();
             var endTime = new Date(startTime.getFullYear()+"/"+(startTime.getMonth()+1)+"/"+startTime.getDate()+' '+nathan_settings.delivery_cutoff);
             var timer_time = Math.round((endTime - startTime) / 60000);
             
             var tomorrow = new Date();
             tomorrow.setDate(tomorrow.getDate() + selectorCurent.parent("div").find(".date_end_delivery").data("deliveryend"));
             
             if(timer_time <= 0){
               endTime.setDate(endTime.getDate() + 1);
               timer_time = Math.round((endTime - startTime) / 60000);
               tomorrow.setDate(tomorrow.getDate() + 1);
             }
             
             var excludeDays = nathan_settings.delivery_off_days;
             excludeDays = excludeDays.split(" ");
             $.each(excludeDays, function(key, daySingle){
               if(daySingle === "SUN"){
                 excludeDays[key] = 0;
               }
               if(daySingle === "MON"){
                 excludeDays[key] = 1;
               }
               if(daySingle === "TUE"){
                 excludeDays[key] = 2;
               }
               if(daySingle === "WED"){
                 excludeDays[key] = 3;
               }
               if(daySingle === "THU"){
                 excludeDays[key] = 4;
               }
               if(daySingle === "FRI"){
                 excludeDays[key] = 5;
               }
               if(daySingle === "SAT"){
                 excludeDays[key] = 6;
               }
             });
             if(excludeDays.length >= 7){
               excludeDays = [];
             }
             var tomorrow = new Date();
             tomorrow.setDate(tomorrow.getDate() + selectorCurent.parent("div").find(".date_end_delivery").data("deliveryend"));
           
            if(selectorCurent.parent("div").find(".date_end_delivery").data("deliveryend") > 1){ tomorrow.setDate(tomorrow.getDate() - 1); }
           //console.log(tomorrow)
             do {
               tomorrow.setDate(tomorrow.getDate() + 1);
             } while($.inArray(tomorrow.getDay(), excludeDays) > -1);
             var fmt = new nt_DateFmt();
             selectorCurent.siblings(".date_end_delivery").html(fmt.format(tomorrow,nathan_settings.order_date_format));
             
             var hours = Math.floor(timer_time / 60);          
             var minutes = Math.floor(timer_time % 60);
             
             var day_wek = fmt.format(tomorrow,"%y") +' '+hours+':'+minutes;
             var countDownDate = new Date(day_wek).getTime();
             document.getElementById(selector.replace('#','')).innerHTML =hours + nathan_settings.order_hours + minutes + nathan_settings.order_mins;
             // Update the count down every 1 second
             var x = setInterval(function() {
                // Get todays date and time
                var now = new Date().getTime();
                // Find the distance between now an the count down date
                var distance = countDownDate - now;
                if (distance < 0) {
                    clearInterval(x);
                //document.getElementById("estimateTimer").innerHTML = "EXPIRED";
                }
            }, 100); 
         }
      },

     // Parallax
      parallax: function() {
         if( $(window).width() <= 1024) return;
         $('.ntparallax').each(function(){
           $(this).parallax("50%", 0.3);
         });
      },
       // Product recent Widget
      // nt_pr_recent: function() {
      //    if( ! $('body').hasClass('template-collection') && ! $('body').hasClass('template-blog') && ! $('body').hasClass('template-article')) return;
      //    var ls = gl_Currency.cookie.jasread('nt_recent');
      //    if(ls != null){ 
      //       ls = ls.split(',');
      //       var lr = ls.reverse();
      //       var length = ls.length;
      //       // show many products
      //       $("#recently-viewed-products").show();
      //       $.ajax({
      //          url: '/pages/recently-viewed-products/'+ls+'?q=widget_rencet',
      //          dataType: 'html',
      //          type: 'GET',
      //          success: function(responsive) {
      //            //console.log(responsive);
      //             $('#recently_wrap').html(responsive);
      //          },
      //          error: function(data) {
      //            console.log('ajax error');
      //          },
      //          complete: function() {
      //            //currency
      //            if (nathan_settings.show_multiple_currencies && elessiShopifyPre.StorageCurrency() !== null) {
      //               Currency.convertAll(shopCurrency, elessiShopifyPre.StorageCurrency(), '.widget_recently_viewed_products span.money');
      //             }
      //          }
      //       }); 
      //    }else{
      //       ls = new Array();
      //     }
      // },
      
      // Newsletter popup
      newsletterPopup: function() {
         
         if( $('body').hasClass('catalog_mode_on') || !nathan_settings.opend_popup || $('.nt-newsletter-popup').length == 0 || ( nathan_settings.new_popup_hide_mobile && $(window).width() < 768 ) ) return;
          var new_version = nathan_settings.new_version,
              popup = $( '.nt-newsletter-popup' ),
              shown = false,
              view_pages = nt_cookie('nt_view_pages');

         if( ! view_pages ) view_pages = 0;

         if( view_pages < nathan_settings.new_pages) {
             view_pages++;
             nt_cookie('nt_view_pages', view_pages, { expires:nathan_settings.popup_expires, path: '/' } );
             return false;
         }

          var OpenNewsletter = function() {
              $.magnificPopup.open({
                  items: {
                      src: '.nt-newsletter-popup'
                  },
                  type: 'inline',       
                  removalDelay: 500, //delay removal by X to allow out-animation
                  callbacks: {
                      beforeOpen: function() {
                          this.st.mainClass = nathan_settings.newEffect + ' new-popup-wrapper';
                      },
                      open: function() {
                        $('#hideforever_ypop').change(function() {
                        if ($(this).is(':checked')) {
                          nt_cookie('nt_popup_'+ new_version, 'shown', {expires:nathan_settings.popup_expires, path:'/'});
                        } else {
                          nt_cookie('nt_popup_'+ new_version, null, { path: '/' });
                        }
                        });
                      },
                      close: function() {
                          //nt_cookie('nt_popup_' + new_version, 'shown', { expires: nathan_settings.popup_expires, path: '/' } );
                      }
                  }
              });
          };

          if ( nt_cookie('nt_popup_' + new_version) != 'shown' ) {
              if( nathan_settings.new_event == 'scroll' ) {
                  $(window).scroll(function() {
                      if( shown ) return false;
                      if( $(document).scrollTop() >= nathan_settings.new_scroll ) {
                          OpenNewsletter();
                          shown = true;
                      }
                  });
              } else {
                  setTimeout(function() {
                      OpenNewsletter();
                  }, nathan_settings.new_delay );
              }
          }
          $('.nt-open-newsletter').on('click',function(e){
              e.preventDefault();
              OpenNewsletter();
          })
      },
      
      //EU Cookies law
      EuCookies: function() {
         var eu_cookies_ver = nathan_settings.eu_cookies_ver;
          if( nt_cookie('banner_cookies_' + eu_cookies_ver) == 'accepted' || $('.banner_cookies').length == 0) return;
          var BannerCookies = $( '.banner_cookies' ),
              ClassUp = nathan_settings.eu_cookies_effect;
          setTimeout(function() {
              BannerCookies.show().addClass(ClassUp);
              BannerCookies.on('click', '.banner_cookies_btn', function(e) {
                  e.preventDefault();
                  acceptUser();
              })
          }, nathan_settings.cookie_time );

          var acceptUser = function() { 
            if ( ClassUp=='swing' || ClassUp=='shake' || ClassUp=='wobble' || ClassUp=='jello'){ClassDown ='bounceOutDown'}
            else{var ClassDown = ClassUp.replace('InUp','OutDown').replace('In','Out');}
            BannerCookies.removeClass(ClassUp).addClass(ClassDown);
            nt_cookie('banner_cookies_' + eu_cookies_ver, 'accepted', { expires:nathan_settings.eu_cookies_expires, path: '/' } );
          };
      },

      // Sticky footer
      stickyFooter: function() {

         if( ! $('body').hasClass( 'footer_sticky' ) || $(window).width() <= 1024 ) return;

         var $body = $('body'),
              $footer = $('#nt-footer'),
              $footerContent = $footer.find('.footer__top, .footer__bot'),
              footerHeight = $footer.outerHeight(),
              $page = $('#nathan-content'),
              $doc = $(document),
              $window = $(window),
              docHeight = $doc.outerHeight(),
              windowHeight = $window.outerHeight(),
              position,
              bottomSpace,
              opacity;

         var footerOffset = function() {
              $page.css({
                  marginBottom: $footer.outerHeight()
              })
         };

         var footerEffect = function() {
              position        = $doc.scrollTop();
              docHeight       = $doc.outerHeight();
              windowHeight    = $window.outerHeight();
              bottomSpace     = ( docHeight - (position + windowHeight) );
              footerHeight    = $footer.outerHeight();
              opacity         = parseFloat( (bottomSpace ) / footerHeight).toFixed(5);

              // $footer.removeClass('footer-live_stuck').addClass('footer-not-live_stuck');
              $footer.removeClass('live_stuck');
              // If scrolled to footer
              if( bottomSpace > footerHeight ) return;

              $footerContent.css({
                  opacity: (1 - opacity)
              });

              // $footer.addClass('footer-live_stuck').removeClass('footer-not-live_stuck');
              $footer.addClass('live_stuck');

         };

         $window.on('resize', footerOffset);
         $window.on('scroll', footerEffect);

         $footer.imagesLoaded(function() {
              footerOffset();
         });

     },
     // Init nanoscroller
      nanoScroller: function() {
         if( $(window).width() <= 1024 ) return;
          $(".nt-scroll").nanoScroller({
              paneClass: 'nt-scroll-pane',
              sliderClass: 'nt-scroll-slider',
              contentClass: 'nt-scroll-content',
              preventPageScrolling: false
          });

      },
      // mobile responsive table
      NTtableResponsive: function() {
      var NtresTable = $(".shop_table:not(.shop_table_responsive):not(.nt-shopify-table)").wrap("<div class='nt-table-responsive'></div>");
      },
      // Simple dropdown for category select on search form
      nathanDropdown: function(selector) {
          var selectorCurent = $(selector);
          selectorCurent.each(function() {
              var dd = $(this);
              var btn = dd.find('> a');
              var input = dd.find('> input');
              var list = dd.find('> ul'); //.dd-list-wrapper

              $(document).click(function(e) {
                  var target = e.target;
                  if (dd.hasClass('dd-shown') && !$(target).is(selector) && !$(target).parents().is(selector)) {
                      hideList();
                      return false;
                  }
              });

              btn.on('click', function(e) {
                  e.preventDefault();
                  if (dd.hasClass('dd-shown')) {
                    hideList();
                  } else {
                    $(selector+'.dd-shown > ul').slideUp(100);
                    $(selector+'.dd-shown').removeClass('dd-shown');
                    showList();
                  }
                  return false;
              });

              list.on('click', 'a', function(e) {
                  e.preventDefault();
                  var value = $(this).data('val');
                  var label = $(this).text();
                  //list.find('.is-selected').removeClass('is-selected');
                  //$(this).parent().addClass('is-selected');
                  if (value != 0) {
                      list.find('li:first-child').show();
                  } else if (value == 0) {
                      list.find('li:first-child').hide();
                  }
                  btn.text(label);
                  input.val(value);
                  hideList();
              });

              function showList() {
                  dd.addClass('dd-shown');
                  list.slideDown(100);
              }

              function hideList() {
                  dd.removeClass('dd-shown');
                  list.slideUp(100);
              }
          });

      },
      nathanDropdown_cat: function() {
          $('.shopify-ordering').each(function() {
              var dd = $(this);
              var btn = dd.find('> span');
              var list = dd.find('> ul'); //.dd-list-wrapper

              $(document).click(function(e) {
                  var target = e.target;
                  if (dd.hasClass('dd-shown') && !$(target).is('.shopify-ordering') && !$(target).parents().is('.shopify-ordering')) {
                      hideList();
                      return false;
                  }
              });

              btn.on('click', function(e) {
                  e.preventDefault();
                  if (dd.hasClass('dd-shown')) {
                    hideList();
                  } else {
                   $('.shopify-ordering.dd-shown > ul').slideUp(100);
                    $('.shopify-ordering.dd-shown').removeClass('dd-shown');
                    showList();
                  }
                  return false;
              });

              list.on('click', 'a', function(e) {
                  //e.preventDefault();
                  var label = $(this).text();
                  list.find('.selected').removeClass('selected');
                  $(this).parent().addClass('selected');
                  btn.text(label);
                  hideList();
              });

              function showList() {
                  dd.addClass('dd-shown');
                  list.slideDown(100);
              }

              function hideList() {
                  dd.removeClass('dd-shown');
                  list.slideUp(100);
              }
         });

      },

      initVideoBackgrounds: function() {
         if( $(window).width() <= 1024 ) return;
        elessiShopify.nt_initVideoBackgrounds()
      },
      fullHeightRow: function() {
        var $element = $(".nt-full-height:first");
        if ($element.length) {
        var $window, windowHeight, offsetTop, fullHeight;
        $window = $(window), windowHeight = $window.height(), offsetTop = $element.offset().top, offsetTop < windowHeight && (fullHeight = 100 - offsetTop / (windowHeight / 100), $element.css("min-height", fullHeight + "vh"))
        }
        $(document).trigger("nt-full-height-row", $element)
       },
      
      nt_initVideoBackgrounds: function() {
              jQuery("[data-gl-video-bg]").each(function() {
              var youtubeUrl, youtubeId, $element = jQuery(this);
              $element.data("glVideoBg") ? (youtubeUrl = $element.data("glVideoBg"),
              youtubeId = elessiShopify.jasExtractYoutubeId(youtubeUrl),
              youtubeId && ($element.find(".nt_video-bg").remove(),
              elessiShopify.insertYoutubeVideoAsBackground($element, youtubeId)),
              jQuery(window).on("grid:items:added", function(event, $grid) {
              $element.has($grid).length && elessiShopify.jasResizeVideoBackground($element)
              })) : $element.find(".nt_video-bg").remove()
              })
              },
              insertYoutubeVideoAsBackground: function($element, youtubeId, counter) {
              if ("undefined" == typeof YT || "undefined" == typeof YT.Player)
              return counter = "undefined" == typeof counter ? 0 : counter,
              100 < counter ? void console.warn("Too many attempts to load YouTube api") : void setTimeout(function() {
              elessiShopify.insertYoutubeVideoAsBackground($element, youtubeId, counter++)
              }, 100);
              var $container = $element.prepend('<div class="nt_video-bg nt_hidden-xs"><div class="inner"></div></div>').find(".inner");
              new YT.Player($container[0],{
                width: "100%",
                height: "100%",
                videoId: youtubeId,
                playerVars: {
                playlist: youtubeId,
                iv_load_policy: 3,
                enablejsapi: 1,
                disablekb: 1,
                autoplay: 1,
                controls: 0,
                showinfo: 0,
                rel: 0,
                loop: 1,
                wmode: "transparent"
              },
                events: {
                  onReady: function(event) {
                    event.target.mute().setLoop(!0)
                  }
                }
          }),
            elessiShopify.jasResizeVideoBackground($element),
            jQuery(window).bind("resize", function() {
            elessiShopify.jasResizeVideoBackground($element)
          })
        },
        jasResizeVideoBackground: function($element) {
          var iframeW, iframeH, marginLeft, marginTop, containerW = $element.innerWidth(), containerH = $element.innerHeight(), ratio1 = 16, ratio2 = 9;
          containerW / containerH < ratio1 / ratio2 ? (iframeW = containerH * (ratio1 / ratio2),
                                                       iframeH = containerH,
                                                       marginLeft = -Math.round((iframeW - containerW) / 2) + "px",
                                                       marginTop = -Math.round((iframeH - containerH) / 2) + "px",
                                                       iframeW += "px",
                                                       iframeH += "px") : (iframeW = containerW,
                                                                           iframeH = containerW * (ratio2 / ratio1),
                                                                           marginTop = -Math.round((iframeH - containerH) / 2) + "px",
                                                                           marginLeft = -Math.round((iframeW - containerW) / 2) + "px",
                                                                           iframeW += "px",
                                                                           iframeH += "px"),
            $element.find(".nt_video-bg iframe").css({
            maxWidth: "1000%",
            marginLeft: marginLeft,
            marginTop: marginTop,
            width: iframeW,
            height: iframeH
          });
        },
        jasExtractYoutubeId: function(url) {
          if ("undefined" == typeof url)
            return !1;
          var id = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
          return null !== id && id[1]
        },
       //   EqualHeight: function() {
       //      $(".nt_section_eqh").each(function (index) {
       //         var $this = $(this),
         //           $gridImages = $this.find('.jas-product-image-equal'),
         //           $gridImagesmetro = $this.find('.jas-pr_metro-image-equal');
         //      $gridImages.css('height', 'auto').equalHeights();
         //      $gridImagesmetro.css('height', 'auto').equalHeights();
         //   });
         // },
         EqualHeight: function() {

                $.fn.nt_equlize = function(options) {

                    var settings = $.extend({
                        child: "",
                    }, options);

                    var that = this;

                    if (settings.child != '') {
                        that = this.find(settings.child);
                    }

                    var resize = function() {

                        var maxHeight = 0;
                        var height;
                        that.each(function() {
                            // $(this).attr('style', '');
                          $(this).css({'height': '' });
                            //if ($(window).width() > 767 && $(this).outerHeight() > maxHeight)
                              if ($(this).outerHeight() > maxHeight)
                                maxHeight = $(this).outerHeight();
                        });

                        that.each(function() {
                          $(this).css({'height': maxHeight+"px" });
//                             $(this).css({
//                                 Height: maxHeight
//                             });
                        });

                    }

                    $(window).bind('resize', function() {
                        resize();
                    });
                    setTimeout(function() {
                        resize();
                    }, 200);
                    setTimeout(function() {
                        resize();
                    }, 500);
                    setTimeout(function() {
                        resize();
                    }, 800);
                }

                $('.equal-nt').each(function() {
                    // $(this).nt_equlize({
                    //     child: ' [class*=col-] .product-img'
                    // });
                    // if ($(this).hasClass('metro')) {
                    //    $(this).nt_equlize({
                    //     child: ' [class*=col-] .metro-image-equal'
                    //    });
                    // }
                    if ($('body').hasClass('template-product')) {
                     $(this).nt_equlize({
                        child: ' .page_pr_img_size .nt-pr_metro-image-equal'
                       });
                       $(this).nt_equlize({
                        child: ' .page_pr_img_size .nt-pr_nav-image-equal'
                       });
                    }
                });
            },

          nt_map: function() {
            $(".nt-gmap").each(function (index) {
               var $this = $(this),
                  lat = $this.data('lat'),
                  lon = $this.data('lon'),
                  icon = $this.data('icon'),
                  style = $this.data('style');
               new Maplace({
                   locations: [
                     {
                       lat: lat,
                       lon: lon,
                       title: '',
                       html: '',
                       icon: icon,
                       animation: google.maps.Animation.DROP
                     }
                   ],
                   controls_on_map: false,
                   title: '',
                   map_div: $this,
                   start: 1,
                   map_options: {
                   zoom: 15,
                   scrollwheel: false                   
                 },
                  styles: {
                     'Custom style': style
                  }
                  }).Load();
           });
         },

         instagram: function() {
           //if( ! $('body').hasClass('template-index') ) return;
           $(".nt_ins_section").each(function (index) {

             var data = null
             if (sp_nt_storage) {
               data = sessionStorage.getItem('nt_ins'+$(this).data('id'));
             }

             if (data != null ) {
               var ul_ins = $(this),
                   ul_ins_slider = ul_ins.find(".ins-nt-carousel"),
                   ul_ins_html = ul_ins.find(".nt-sc-instagram");
               ul_ins_html.html(data);
               if ( typeof ul_ins_slider !== 'undefined' ) {
                 ul_ins_slider.not( '.slick-initialized' ).slick();
               }
               //setTimeout(function(){ ul_ins.addClass('disable_loader'); }, 300);
             } else {
               var ul_ins = $(this),
                   id = ul_ins.data('id'),
                   user_name = ul_ins.data('username'),
                   getBy = ul_ins.data('getby'),
                   limit = ul_ins.data('limit'),
                   lmacc = ul_ins.data('lmacc'),
                   target = ul_ins.data('target'),
                   col = ul_ins.data('col'),
                   ul_ins_slider = ul_ins.find(".ins-nt-carousel"),
                   ul_ins_html = ul_ins.find(".nt-sc-instagram");
               if (getBy == '2') {user_name = ul_ins.data('accesstoken')}

               if ("no_user_name_xxx" == user_name) return;
               if (getBy == '2') {
                 $.ajax({
                   url: "https://api.instagram.com/v1/users/self/media/recent/?access_token="+user_name+"&count="+lmacc,
                   type: 'GET',
                   dataType: "jsonp",
                   success: function(response) {
                     var html = ins_js_1(response,target,limit,col);
                     ul_ins_html.html(html);
                     if (sp_nt_storage && !Shopify.designMode) {sessionStorage.setItem('nt_ins'+id, html)}
                   },
                   error: function(data) {
                     console.log('ajax error');
                   },
                   complete: function() {
                     if ( typeof ul_ins_slider !== 'undefined' ) {
                       ul_ins_slider.not( '.slick-initialized' ).slick();
                     }
                     //setTimeout(function(){ ul_ins.addClass('disable_loader'); }, 300);
                   }
                 });

               } else {
                 $.ajax({
                   url: 'https://www.instagram.com/'+user_name+'/?__a=1',
                   type: 'GET',
                   dataType: 'json',
                   success: function(response) {
                     //console.log(response);
                     var html = ins_js(response,target,limit,col);
                     ul_ins_html.html(html);
                     if (sp_nt_storage && !Shopify.designMode) {sessionStorage.setItem('nt_ins'+id, html)}
                   },
                   error: function(data) {


                     $.ajax({
                       url: "https://api.teathemes.net/instagram?username=" + user_name,
                       type: 'GET',
                       success: function(response) {
                         var html = ins_js_2(response,target,limit,col);
                         ul_ins_html.html(html);
                         if (sp_nt_storage && !Shopify.designMode) {sessionStorage.setItem('nt_ins'+id, html)}
                       },
                       error: function(data) {
                         console.log('ajax error');
                       },
                       complete: function() {
                         if ( typeof ul_ins_slider !== 'undefined' ) {
                           ul_ins_slider.not( '.slick-initialized' ).slick();
                         }
                         //setTimeout(function(){ ul_ins.addClass('disable_loader'); }, 300);
                       }
                     });
                     // end error

                   },
                   complete: function() {
                     if ( typeof ul_ins_slider !== 'undefined' ) {
                       ul_ins_slider.not( '.slick-initialized' ).slick();
                     }
                     //setTimeout(function(){ ul_ins.addClass('disable_loader'); }, 300);
                   }
                 });
               }
             }

           });

           var ins_js = function (res,target,limit,col) {
             //console.log(response);
             try {
               var data = res.graphql.user.edge_owner_to_timeline_media.edges;
             }
             catch(err) {
               var data = null;
             }
             var html = '',
                 img_url = null;
             //console.log(data);
             if (data == null) return;
             //console.log(data);
             $.each(data,function(index,el){
               if(index >= limit ) return 0;
               var element = el.node;
               //console.log(element);
               var img_url_150 = element.thumbnail_resources[0].src,
                   img_url_240 = element.thumbnail_resources[1].src,
                   img_url_320 = element.thumbnail_resources[2].src,
                   img_url_480 = element.thumbnail_resources[3].src,
                   img_url_640 = element.thumbnail_resources[4].src;
               html += '<div class="spb_animate item col-lg-'+col+' col-md-4 col-6"><a class="db pr oh nt-pr-image-link nt_img_ratio nt_bg_lz lazyload" href="//instagram.com/p/'+element.shortcode+'" target="'+target+'" data-bgset="' + img_url_150 + ' 150w,' + img_url_320 + ' 320w,' + img_url_640 + ' 640w" data-parent-fit="cover"><div class="hover-mask flex c_center alin_center"><span class="pr cw mgr10"><i class="icon-heart icons mr__5"></i>'+element.edge_liked_by.count+'</span><span class="pr cw"><i class="icon-bubbles icons mr__5"></i>'+element.edge_media_to_comment.count+'</span></div></a></div>';
             });
             return html;
           };

           var ins_js_1 = function (res,target,limit,col) {
             //console.log(response);
             try {
               var data = res.data;
             }
             catch(err) {
               var data = null;
             }
             if (data == null) return;
             var html = '',
                 img_url = null;
             $.each(data,function(index,element){
               if(index >= limit ) return 0;
               var img_url_150 = element.images.thumbnail.url,
                   img_url_320 = element.images.low_resolution.url,
                   img_url_640 = element.images.standard_resolution.url;
               html += '<div class="ntacc spb_animate item col-lg-'+col+' col-md-4 col-6"><a class="db pr oh nt-pr-image-link nt_img_ratio nt_bg_lz lazyload" href="' + element.link +'" target="'+target+'" data-bgset="' + img_url_150 + ' 150w,' + img_url_320 + ' 320w,' + img_url_640 + ' 640w" data-parent-fit="cover"><div class="hover-mask flex c_center alin_center"><span class="pr cw mgr10"><i class="icon-heart icons mr__5"></i>'+element.likes.count+'</span><span class="pr cw"><i class="icon-bubbles icons mr__5"></i>'+element.likes.count+'</span></div></a></div>';
             });
             return html;
           };

           var ins_js_2 = function (res,target,limit,col) {
             //console.log(response);
             try {
               var data = res.entry_data.ProfilePage[0].user.media.nodes;
             }
             catch(err) {
               var data = null;
             }
             if (data == null) return;
             var html = '',
                 img_url = null;
             if (data) return;
             $.each(data,function(index,element){
               if(index >= limit ) return 0;
               var img_url_150 = element.thumbnail_resources[0].src,
                   img_url_240 = element.thumbnail_resources[1].src,
                   img_url_320 = element.thumbnail_resources[2].src,
                   img_url_480 = element.thumbnail_resources[3].src,
                   img_url_640 = element.thumbnail_resources[4].src;
               html += '<div class="spb_animate item col-lg-'+col+' col-md-4 col-6"><a class="db pr oh nt-pr-image-link nt_img_ratio nt_bg_lz lazyload" href="//instagram.com/p/'+element.code+'" target="'+target+'" data-bgset="' + img_url_150 + ' 150w,' + img_url_320 + ' 320w,' + img_url_640 + ' 640w" data-parent-fit="cover"><div class="hover-mask flex c_center alin_center"><span class="pr cw mgr10"><i class="icon-heart icons mr__5"></i>'+element.likes.count+'</span><span class="pr cw"><i class="icon-bubbles icons mr__5"></i>'+element.comments.count+'</span></div></a></div>';
             });
             return html;
           };


         },
         
         initMegaMenu: function() {
            if( $(window).width() <= 1024 ) return;
            var $window = $(window),
                    site_header = $('.site_header'),
                    MenuSection = $('.menu-section').find('ul.nt_menu'),
                    Menuoffsets = MenuSection.find(' > li.menu_has_offsets');

                var calcOffset = function( li ) {
                    var nav_dropdown = li.find(' > .nav_dropdown'),
                        global_wrapper = $('.global-wrapper');


                    nav_dropdown.attr('style', '');

                    var nav_dropdownWidth = nav_dropdown.outerWidth(),
                        nav_dropdownOffset = nav_dropdown.offset(),
                        screenWidth = $window.width(),
                        bodyRight = global_wrapper.outerWidth() + global_wrapper.offset().left,
                        viewportWidth = ( $('body').hasClass('wrapper-boxed') || $('body').hasClass('wrapper-boxed-small') ) ? bodyRight : screenWidth;

                        if( ! nav_dropdownWidth || ! nav_dropdownOffset ) return;
                        if( nav_dropdownWidth >= 0 && li.hasClass( 'menu-center' ) && ! site_header.hasClass('header-7') ) {
                            //console.log('center');
                            var toLeft = (nav_dropdownOffset.left + (nav_dropdownWidth/2)) - screenWidth/2;
                            nav_dropdown.css({
                                left: - toLeft
                            });

                        } else if( $('body').hasClass('rtl') && nav_dropdownOffset.left <= 0 && li.hasClass( 'menu_has_offsets' ) && ! site_header.hasClass('header-7') ) {
                            var toLeft = - nav_dropdownOffset.left;

                            nav_dropdown.css({
                                right: - toLeft
                            });

                        } else if( nav_dropdownOffset.left + nav_dropdownWidth >= viewportWidth && li.hasClass( 'menu_has_offsets' ) && ! site_header.hasClass('header-7') ) {
                            var toRight = nav_dropdownOffset.left + nav_dropdownWidth - viewportWidth;
                            nav_dropdown.css({
                                left: - toRight
                            });

                        }
                        if( site_header.hasClass('header_vertical') ) {

                            var bottom = nav_dropdown.offset().top + nav_dropdown.outerHeight(),
                                viewportBottom = $window.scrollTop() + $window.outerHeight();

                            if( bottom > viewportBottom ) {
                                nav_dropdown.css({
                                    top: viewportBottom - bottom - 10
                                });
                            }
                        }
                };

                Menuoffsets.each(function() {
                    calcOffset( $(this) );
                });
         },
         ajaxchimp: function() {
            $(".mail_agree").on('click', function (event) {
               var $form = $(this).closest('form'),
                  $result = $form.find('.mc4wp-response'),
                  $button = $(this);
                  //console.log($(this).closest('form').find(':checked').length)
                  if ($(this).closest('form').find(':checked').length) {
                     if ($(this).closest('form.nt_ajax_mcsp').length > 0){
                        if (event) event.preventDefault();
                        $result.hide(100);
                        $button.val(nathan_settings.mc_subscribing).html(nathan_settings.mc_subscribing);
                        register($form, $result, $button);
                     } else {
                        $result.hide(100);
                        return true;
                     }
               } else {
                  $result.html('<div class="shopify-error">' + nathan_settings.messenger_mail + '</div>').show(100);
                  return false;
               }
            });
              $('form.nt_ajax_mcsp [type="submit"]:not(.mail_agree)').bind('click', function ( event ) {
                  var $form = $(this).closest('form.nt_ajax_mcsp'),
                      $result = $form.find('.mc4wp-response'),
                      $button = $(this);
                  if ( event ) event.preventDefault();
                  // if ( validate_input($form) ) { register($form); }
                  $result.hide(100);
                  $button.val(nathan_settings.mc_subscribing).html(nathan_settings.mc_subscribing);
                  register($form,$result,$button);
              });
         function register($form,$result,$button) {
        //console.log($button)
            $.ajax({
                  type: "GET",
                 url: $form.attr('action'),
                 data: $form.serialize(),
                 cache       : false,
                 dataType    : 'jsonp',
                 jsonp: "c",
                 contentType: "application/json; charset=utf-8",
                 error       : function(err) { 
                    $button.val(nathan_settings.mc_submit).html(nathan_settings.mc_submit);
                     var messenger = err.replace('0 - ','').replace('1 - ','').replace('2 - ','');
                    $result.html('<div class="shopify-error">'+messenger+'</div>').show(100); 
                 },
                 success     : function(data) {
                     $button.val(nathan_settings.mc_submit).html(nathan_settings.mc_submit);
                     var messenger = data.msg.replace('0 - ','').replace('1 - ','').replace('2 - ','');
                     if (data.result != "success") {
                        $result.html('<div class="shopify-error">'+messenger+'</div>').show(100);
                     } else {
                        $result.html('<div class="shopify-message">'+messenger+'</div>').show(100);
                     }
                 }
            });
         }
       },

      add_sticky: function() {
         if ($('.sticky-nt-atc').length == 0 || ( !nathan_settings.sticky_show_mobile && $(window).width() < 767) ) return;
         if ($('#nt_sticky_toogle').length > 0) {
            var toogle = $('#nt_sticky_toogle'), group_sticky = $('#group_sticky');
            // var Ntproductsticky = JSON.parse(document.getElementById('ProductJson-NT').innerHTML),
            //     productsticky = JSON.parse(document.getElementById('ProductJson-template').innerHTML),
            //     IdSelectsticky = '.product-select_pr',
            //     NtIdsticky = '.nt_select_pr_',
            //     selectostickyr = '.nt_cart_form',
            //     callBackVariantsticky = '#callBackVariantsticky',
            //     prefixsticky='_sticky';
            //     elessiShopifyPre.Ntproduct_switch('.variations_form_sticky',Ntproductsticky,productsticky,selectostickyr,IdSelectsticky,NtIdsticky,callBackVariantsticky,prefixsticky);
               // $('#nt_select_sticky_0 .is-selected-none').click();
               // $('#nt_select_sticky_1 .is-selected-none').click();
               // $('#nt_select_sticky_2 .is-selected-none').click();
            $(document).on('click', '.toogle_sticky_add', function(e) {
              e.preventDefault();
                $('body').addClass('opend_sticky');
                toogle.hide();
                group_sticky.show();
            });
            $(document).on('click', '#callBackVariantsticky .close-sticky', function(e) {
              e.preventDefault();
                $('body').removeClass('opend_sticky');
                toogle.show();
                group_sticky.hide();
            });
         }
         $(window).scroll(function(event) {
           var sc = $(window).scrollTop();
           if (sc > NTsettingspr.scrolltop) {
             $('.sticky-nt-atc').addClass('popup-display');
             $('body').addClass('add_sticky_nt');
           }
           else{
             $('.sticky-nt-atc').removeClass('popup-display');
            $('body').removeClass('add_sticky_nt');
           }
         });
       },
       favicon_counter: function(badge) {
         if( !nathan_settings.favicon_counter || Shopify.designMode) return;
          var favicon = new Favico({
           animation : nathan_settings.favanimation,
            bgColor : nathan_settings.favbgColor,
            textColor : nathan_settings.favtextColor
         });
         favicon.badge(badge);
       },
      checkoutIndicator : function() {
         $('body').on('click', '.cart-drawer__cart', function(evt) { $(this).addClass('btn--loader-active');});
         if( nathan_settings.use_agree_checkbox == 'no' ) {
            $('body').on('click', '[name="checkout"], [name="goto_pp"], [name="goto_gc"], .additional-checkout-buttons', function(evt) { $(this).addClass('btn--loader-active');});
         }
        if( nathan_settings.use_agree_checkbox == 'no' ) return;
        $('body').on('click', '.nt_agree', function(evt) {
          if ($(this).is(':checked')) {
            $(this).closest('.form_nt_agree').removeClass('pe_none none_checked');
          } else {
            $(this).closest('.form_nt_agree').addClass('pe_none none_checked');
          }
       });
       $('body').on('click', '[name="checkout"], [name="goto_pp"], [name="goto_gc"], .additional-checkout-buttons', function(evt) {
         //evt.preventDefault();
         if( ! $(this).closest('.form_nt_agree').hasClass('nt_checkout')) return;
            if ($(this).closest('.form_nt_agree').find('.nt_agree').is(':checked')) {
               $(this).addClass('btn--loader-active ').submit();
            }
            else {
               $(this).closest('.form_nt_agree').addClass('none_checked');
               var html = [
                   '<div class="added-to-cart">',
                       '<p>' + nathan_settings.conditions + '</p>',
                   '</div>',
               ].join("");
               $.magnificPopup.open({
                   callbacks: {
                       beforeOpen: function() {
                           this.st.mainClass = elessiTheme.popupAnimation + '  cart-popup-wrapper';
                       },
                   },
                   items: {
                       src: '<div class="white-popup add-to-cart-popup popup-added_to_cart nt_agree_checkout">' + html + '</div>',
                       type: 'inline'
                   }
               });

               $('.white-popup').on('click', '.close-popup', function(e) {
                   e.preventDefault();
                   $.magnificPopup.close();
               });
              return false;
            }
          });
      },
                 

                    
      currencyForm: function () {

        if ( $('#currency_form').length == 0 ) return;
          $(document).on("click",".currencies li:not(.black_menu) a",function(ev) {
             ev.preventDefault();
            $('.currency-item').removeClass('selected');
            var Currency_text = $(this).text(),
                dtcurremcy = $.trim($(this).data('currency')),
                $this = $('.currencies a[data-currency=' + dtcurremcy + ']');
            $this.addClass('selected');

            $('.selected-currency').text(Currency_text);
            $('.selected_flag').html('<i class="jas_flag flag_'+dtcurremcy+'"></i>');
            $("#CurrencySelector").val(dtcurremcy);
            $('#currency_form').submit();
          });

         if (!nathan_settings.show_multiple_visitor) return;
          var cookieCurrency = null;
          if (sp_nt_storage) { cookieCurrency = localStorage.getItem('T4Currency'); }
          if (cookieCurrency == null ){
            $.ajax({
               type: 'get',
               url: 'https://extreme-ip-lookup.com/json',
               dataType: "json",
               success: function (data) {
                  localStorage.setItem('nt_currency', JSON.stringify(data));
                  var arrayCurrency ={AF:"AFN",AX:"EUR",AL:"ALL",DZ:"DZD",AS:"USD",AD:"EUR",AO:"AOA",AI:"XCD",AQ:"",AG:"XCD",AR:"ARS",AM:"AMD",AW:"AWG",AU:"AUD",AT:"EUR",AZ:"AZN",BS:"BSD",BH:"BHD",BD:"BDT",BB:"BBD",BY:"BYN",BE:"EUR",BZ:"BZD",BJ:"XOF",BM:"BMD",BT:"BTN",BO:"BOB",BA:"BAM",BW:"BWP",BV:"NOK",BR:"BRL",IO:"USD",BN:"BND",BG:"BGN",BF:"XOF",BI:"BIF",KH:"KHR",CM:"XAF",CA:"CAD",CV:"CVE",KY:"KYD",CF:"XAF",TD:"XAF",CL:"CLP",CN:"CNY",CX:"AUD",CC:"AUD",CO:"COP",KM:"KMF",CG:"XAF",CD:"CDF",CK:"NZD",CR:"CRC",CI:"XOF",HR:"HRK",CU:"CUP",CY:"EUR",CZ:"CZK",DK:"DKK",DJ:"DJF",DM:"XCD",DO:"DOP",EC:"USD",EG:"EGP",SV:"USD",GQ:"XAF",ER:"ERN",EE:"EUR",ET:"ETB",FK:"FKP",FO:"DKK",FJ:"FJD",FI:"EUR",FR:"EUR",GF:"EUR",PF:"XPF",TF:"EUR",GA:"XAF",GM:"GMD",GE:"GEL",DE:"EUR",GH:"GHS",GI:"GIP",GR:"EUR",GL:"DKK",GD:"XCD",GP:"EUR",GU:"USD",GT:"GTQ",GG:"GBP",GN:"GNF",GW:"XOF",GY:"GYD",HT:"HTG",HM:"AUD",VA:"EUR",HN:"HNL",HK:"HKD",HU:"HUF",IS:"ISK",IN:"INR",ID:"IDR",IR:"IRR",IQ:"IQD",IE:"EUR",IM:"GBP",IL:"ILS",IT:"EUR",JM:"JMD",JP:"JPY",JE:"GBP",JO:"JOD",KZ:"KZT",KE:"KES",KI:"AUD",KR:"KRW",KW:"KWD",KG:"KGS",LA:"LAK",LV:"EUR",LB:"LBP",LS:"LSL",LR:"LRD",LY:"LYD",LI:"CHF",LT:"EUR",LU:"EUR",MO:"MOP",MK:"MKD",MG:"MGA",MW:"MWK",MY:"MYR",MV:"MVR",ML:"XOF",MT:"EUR",MH:"USD",MQ:"EUR",MR:"MRU",MU:"MUR",YT:"EUR",MX:"MXN",FM:"USD",MD:"MDL",MC:"EUR",MN:"MNT",ME:"EUR",MS:"XCD",MA:"MAD",MZ:"MZN",MM:"MMK",NA:"NAD",NR:"AUD",NP:"NPR",NL:"EUR",AN:"",NC:"XPF",NZ:"NZD",NI:"NIO",NE:"XOF",NG:"NGN",NU:"NZD",NF:"AUD",MP:"USD",NO:"NOK",OM:"OMR",PK:"PKR",PW:"USD",PS:"ILS",PA:"PAB",PG:"PGK",PY:"PYG",PE:"PEN",PH:"PHP",PN:"NZD",PL:"PLN",PT:"EUR",PR:"USD",QA:"QAR",RE:"EUR",RO:"RON",RU:"RUB",RW:"RWF",BL:"EUR",SH:"SHP",KN:"XCD",LC:"XCD",MF:"EUR",PM:"EUR",VC:"XCD",WS:"WST",SM:"EUR",ST:"STN",SA:"SAR",SN:"XOF",RS:"RSD",SC:"SCR",SL:"SLL",SG:"SGD",SK:"EUR",SI:"EUR",SB:"SBD",SO:"SOS",ZA:"ZAR",GS:"GBP",ES:"EUR",LK:"LKR",SD:"SDG",SR:"SRD",SJ:"NOK",SZ:"SZL",SE:"SEK",CH:"CHF",SY:"SYP",TW:"TWD",TJ:"TJS",TZ:"TZS",TH:"THB",TL:"USD",TG:"XOF",TK:"NZD",TO:"TOP",TT:"TTD",TN:"TND",TR:"TRY",TM:"TMT",TC:"USD",TV:"AUD",UG:"UGX",UA:"UAH",AE:"AED",GB:"GBP",US:"USD",UM:"USD",UY:"UYU",UZ:"UZS",VU:"VUV",VE:"VEF",VN:"VND",VG:"USD",VI:"USD",WF:"XPF",EH:"MAD",YE:"YER",ZM:"ZMW",ZW:"ZWD"};
                  cookieCurrency = arrayCurrency[data.countryCode];
                  if (sp_nt_storage) { localStorage.setItem('T4Currency', cookieCurrency ); }
                  $('.currencies a[data-currency="'+cookieCurrency+'"]:first').trigger('click');
               },
               error: function (XMLHttpRequest, textStatus) {
                 $.ajax({
                    type: 'get',
                    url: 'https://api.teathemes.net/currency',
                    dataType: "json",
                    success: function(data) {
                      localStorage.setItem('nt_currency', JSON.stringify(data));
                      cookieCurrency = data.currency;
                      if (sp_nt_storage) { localStorage.setItem('T4Currency', cookieCurrency ); }
                      $('.currencies a[data-currency="'+cookieCurrency+'"]:first').trigger('click');
                    }
                 });
               }
            });
          }

       },

         // Add to cart popup
         wcPopupAddtocart: function () {
            if (!$('body').hasClass('nt_action_popup_upsell')) return;

            $('body').on('click', '.ajax_modal_add', function (e) {
               e.preventDefault();

               var _btn = $(this),
                  _id = _btn.data('pid'),
                  ntid = _btn.data('ntid');

               $('.cart__popup').addClass('loading');
               $.ajax({
                  type: 'POST',
                  url: '/cart/add.js',
                  data: {
                     quantity: 1,
                     id: _id
                  },
                  dataType: 'json',
                  success: function (cart) {
                     jQuery.get('/cart?view=upsell', function (data) {
                        $('#content_cart__popup_nt').html(data);
                        //elessiShopify.search_true('#upsell_nt', ntid, 'nathan_upsell');
                     }).always(function (data) {
                        if (nathan_settings.show_multiple_currencies && elessiShopifyPre.StorageCurrency() !== null) {
                           Currency.convertAll(shopCurrency, elessiShopifyPre.StorageCurrency(), '#content_cart__popup_nt span.money');
                        }
                        elessiShopify.nanoScroller();
                        $('.cart__popup').removeClass('loading');
                     });
                     $.get('/cart?view=json', function (data) {
                        /*optional stuff to do after success */
                        $('.widget_shopping_cart_content').html(data);
                     }).always(function () {
                        var subtotal = parseFloat($('.widget_shopping_cart_body').data('subtotal'));
                        $(".gecko-cart-subtotal >span").html(elessiShopifyPre.formatMoney(subtotal, nathan_settings.moneyFormat));
                        $(".cartCount").html($('.widget_shopping_cart_body').data('count'));
                        elessiShopify.favicon_counter(parseInt($('.widget_shopping_cart_body').data('count')));
                        elessiShopify.nanoScroller();
                        if (nathan_settings.show_multiple_currencies && elessiShopifyPre.StorageCurrency() !== null) {
                           Currency.convertAll(shopCurrency, elessiShopifyPre.StorageCurrency(), '.widget_shopping_cart_content span.money');
                           Currency.convertAll(shopCurrency, elessiShopifyPre.StorageCurrency(), '.gecko-cart-subtotal  span.money');
                        }
                     });
                  },
                  error: function (XMLHttpRequest, textStatus) {
                     elessiShopify.onError(XMLHttpRequest, textStatus);
                     $('.cart__popup').removeClass('loading');
                  }
               });
            })

            function wcPopupUpdateCart(_id, new_qty) {
               $('.cart__popup').addClass('loading');
               $.ajax({
                  type: 'POST',
                  url: '/cart/change.js',
                  data: 'quantity=' + new_qty + '&id=' + _id,
                  dataType: 'json',
                  success: function (cart) {
                     jQuery.get('/cart?view=up_ajax', function (data) {
                        //$('#push_cart_items').html(data);
                        data = jQuery(data);
                        var sdata = jQuery(data);
                        var t_html = jQuery(sdata.get(0)).html(),
                           t_threshold = jQuery(sdata.get(1)).html(),
                           t_total = $('.cart__popup #' + _id).find('.cart__popup-total .amount');
                        $('.cart__popup #' + _id).find('.cart__popup-qty--input').val(new_qty);
                        var price = parseFloat(t_total.data('price')) * new_qty;
                        t_total.html(elessiShopifyPre.formatMoney(price, nathan_settings.moneyFormat));
                        $('#cart__popup_total').html(t_html);
                        $('#threshold_bar_popup').html(t_threshold);
                     }).always(function () {
                        if (nathan_settings.show_multiple_currencies && elessiShopifyPre.StorageCurrency() !== null) {
                           Currency.convertAll(shopCurrency, elessiShopifyPre.StorageCurrency(), '#content_cart__popup_nt span.money');
                        }
                        elessiShopify.nanoScroller();
                        $('.cart__popup #undo-' + _id).find('.cart__popup-qty--input').val(new_qty);
                        $('.cart__popup').removeClass('loading');
                     });
                     $.get('/cart?view=json', function (data) {
                        /*optional stuff to do after success */
                        $('.widget_shopping_cart_content').html(data);
                     }).always(function () {
                        var subtotal = parseFloat($('.widget_shopping_cart_body').data('subtotal'));
                        $(".gecko-cart-subtotal >span").html(elessiShopifyPre.formatMoney(subtotal, nathan_settings.moneyFormat));
                        $(".cartCount").html($('.widget_shopping_cart_body').data('count'));
                        elessiShopify.favicon_counter(parseInt($('.widget_shopping_cart_body').data('count')));
                        elessiShopify.nanoScroller();
                        if (nathan_settings.show_multiple_currencies && elessiShopifyPre.StorageCurrency() !== null) {
                           Currency.convertAll(shopCurrency, elessiShopifyPre.StorageCurrency(), '.widget_shopping_cart_content span.money');
                           Currency.convertAll(shopCurrency, elessiShopifyPre.StorageCurrency(), '.gecko-cart-subtotal  span.money');
                        }
                     });
                  },
                  error: function (XMLHttpRequest, textStatus) {
                     elessiShopify.onError(XMLHttpRequest, textStatus);
                     $('.cart__popup').removeClass('loading');
                  }
               });
            }
            $('body').on('change', '.cart__popup-qty--input', function (e) {
               var _this = $(this),
                  _id = _this.attr('data-id'),
                  new_qty = parseInt(_this.val()),
                  _min = parseInt(_this.attr('min')),
                  _step = parseInt(_this.attr('step')),
                  _max = parseInt(_this.attr('max')),
                  invalid = false;
               if (new_qty === 0) {
                  var las_qty = parseInt(_this.attr('value'));
                  _this.val(las_qty);
                  _this.parents('.cart__popup-item').find('.cart__popup-remove').trigger('click');
                  return;

               } else if (isNaN(new_qty) || new_qty < 0) {
                  invalid = true;

               } else if (new_qty > _max && _max > 0) {
                  _this.val(_max);
                  alert('Maximum Quantity: ' + _max);
                  return;

               } else if (new_qty < _min) {
                  invalid = true;

               } else if ((new_qty % _step) !== 0) {
                  alert('Quantity can only be purchased in multiple of ' + _step);
                  invalid = true;

               } else {
                  wcPopupUpdateCart(_id, new_qty);
               }

               if (invalid === true) {
                  _this.val(1);
               }
            });

            $('body').on('click', '.cart__popup-qty', function (e) {
               e.preventDefault();
               var _this = $(this),
                  _qty = _this.siblings('.cart__popup-qty--input'),
                  _id = _qty.attr('data-id'),
                  _qtyinput = parseFloat(_qty.val()),
                  _step = parseFloat(_qty.attr('step')),
                  _min = parseFloat(_qty.attr('min')),
                  _max = parseFloat(_qty.attr('max'));

               _qty.trigger('focusin');
               console.log(_step)
               console.log(_qtyinput)
               if (_this.hasClass('cart__popup-qty--plus')) {
                  var _newqty = _qtyinput + _step;
                  console.log(_newqty)
                  if (_newqty > _max && _max > 0) {
                     _qty.val(_max);
                     alert('Maximum Quantity: ' + _max);
                     return;
                  }
               } else if (_this.hasClass('cart__popup-qty--minus')) {
                  var _newqty = _qtyinput - _step;
                  console.log(_newqty)
                  if (_newqty === 0) {
                     var las_qty = parseInt(_qty.attr('value'));
                     _qty.val(las_qty);
                     _this.parents('.cart__popup-item').find('.cart__popup-remove').trigger('click');
                     return;
                  } else if (_newqty < _min) {
                     return;
                  } else if (_qtyinput < 0) {
                     alert('Invalid');
                     return;
                  }
               }
               console.log(_id)
               wcPopupUpdateCart(_id, _newqty);
            })

            // Remove item from the cart
            $('body').on('click', '.cart__popup-remove', function (e) {
               e.preventDefault();
               $('.cart__popup').addClass('loading');

               var _this = $(this),
                  _qty = _this.siblings('.cart__popup-quantity').find('.cart__popup-qty--input'),
                  _id = _this.find('a').attr('data-product_id'),
                  _qtyinput = parseInt(_qty.val());

               $('.cart__popup').addClass('loading');
               $.ajax({
                  type: 'POST',
                  url: '/cart/change.js',
                  data: 'quantity=0&id=' + _id,
                  dataType: 'json',
                  success: function (cart) {
                     jQuery.get('/cart?view=up_ajax', function (data) {}).always(function (data) {
                        data = jQuery(data);
                        var sdata = jQuery(data);
                        var t_html = jQuery(sdata.get(0)).html(),
                           t_threshold = jQuery(sdata.get(1)).html();;
                        $('#cart__popup_total').html(t_html);
                        $('#threshold_bar_popup').html(t_threshold);
                        $('.cart__popup #' + _id).addClass('hide');
                        if (_qtyinput > 0) {
                           $('#' + _id + ' input').val(_qtyinput)
                        } else {
                           $('.cart__popup #' + _id + ' input').val(1)
                        }
                        $('#undo-' + _id).removeClass('hide');
                        if (nathan_settings.show_multiple_currencies && elessiShopifyPre.StorageCurrency() !== null) {
                           Currency.convertAll(shopCurrency, elessiShopifyPre.StorageCurrency(), '#content_cart__popup_nt span.money');
                        }
                        elessiShopify.nanoScroller();
                        $('.cart__popup').removeClass('loading');
                     });
                     $.get('/cart?view=json', function (data) {
                        /*optional stuff to do after success */
                        $('.widget_shopping_cart_content').html(data);
                     }).always(function () {
                        var subtotal = parseFloat($('.widget_shopping_cart_body').data('subtotal'));
                        $(".gecko-cart-subtotal >span").html(elessiShopifyPre.formatMoney(subtotal, nathan_settings.moneyFormat));
                        $(".cartCount").html($('.widget_shopping_cart_body').data('count'));
                        elessiShopify.favicon_counter(parseInt($('.widget_shopping_cart_body').data('count')));
                        if (window.Shopify && Shopify.StorefrontExpressButtons && nathan_settings.use_additional_checkout_buttons) {
                           Shopify.StorefrontExpressButtons.initialize();
                        }
                        elessiShopify.nanoScroller();
                        if (nathan_settings.show_multiple_currencies && elessiShopifyPre.StorageCurrency() !== null) {
                           Currency.convertAll(shopCurrency, elessiShopifyPre.StorageCurrency(), '.widget_shopping_cart_content span.money');
                           Currency.convertAll(shopCurrency, elessiShopifyPre.StorageCurrency(), '.gecko-cart-subtotal  span.money');
                        }
                     });
                  },
                  error: function (XMLHttpRequest, textStatus) {
                     elessiShopify.onError(XMLHttpRequest, textStatus);
                     $('.cart__popup').removeClass('loading');
                  }
               });
            });

            // Undo the product removed
            $('body').on('click', '.cart__popup-undo', function (e) {
               e.preventDefault();
               var _this = $(this),
                  _id = _this.attr('data-id'),
                  _qty = $('.cart__popup #' + _id).find('.cart__popup-qty--input').val(),
                  new_qty = parseInt(_qty);
               $('.cart__popup').addClass('loading');
               $.ajax({
                  type: 'POST',
                  url: '/cart/add.js',
                  data: {
                     quantity: new_qty,
                     id: _id
                  },
                  dataType: 'json',
                  success: function (cart) {
                     jQuery.get('/cart?view=up_ajax', function (data) {}).always(function (data) {
                        data = jQuery(data);
                        var sdata = jQuery(data);
                        var t_html = jQuery(sdata.get(0)).html(),
                           t_threshold = jQuery(sdata.get(1)).html();;
                        $('#cart__popup_total').html(t_html);
                        $('#threshold_bar_popup').html(t_threshold);
                        $('#undo-' + _id).addClass('hide');
                        $('.cart__popup #' + _id).removeClass('hide');
                        if (nathan_settings.show_multiple_currencies && elessiShopifyPre.StorageCurrency() !== null) {
                           Currency.convertAll(shopCurrency, elessiShopifyPre.StorageCurrency(), '#content_cart__popup_nt span.money');
                        }
                        elessiShopify.nanoScroller();
                        $('.cart__popup').removeClass('loading');
                     });
                     $.get('/cart?view=json', function (data) {
                        /*optional stuff to do after success */
                        $('.widget_shopping_cart_content').html(data);
                     }).always(function () {
                        var subtotal = parseFloat($('.widget_shopping_cart_body').data('subtotal'));
                        $(".gecko-cart-subtotal >span").html(elessiShopifyPre.formatMoney(subtotal, nathan_settings.moneyFormat));
                        $(".cartCount").html($('.widget_shopping_cart_body').data('count'));
                        elessiShopify.favicon_counter(parseInt($('.widget_shopping_cart_body').data('count')));
                        elessiShopify.nanoScroller();
                        if (nathan_settings.show_multiple_currencies && elessiShopifyPre.StorageCurrency() !== null) {
                           Currency.convertAll(shopCurrency, elessiShopifyPre.StorageCurrency(), '.widget_shopping_cart_content span.money');
                           Currency.convertAll(shopCurrency, elessiShopifyPre.StorageCurrency(), '.gecko-cart-subtotal  span.money');
                        }
                     });
                  },
                  error: function (XMLHttpRequest, textStatus) {
                     elessiShopify.onError(XMLHttpRequest, textStatus);
                     $('.cart__popup').removeClass('loading');
                  }
               });
            });
         }
   }
   }());
})( jQuery );

jQuery(document).ready(function($) {
   if (!Modernizr.hovermq){FastClick.attach(document.body);}
   elessiShopify.init();
   elessiShopify.instagram();
   elessiShopify.stickySidebarBtn();
   elessiShopify.stickySidebarDefaultBtn();
   if ($('.nt_filter_color .chosen').length == 1) {var str = $('.nt_filter_color .chosen a div').attr('class');$('.swatch__list--item[data-nt="'+str.replace("filter-swatch bg_color_", "")+'"]').trigger("click")}
   if ($('body').hasClass('template-product')) {
      if (nathan_settings.has_grouped) {
      elessiShopify.Ntproduct_grouped('.nt_pr_grouped','');
      }
      if (nathan_settings.stock_countdown){
      elessiShopify.progressbar('.nt_progress_bar_pr');
      }
       elessiShopify.real_time();
      if (nathan_settings.flash_sold){
      elessiShopify.flashSoldBar('');
      }
      if (nathan_settings.enable_delivery_option || nathan_settings.enable_delivery_order){
      elessiShopify.delivery_order('#nt_product_delivery');
      }
   }
   if (navigator.cookieEnabled == false) { $('body').addClass('cookie_disable')}
    $('body').on('click', function(event) {
     // console.log(event)
        if (($(event.target).is('.cd-close') && $('body').hasClass('open_quickview')) || ( $(event.target).is('div.mask-overlay') && $('body').hasClass('open_quickview')) ) {
            elessiShopify.closeQuickView(sliderFinalWidth, maxQuickWidth);
        }
    });
    $(document).keyup(function(event) {
        if (event.which == '27' && $('body').hasClass('open_quickview')) {
            elessiShopify.closeQuickView(sliderFinalWidth, maxQuickWidth);
        }
    });
    $(window).on('resize', function() {
        if ($('.cd-quick-view').hasClass('is-visible')) {
            window.requestAnimationFrame(elessiShopify.resizeQuickView);
        }
    });
   $(".nasa-nav-slick-next a").click(function(e){
        e.preventDefault();
        var $this = $(this),
            thumb = $this.closest( '.p-thumb' );
        thumb.slick("slickNext");
    });
   $(".nasa-nav-slick-prev a").click(function(e){
        e.preventDefault();
        $( '.p-thumb' ).slick("slickPrev");
    });
   
   var timer;
   if (Modernizr.hovermq) {
      $( ".menu-section .nt-has-children:not(.menu-item-top)" ).hover(function() {
         var subMenu = $(this).find(".nav_dropdown"),
             getNavHeight = subMenu.innerHeight(),
             headerHeight = window.innerHeight - $('.header_section').innerHeight();
            if (getNavHeight > headerHeight) {
                subMenu.css({
                    "maxHeight": headerHeight - 15,
                    "overflow" : "hidden",
                    "overflow-y": "auto"
                });
            }
      });

      $( ".menu-item-top.nt-has-children" ).hover(function() {
         var $this = $(this);
           //clearTimeout(timer);
         $this.addClass('nt_hover');
         $('.nt_overlay_header').addClass('visible');
         $('.nt_overlay_content').addClass('visible');
         $('.nt_overlay_footer').addClass('visible');
      }, function(){
         $('.nt_overlay_header').removeClass('visible');
         $('.nt_overlay_content').removeClass('visible');
         $('.nt_overlay_footer').removeClass('visible');
         var $this = $(this);
         timer = setTimeout(function(){
          $this.removeClass('nt_hover');
        }, 200); 
      });

      $( ".nt-has-children:not(.menu-item-top)" ).hover(function() {
         var $this = $(this);
           //clearTimeout(timer);
         $this.addClass('nt_hover');
         $('.nt_overlay_content').addClass('visible');
         $('.nt_overlay_footer').addClass('visible');
         if ( $this.hasClass('nathan-cart-icon') && ($('.cart-drawer__content').last().height() < $('.cart-drawer__content-container').last().height()) ) {
          $('.cart-drawer').addClass('is-scrollable');
          setTimeout(function(){ $('.cart-drawer').removeClass('is-scrollable')}, 1500);
         }
      }, function(){
         $('.nt_overlay_content').removeClass('visible');
         $('.nt_overlay_footer').removeClass('visible');
         var $this = $(this);
         timer = setTimeout(function(){
          $this.removeClass('nt_hover');
        }, 200); 
      });
   } else {
      $( ".nathan-action .nt-has-children>a" ).on('click', function(e){ e.preventDefault(); });
      $( ".nt-has-children" ).on('click', function(e){
             var $this = $(this);
             if($this.hasClass('nt_hover')) {
               $( ".nt-has-children.nt_hover" ).removeClass('nt_hover');
             } else {
               $this.addClass('nt_hover');
               if ( $this.hasClass('nathan-cart-icon') && ($('.cart-drawer__content').last().height() < $('.cart-drawer__content-container').last().height()) ) {
                $('.cart-drawer').addClass('is-scrollable');
                setTimeout(function(){ $('.cart-drawer').removeClass('is-scrollable')}, 1500);
               }
             }
      });
      // $( ".nt-has-children" ).on('click', function(e){
      //    $( ".nt-has-children.nt_hover" ).removeClass('nt_hover');
      //    $(this).addClass('nt_hover');
      //    if ( $this.hasClass('nathan-cart-icon') && ($('.cart-drawer__content').last().height() < $('.cart-drawer__content-container').last().height()) ) {
      //     $('.cart-drawer').addClass('is-scrollable');
      //     setTimeout(function(){ $('.cart-drawer').removeClass('is-scrollable')}, 1500);
      //    } 
      // });
   }

});
jQuery( window ).resize(function() {
   //elessiShopify.EqualHeight();
   elessiShopify.spInitSwitchLayout();
   if ($(window).width() < 1024 && $('body').hasClass('open_quickview') ) {
     elessiShopify.closeQuickView(sliderFinalWidth, maxQuickWidth);
   }
   if ($('.p-thumb.nt-masonry:not(.slick-initialized)').length > 0 && nathan_settings.nt_suffix !== "group_images" ) {

      if ($(window).width() > 740 && $(window).width() !== 812) {
      }else {
          setTimeout(function(){
         $('.p-thumb.nt-masonry').isotope('destroy');
         $('.p-thumb.nt-masonry').slick().slick("refresh").addClass('slick_loaded');
         $('.p-thumb.nt-masonry.slick-initialized').slick('refresh');
         }, 1500);
      }
   }
   //elessiShopify.spb_animate();
  // elessiShopify.initMegaMenu();
  //elessiShopify.initStickyMenu();
});
jQuery( window ).load( function() {
   // $('.nt-masonry').isotope('layout');
   //                setTimeout(function(){$('.nt-masonry').isotope('layout');}, 500);
   //          setTimeout(function(){$('.nt-masonry').isotope('layout');}, 1000);
   // elessiShopify.instagram();
   // elessiShopify.stickySidebarBtn();
   // elessiShopify.stickySidebarDefaultBtn();
   //elessiShopify.nt_pr_recent();
   //elessiShopify.shopMasonry();
   //elessiShopify.lazyload();
   
});

if (Shopify.designMode) {
   //console.log('section load');
   jQuery(document)
     .on('shopify:section:load', elessiShopify.productsLoadMore)
     .on('shopify:section:unload', elessiShopify.productsLoadMore)
     .on('shopify:section:select', elessiShopify.productsLoadMore)
     .on('shopify:section:deselect', elessiShopify.productsLoadMore)
     .on('shopify:block:select',elessiShopify.productsLoadMore)
     .on('shopify:block:deselect', elessiShopify.productsLoadMore);
   jQuery(document)
     .on('shopify:section:load', elessiShopify.beforeAfter)
     .on('shopify:section:unload', elessiShopify.beforeAfter)
     .on('shopify:section:select', elessiShopify.beforeAfter)
     .on('shopify:section:deselect', elessiShopify.beforeAfter)
     .on('shopify:block:select',elessiShopify.beforeAfter)
     .on('shopify:block:deselect', elessiShopify.beforeAfter);
                 
   jQuery(document)
     .on('shopify:section:load', elessiShopify.spb_animate)
     .on('shopify:section:unload', elessiShopify.spb_animate)
     .on('shopify:section:select', elessiShopify.spb_animate)
     .on('shopify:section:deselect', elessiShopify.spb_animate)
     .on('shopify:block:select',elessiShopify.spb_animate)
     .on('shopify:block:deselect', elessiShopify.spb_animate);
   jQuery(document)
     .on('shopify:section:load', elessiShopify.pin__type)
     .on('shopify:section:unload', elessiShopify.pin__type)
     .on('shopify:section:select', elessiShopify.pin__type)
     .on('shopify:section:deselect', elessiShopify.pin__type)
     .on('shopify:block:select',elessiShopify.pin__type)
     .on('shopify:block:deselect', elessiShopify.pin__type);
     
   jQuery(document)
     .on('shopify:section:load', elessiShopify.initCountdown)
     .on('shopify:section:unload', elessiShopify.initCountdown);
   jQuery(document)
     .on('shopify:section:load', elessiShopify.initCountdown_page)
     .on('shopify:section:unload', elessiShopify.initCountdown_page);
    jQuery(document)
     .on('shopify:section:load', elessiShopify.fullHeightRow)
     .on('shopify:section:unload', elessiShopify.fullHeightRow);
   jQuery(document)
     .on('shopify:section:load', elessiShopify.initVideoBackgrounds)
     .on('shopify:section:unload', elessiShopify.initVideoBackgrounds);
   jQuery(document)
     .on('shopify:section:load', elessiShopify.parallax)
     .on('shopify:section:unload', elessiShopify.parallax)
     .on('shopify:block:select',elessiShopify.parallax)
     .on('shopify:block:deselect', elessiShopify.parallax);
   jQuery(document)
     .on('shopify:section:load', elessiShopify.instagram)
     .on('shopify:section:unload', elessiShopify.instagram);
   jQuery(document)
     .on('shopify:section:load', elessiShopify.nt_map)
     .on('shopify:section:unload', elessiShopify.nt_map)
     .on('shopify:block:select',elessiShopify.nt_map)
     .on('shopify:block:deselect', elessiShopify.nt_map);
   jQuery(document)
     .on('shopify:section:load', elessiShopify.initMegaMenu)
     .on('shopify:section:unload', elessiShopify.initMegaMenu)
     .on('shopify:block:select',elessiShopify.initMegaMenu)
     .on('shopify:block:deselect', elessiShopify.initMegaMenu);
   jQuery(document)
     .on('shopify:section:load', elessiShopify.spAccordion)
     .on('shopify:section:unload', elessiShopify.spAccordion)
     .on('shopify:block:select',elessiShopify.spAccordion)
     .on('shopify:block:deselect', elessiShopify.spAccordion);
}
if ($('body').hasClass('template-collection') && Shopify.designMode) {
jQuery(document)
     .on('shopify:section:load', elessiShopify.nanoScroller)
     .on('shopify:section:unload', elessiShopify.nanoScroller)
     .on('shopify:block:select',elessiShopify.nanoScroller)
     .on('shopify:block:deselect', elessiShopify.nanoScroller);
}

