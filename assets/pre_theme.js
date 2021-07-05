var elessiShopifyPre,Nt_money_format = '${{amount}}',sp_nt_storage = false,Enablestorage = true;
try {
   sp_nt_storage = (typeof(Storage) !== "undefined" && Enablestorage);
} catch (err) {
   sp_nt_storage = false;
}
if(sp_nt_storage) {
var nt_currency = localStorage.getItem('nt_currency');
} else {
 var nt_currency = null;
}
(function( $ ) {
   "use strict";
   elessiShopifyPre = (function() {
   return {
      init: function() {
         this.initCarousel();
         this.initMasonry(); 
         this.shopMasonry();
      },    

      // Init slick carousel
      initCarousel : function() {
         $( '.nt-carousel' ).not( '.slick-initialized' ).slick();
      },
      StorageCurrency: function () {
        var cookieCurrency = null;
        if(sp_nt_storage) {cookieCurrency = localStorage.getItem('T4Currency')}
        return cookieCurrency;
      },
       // Categories masonry
      shopMasonry: function() {
         if (typeof($.fn.isotope) == 'undefined' || typeof($.fn.imagesLoaded) == 'undefined') return;
          // Categories masonry
          $(window).resize(function() {
            $(".categories-masonry").each(function (index) {
              var $el = $(this);
              var colWidth = ( $el.hasClass( 'categories-style-masonry' ) )  ? '.nt-item-category' : '.col-lg-3.nt-item-category' ;
              $el.imagesLoaded().done( function(instance) {
                  setTimeout(function(){
                     $el.isotope({
                         resizable: false,
                         isOriginLeft: ! $('body').hasClass('rtl'),
                         layoutMode: 'packery',
                         packery: {
                             gutter: 0,
                             columnWidth: colWidth
                         },
                         itemSelector: '.nt-item-category',
                         // masonry: {
                             // gutter: 0
                         // }
                     });
                     
                  }, 500);
                  // setTimeout(function(){
                  //    $el.isotope('layout');
                  // }, 2500);
              });
            });
          });
      },

      // Init masonry layout
      initMasonry : function() {
         if (typeof($.fn.isotope) == 'undefined' || typeof($.fn.imagesLoaded) == 'undefined') return;
         var el = $( '.nt-masonry' );
       
         el.each( function( i, val ) {
            var _option = $( this ).data( 'masonry' );
              //console.log(_option)
            if ( _option !== undefined ) {
               var _selector = _option.selector,
                  _width    = _option.columnWidth,
                  _layout   = _option.layoutMode;

               $( this ).imagesLoaded( function() {
                  $( val ).isotope( {
                     layoutMode : _layout,
                     isOriginLeft: ! $('body').hasClass('rtl'),
                     itemSelector: _selector,
                     percentPosition: true,
                     masonry: {
                        columnWidth: _width
                     }
                  } );
               });

               $( '.nt_filter_iso a' ).click( function() {
                  var selector = $( this ).data( 'filter' ),
                     parent   = $( this ).parents( '.nt_filter_iso' );

                  $( val ).isotope({ filter: selector });

                  // don't proceed if already selected
                  if ( $( this ).hasClass( 'selected' ) ) {
                     return false;
                  }
                  parent.find( '.selected' ).removeClass( 'selected' );
                  $( this ).addClass( 'selected' );

                  return false;
               });
            }
         });
      },
      Ntproduct_switch: function(variations_form,Ntproduct,product,selector,IdSelect,NtId,callBackVariant,prefix) {
        
        // fix soldout one variant
        
//         if ( Ntproduct.one_v ) {
//            var i,soldout = Ntproduct.Ntsoldout,
//                soldout_size = soldout.length;
          
//            $(NtId+Ntproduct.one_p+' .nt-swatch').addClass('nt_soldout');
//            for (i=0; i<soldout_size; i++) {
//               $(NtId+Ntproduct.one_p+' .nt-swatch[data-value="' + soldout[i] + '"]').removeClass('nt_soldout');
//            }
//         }
        var size_avai = product.size_avai;
        if (size_avai.indexOf(0) > -1) {
          //console.log(size_avai);
          if (product.remove_soldout) {
            var class_add = 'nt_unavailable';
          } else {
            var class_add = 'nt_soldout';
          }
          $(NtId + '0 .nt-swatch').each(function( index ) {
            if (size_avai[index] == 0) {
              $(this).addClass(class_add);
            }
          });

        }
        
        var val_color = $('#cart-form').find('.is-color .is-selected').data('value') || $('#cart-form').find('.is-color .is-selected-none').data('value') || $('#cart-form').find('.is-color .is-selected-no').data('value');
        if ($('.nt-group-carousel:not(.slick-initialized)').length > 0 && val_color) {
           $(".nt-group-carousel").slick().slick('slickFilter', '.bc_' + val_color).slick("refresh").addClass('slick_loaded');
        } else if ($('.p-thumb.nt-group-masonry').length > 0 && val_color) {

           if ($(window).width() > 740 && $(window).width() !== 812) {
              $('.nt-masonry').addClass('masonry_loaded').isotope({
                 filter: '.bc_' + val_color
              })
           } else {
                $('.p-thumb.nt-masonry').one( 'arrangeComplete', function() {
                    setTimeout(function(){  
                      $('.p-thumb.nt-masonry').isotope('destroy');
                      $('.p-thumb.nt-masonry').slick().slick('slickFilter', '.bc_' + val_color).slick("refresh").addClass('slick_loaded');
                      $('.p-thumb.nt-masonry.slick-initialized').slick('refresh');
                    }, 10);
                });
           }
        } else if ($('.p-thumb.nt-masonry').length > 0 && $(window).width() < 768) {
                $('.p-thumb.nt-masonry').one( 'arrangeComplete', function() {

                    setTimeout(function(){  
                      $('.p-thumb.nt-masonry').isotope('destroy');
                      $('.p-thumb.nt-masonry').slick();
                    }, 10);
                });
        }
        
         var $variation_form = $(variations_form),
            size = product.options.length;
         $variation_form.on('click', '.swatches-select > .nt-swatch:not(.is-selected):not(.nt_unavailable)', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var $this = $(this),
                value = $this.data('value'),
                id = $this.parent().data('id'),
                nt_color = $('#cart-form').find('.is-color .is-selected').data('value') || $('#cart-form').find('.is-color .is-selected-no').data('value');
           
            $this.parent().find('.is-selected').removeClass('is-selected');
            $this.addClass('is-selected');
            if (NtId == '.nt_select_pr_') {
              $('.nt_select_pr_'+id).find('.is-selected').removeClass('is-selected');
              $(".nt_select_pr_"+id+" [data-value="+value+"]").addClass('is-selected');
              $('.nt_select_pr_'+id+' .input-dropdown-inner >a').text( $(".nt_select_pr_"+id+" [data-value="+value+"]").attr('aria-label'));
            }
            var ck_color = $('#cart-form').find('.is-color .is-selected').data('value');
           
            if (selector == '.nt_cart_form' && ck_color != nt_color && nathan_settings.nt_suffix == "group_images" ) {
                 var val_color = $('#cart-form').find('.is-color .is-selected').data('value');
                 
                 //if (ck_color == val_color) return;
                 var $productGallery = $('.shopify-product-gallery');
                 
                if ($('.nt-group-carousel.slick-initialized').length > 0 && val_color) {
                   $('.nt-group-carousel.slick-initialized').removeClass('slick_loaded').slick("slickUnfilter").slick("unslick");
                   $('.nt-group-carousel').slick().slick('slickFilter', '.bc_' + val_color).slick("refresh").addClass('slick_loaded');
                } else if ($('.p-thumb.nt-group-masonry').length > 0 && val_color) {

                   if ($(window).width() > 740 && $(window).width() !== 812) {
                      $('.nt-masonry').addClass('masonry_loaded').isotope({
                         filter: '.bc_' + val_color
                      })
                   } else {
                      $('.p-thumb.nt-masonry.slick-initialized').removeClass('slick_loaded').slick("slickUnfilter").slick("unslick");
                      $('.p-thumb.nt-masonry').slick().slick('slickFilter', '.bc_' + val_color).slick("refresh").addClass('slick_loaded');
                      $('.p-thumb.nt-masonry.slick-initialized').slick('refresh');
                   }
                }
                 
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
           }
           
           if (size > 1) {
            $this.closest('.swatch').find('.nt_name_current').html($this.find('swatch__value').text() || $this.text() );
            if ( $(callBackVariant+' .variations .nt-swatch.is-selected').length < size ) return;
           }
           
           $variation_form.find('.ajax_form_cart').removeAttr("disabled");
           var ck_size = size;
           if (Ntproduct.one_v) { ck_size = 94}
           
            switch(ck_size) {
                //case 94: break;
                case 2:
                    var value0 = $(NtId+'0 .is-selected').data('value'),
                        value1 = $(NtId+'1 .is-selected').data('value'),
                        val = $(IdSelect+' option.nt_'+value0+'.nt1_'+value1).val();
                     $(IdSelect).val(val);
                    var index = $(NtId+'0 .is-selected').data('index');
                
                    if (typeof index === 'undefined') return;
                
                     $(NtId+'1 .nt-swatch').addClass('nt_unavailable nt_soldout');
                     var availableOptions = Ntproduct.Ntavailable[index],
                          soldoutOptions = Ntproduct.Ntsoldout[index];
                     
                     // check Unavailable
                      if ( !$(IdSelect).val() ){
                        //console.log('Unavailable')
                              $(NtId+'1 .nt-swatch').removeClass('is-selected');
                              $(NtId+'1 .nt-swatch[data-value="' + availableOptions[0] + '"]').addClass('is-selected');
                              value0 = $(NtId+'0 .is-selected').data('value');
                              value1 = $(NtId+'1 .is-selected').data('value');
                              val = $(IdSelect+' option.nt_'+value0+'.nt1_'+value1).val();
                              $(IdSelect).val(val);
                      }// endcheck Unavailable
                         for (var i=0; i<availableOptions.length; i++) {
                           var option = availableOptions[i];
                            $(NtId+'1 .nt-swatch[data-value="' + option + '"]').removeClass('nt_unavailable');
                         }
                         for (var i=0; i<soldoutOptions.length; i++) {
                           var option = soldoutOptions[i];
                            $(NtId+'1 .nt-swatch[data-value="' + option + '"]').removeClass('nt_soldout');
                         }
                    break;
                case 3:
                    var value0 = $(NtId+'0 .is-selected').data('value'),
                        value1 = $(NtId+'1 .is-selected').data('value'),
                        value2 = $(NtId+'2 .is-selected').data('value'),
                        val = $(IdSelect+' option.nt_'+value0+'.nt1_'+value1+'.nt2_'+value2).val();
                        $(IdSelect).val(val);
                     var index = $(NtId+'0 .is-selected').data('index');
                     if (typeof index === 'undefined') return;
                     //console.log(typeof index)
                        var availableOptions = Ntproduct.Ntavailable[index].NT,
                            soldoutOptions = Ntproduct.Ntsoldout[index].NT;
                
                       // check Unavailable
                       if ( !$(IdSelect).val() ){
                         // id = 0,1,2
                         //console.log('Unavailable')
//                          console.log(availableOptions)
//                          if (id == 0){
//                             var position = availableOptions.indexOf(value1);
//                             if (position >=0) {
//                               $(NtId+'2 .nt-swatch').removeClass('is-selected');
//                               $(NtId+'2 .nt-swatch[data-value="' + availableOptions[position+1] + '"]').addClass('is-selected');
//                             } else {
//                               $(NtId+'1 .nt-swatch').removeClass('is-selected');
//                               $(NtId+'1 .nt-swatch[data-value="' + availableOptions[0] + '"]').addClass('is-selected');
//                               $(NtId+'2 .nt-swatch').removeClass('is-selected');
//                               $(NtId+'2 .nt-swatch[data-value="' + availableOptions[1] + '"]').addClass('is-selected');
//                             }
//                          } else if (id == 1){
//                            var position = availableOptions.indexOf(value);
//                             $(NtId+'1 .nt-swatch').removeClass('is-selected');
//                             $(NtId+'1 .nt-swatch[data-value="' + availableOptions[position] + '"]').addClass('is-selected');
//                             $(NtId+'2 .nt-swatch').removeClass('is-selected');
//                             $(NtId+'2 .nt-swatch[data-value="' + availableOptions[position+1] + '"]').addClass('is-selected');

//                          } else {
//                          }
                         if (id == 1){
                           var position = availableOptions.indexOf(value);
                            $(NtId+'1 .nt-swatch').removeClass('is-selected');
                            $(NtId+'1 .nt-swatch[data-value="' + availableOptions[position] + '"]').addClass('is-selected');
                            $(NtId+'2 .nt-swatch').removeClass('is-selected');
                            $(NtId+'2 .nt-swatch[data-value="' + availableOptions[position+1] + '"]').addClass('is-selected');

                         } else {
                            var position = availableOptions.indexOf(value1);
                            if (position >=0) {
                              $(NtId+'2 .nt-swatch').removeClass('is-selected');
                              $(NtId+'2 .nt-swatch[data-value="' + availableOptions[position+1] + '"]').addClass('is-selected');
                            } else {
                              $(NtId+'1 .nt-swatch').removeClass('is-selected');
                              $(NtId+'1 .nt-swatch[data-value="' + availableOptions[0] + '"]').addClass('is-selected');
                              $(NtId+'2 .nt-swatch').removeClass('is-selected');
                              $(NtId+'2 .nt-swatch[data-value="' + availableOptions[1] + '"]').addClass('is-selected');
                            }
                         }
                            value0 = $(NtId+'0 .is-selected').data('value');
                            value1 = $(NtId+'1 .is-selected').data('value');
                            value2 = $(NtId+'2 .is-selected').data('value');
                            val = $(IdSelect+' option.nt_'+value0+'.nt1_'+value1+'.nt2_'+value2).val();
                            $(IdSelect).val(val);
                       }
                       // endcheck Unavailable
                             $(NtId+'1 .nt-swatch,'+NtId+'2 .nt-swatch').addClass('nt_unavailable');
                             $(NtId+'1 .nt-swatch,'+NtId+'2 .nt-swatch').addClass('nt_soldout');
                           //console.log('Unavailable');
                            
                             //console.log(availableOptions)
                             value1 = $(NtId+'1 .is-selected').data('value');
                             //console.log('value1 '+value1)
                             for (var i=0; i<availableOptions.length; i++) {
                               var option = availableOptions[i];

                               if (i % 2 == 0) {
                                 // select option 2
                                 $(NtId+'1 .nt-swatch[data-value="' + option + '"]').removeClass('nt_unavailable');
                                  // select option 3
                                  if (option == value1){
                                      var value2 = availableOptions[i+1];
                                    //console.log('value2 '+value2 )
                                     $(NtId+'2 .nt-swatch[data-value="' + value2 + '"]').removeClass('nt_unavailable');
                                   }
                               }
                             }
      //                        value1 = $(NtId+'1 .is-selected').data('value');
      //                        console.log('value1 '+value1)
                             for (var i=0; i<soldoutOptions.length; i++) {
                               var option = soldoutOptions[i];
                               //console.log('soldoutOptions '+soldoutOptions)
                               if (i % 2 == 0) {
                                 // select option 2
                                 $(NtId+'1 .nt-swatch[data-value="' + option + '"]').removeClass('nt_soldout');
                                  // select option 3
                                 
                                  if (option == value1){
                                      var value2 = soldoutOptions[i+1];
                                    //console.log('value2 '+value2 )
                                     $(NtId+'2 .nt-swatch[data-value="' + value2 + '"]').removeClass('nt_soldout');
                                   }
                               }
                             }
                    break;
                default:
//                     var value0 = $(NtId+Ntproduct.one_p+' .is-selected').data('value'),
//                         val = $(IdSelect+' option.nt_'+value0).val();
//                     $(IdSelect).val(val);
                
                    var value0 = $(NtId+Ntproduct.one_p+' .is-selected').data('value'),
                        val = $(IdSelect+' option.nt'+(Ntproduct.one_p+"").replace("0", "")+'_'+value0).val();
                    $(IdSelect).val(val);
                    $(NtId + '1 .nt-swatch,'+NtId + '2 .nt-swatch').removeClass('nt_unavailable nt_soldout');
                
                
//                     var soldoutOptions = Ntproduct.Ntsoldout;
//                     //console.log(soldoutOptions)
//                     $(NtId+'0 .nt-swatch').addClass('nt_soldout');
//                     for (var i=0; i<soldoutOptions.length; i++) {
//                       var option = soldoutOptions[i];
//                       //console.log('option '+option)
//                       $(NtId+'0 .nt-swatch[data-value="' + option + '"]').removeClass('nt_soldout');
//                     }
            }
            //Run selectCallback
            var variant = product.variants[$(IdSelect).prop('selectedIndex')];
            elessiShopifyPre.selectCallback(variant,selector,IdSelect,size,callBackVariant,NtId,prefix,product);
         });
        
         if ( !nathan_settings.use_clicking_variant_image) return;
           $(document).on('click', '.p-nav img', function(ev) {
              if ( $(callBackVariant+' .variations .nt-swatch.is-selected').length < size ) return;
              //ev.preventDefault();
              var $this = $(this),
                  value = $this.data('variant_id');
                  //console.log(typeof value)
              if ( (product.remove_soldout && !$this.data('variant_ava')) || typeof value !== 'number' ) return;

             var arr= $(IdSelect+' option[value="'+value+'"]').attr('class').replace("nt1_", "").replace("nt2_", "").replace("nt_", "").split(' ');
             switch(size) {
                case 2:
                   $(NtId + '0 .nt-swatch,'+NtId + '1 .nt-swatch').removeClass('is-selected');
                   $(NtId + '1 .nt-swatch[data-value="' + arr[1] + '"]').addClass('is-selected');
                   $(NtId + '0 .nt-swatch[data-value="' + arr[0] + '"]').trigger( "click" );
                  break;

                case 3:
                   $(NtId + '0 .nt-swatch,'+NtId + '1 .nt-swatch,'+NtId + '2 .nt-swatch').removeClass('is-selected');
                   $(NtId + '1 .nt-swatch[data-value="' + arr[1] + '"]').addClass('is-selected');
                   $(NtId + '2 .nt-swatch[data-value="' + arr[2] + '"]').addClass('is-selected');
                   $(NtId + '0 .nt-swatch[data-value="' + arr[0] + '"]').trigger( "click" );
                  break;

                default:
                   $(NtId + '0 .nt-swatch').removeClass('is-selected');
                   $(NtId + '0 .nt-swatch[data-value="' + arr[0] + '"]').trigger( "click" );
             }
           });

      },
     
      selectCallback: function(variant,selector,IdSelect,size,callBackVariant,NtId,prefix,product) {

            //console.log('selector: '+selector)
           var selectorCurent = $(selector),
               IdSelectCurent = $(IdSelect);
             var $variantQuantity = selectorCurent.find('.variantQuantity'),
             $unit_base = selectorCurent.find('.unit_base'),
             $unit_price = selectorCurent.find('.unit_price'),
             $productPrice = selectorCurent.find('.productPrice'),
             $quantityElements = selectorCurent.find('.shopify_quantity'),
             $outofstock = $('#nt_outstock'+prefix),
             $outofsticky = $('#nt_outstock_sticky'+prefix),
             $frm_notify_pr = $('#frm_notify_pr'+prefix),
             $productsku = $('#productSku'+prefix),
             $input = selectorCurent.find('.shopify_quantity input.qty'),
             $addToCart = selectorCurent.find('.shopify_add_to_cart'),
             $payment_btn = selectorCurent.find('.shopify-payment-button'),
             $addToCart_text = selectorCurent.find('.single_add_to_cart_button .bt__text');
           
             //console.log(selector)
             if (selector == '.nt_cart_form' || selector == '#cart-form-quick') {
                $productPrice = selectorCurent.closest('.entry-summary').find('.productPrice');
                 $unit_base = selectorCurent.closest('.entry-summary').find('.unit_base');
                 $unit_price = selectorCurent.closest('.entry-summary').find('.unit_price');
             }
           //console.log($productPrice)
           
            var class_val = $(IdSelect+' option[value="'+variant.id+'"]').attr('class');
            $(callBackVariant).attr('class',class_val);
            $('#callBackVariantsticky'+prefix).attr('class',class_val);
        
            $(NtId+'0 .nt_name_current').html($.trim($(NtId+'0 .is-selected:first').text()));
              
            if (size > 1) {
               $(NtId+'1 .nt_name_current').html($.trim($(NtId+'1 .is-selected:first').text()));
            }
            if (size > 2) {
               $(NtId+'2 .nt_name_current').html($.trim($(NtId+'2 .is-selected:first').text())); 
            }
            if(variant){
//                 var isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
//                 if(navigator && navigator.appVersion.match(/(iPhone\sOS\s)([\d]+)/gm)){ var os = navigator.appVersion.match(/(iPhone\sOS\s)([\d]+)/gm)[0].split(" ").pop() }
//                 if( isSafari && isIOS12 && variant.shopify3d !== 'none') {
//                   $(".spar-quicklook-overlay a").attr("href", variant.shopify3d[0].url);
//                   $('.spar-quicklook-overlay').show();
//                 }else{$('.spar-quicklook-overlay').hide();}
              if (variant.available) {
                     $addToCart.show();
                     $payment_btn.show();
                     $quantityElements.show();
                     //add.show();
                     //out.css("display", "none");
                     $outofstock.css("display", "none");
                     $outofsticky.css("display", "none");
                     $frm_notify_pr.css("display", "none");
                     $('#product-available'+prefix).removeClass('value_out').addClass('value_in').html(nathan_settings.in_stock);
                     if (nathan_settings.product_quantity_message) {
                        if (variant.inventory_management) {
                          if (variant.inventory_quantity < 10 && variant.inventory_quantity > 0) {
                            $variantQuantity.html(nathan_settings.only_left.replace('1', variant.inventory_quantity)).addClass('is-visible');
                          } else if (variant.inventory_quantity <= 0 && variant.incoming) {
                            $variantQuantity.html(nathan_settings.will_not_ship_until.replace('[date]', variant.next_incoming_date)).addClass('is-visible');
                          } else {
                            $variantQuantity.removeClass('is-visible');
                          }
                        }
                        else {
                          $variantQuantity.removeClass('is-visible');
                        }
                     }
                     // Update quantity.
                     if (variant.inventory_quantity <= 0 && variant.available && variant.inventory_management != null){
                        $addToCart_text.html(nathan_settings.pre_orders);
                        //add.html(nathan_settings.pre_orders);
                     }else{
                       $addToCart_text.html(nathan_settings.add_to_cart);
                       //add.html(nathan_settings.add_to_cart);
                     }
                     if (variant.inventory_quantity <= 0 && variant.available && variant.inventory_management != null){
                       $input.attr('max',999);
                     } else if(variant.inventory_management != null ){
                       //Check if inventory management by shopify
                       $input.attr('max',variant.inventory_quantity).val(1).attr('value',1);
                     }else{
                       $input.attr('max',999);
                     }
              } else {
                     $addToCart.hide();
                     $payment_btn.hide();
                     //add.hide();
                     $('#product-available').removeClass('value_in').addClass('value_out').html(nathan_settings.outofstock);
                     $variantQuantity.removeClass('is-visible');
                     if (nathan_settings.product_quantity_message) {
                        if (variant.incoming) {
                          $variantQuantity.html(nathan_settings.will_be_in_stock_after.replace('[date]', variant.next_incoming_date)).addClass('is-visible');
                        }
                        else {
                          $variantQuantity.removeClass('is-visible');
                        }
                     }
                     $quantityElements.hide();
                     $frm_notify_pr.css("display", "inline-block");
                     $outofstock.css("display", "inline-block");
                     $outofsticky.css("display", "inline-block");
                     //out.css("display", "inline-block");
                     if (nathan_settings.use_notify_me) {
                        var url_js = 'https://'+window.location.hostname+product.url+'?variant='+variant.id;
                        $frm_notify_pr.find('textarea').html(nathan_settings.please_notify_me.replace('{{title}}', product.title).replace('{{variant}}',variant.title).replace('{{url}}', url_js));
                     }
              }
              
              // Update price display
              if (product.price_varies || nathan_settings.price_varies){
                if (variant.compare_at_price > variant.price) {
                   var comparePrice = elessiShopifyPre.formatMoney(variant.compare_at_price, nathan_settings.moneyFormat),
                       customPrice = elessiShopifyPre.formatMoney(variant.price, nathan_settings.moneyFormat);;
                   var customPriceFormat = '<del class="old-product-price">' + comparePrice + '</del> ';
                       customPriceFormat += '<ins class="product-price">' + customPrice + '</ins> ',
                       customPriceFormat += '<span class="onsale fs__14 tu dib cw pr_onsale"><span></span></span>';
                   $productPrice.html(customPriceFormat);
                   var save = ((variant.compare_at_price - variant.price)*100)/variant.compare_at_price;
                   $('#product-'+product.id+' .pr_onsale>span').html(nathan_settings.save_js.replace('[sale]', Math.ceil(save)));
                   $('#product-'+product.id+' .pr_onsale').show();
                    $('#callBackVariantsticky'+prefix+' .pr_onsale>span').html(nathan_settings.save_js.replace('[sale]', Math.ceil(save)));
                   $('#callBackVariantsticky'+prefix+' .pr_onsale').show();
                 } else if (product.price_varies){
                    var customPrice = elessiShopifyPre.formatMoney(variant.price, nathan_settings.moneyFormat);
                    $productPrice.html(customPrice);
                    $('#product-'+product.id+' .pr_onsale').hide();
                    $('#callBackVariantsticky'+prefix+' .pr_onsale').hide();
                 }
             }
             
             // Update unit price display
             if (variant.unit_price_measurement) {
               //console.log(variant.unit_price)
               $unit_base.html((variant.unit_price_measurement.reference_value != 1) ? variant.unit_price_measurement.reference_value +variant.unit_price_measurement.reference_unit : variant.unit_price_measurement.reference_unit)
               $unit_price.html(elessiShopifyPre.formatMoney(variant.unit_price, nathan_settings.moneyFormat));
               $unit_price.parent().show();
             } else {
               $unit_price.parent().hide();
             }
            
             if (nathan_settings.show_multiple_currencies && elessiShopifyPre.StorageCurrency() !== null && typeof(Currency) !== "undefined") {
                if (typeof(Currency.convertAll) !== "undefined") {Currency.convertAll(nathan_settings.shop_currency, elessiShopifyPre.StorageCurrency(), '.entry-summary span.money');}
             }
              
             // Update sku
             if(variant.sku){
                $productsku.text(variant.sku);
             }else{
                 $productsku.text(nathan_settings.na);
              }
             
             // Update image
             if(product.images_size > 1 && variant.featured_image) {
               var image_id = variant.featured_image.id;
                // console.log(image_id);
               if (selector == '.nt_cart_form' && $('.p-thumb.slick-initialized').length > 0) {
                  var index = $('.p-thumb.slick-initialized .slick-slide:not(.slick-cloned) img[data-image-id='+image_id+']').closest('div.slick-slide').attr( "data-slick-index" );
                  $('.p-thumb.slick-initialized').slick('slickGoTo',index);
               } else if (selector == '.nt_cart_form' && $('.p-thumb.nt-masonry:not(.slick-initialized)').length > 0) {
                  
                 var $img = $("#img_"+image_id);
                  $('.p-thumb.nt-group-masonry').one( 'arrangeComplete', function() {
                     if ( elessiShopifyPre.isVisible($img,true) || $('body').is('.add_sticky_nt.opend_sticky') ) return;
                    
                     $('html, body').animate({
                        scrollTop: $img.offset().top - $('.site_header.live_stuck').outerHeight() - 30
                     }, 300);
                  });
                 
                 if ( elessiShopifyPre.isVisible($img) || $('body').is('.add_sticky_nt.opend_sticky') ) return;
                 $('html, body').animate({
                    scrollTop: $img.offset().top - $('.site_header.live_stuck').outerHeight() - 30
                 }, 350);
               } else if (selector == '#cart-form-quick') {
                   var index = $(".product-images-slider_on").find('img[data-image-id="'+image_id+'"]').closest('div.slick-slide').index();
                  if(index >=0){
                    $('.product-images-slider_on').slick('slickGoTo', [index, 2, false]);
                  }
               }
             }
              
             // Update history state for product deep linking
             if (!history.replaceState || !nathan_settings.enableHistoryState || selector !== '.nt_cart_form') return;
              
             var newurl = window.location.protocol + '//' + window.location.host +window.location.pathname + '?variant=' +variant.id;
             window.history.replaceState({ path: newurl }, '', newurl);
             // window.history.replaceState({}, document.title, "?variant=" + variant.id);
            }
      },
      
      //https://github.com/customd/jquery-visible/
      isVisible: function(el,partial,hidden,direction,container) {

           if (el.length < 1) return;

           // Set direction default to 'both'.
           direction = direction || 'both';

           var $w = $(window),$t = el.length > 1 ? el.eq(0) : el,
              isContained = typeof container !== 'undefined' && container !== null,
              $c = isContained ? $(container) : $w,
              wPosition = isContained ? $c.position() : 0,
              t = $t.get(0),
              vpWidth = $c.outerWidth(),
              vpHeight = $c.outerHeight(),
              clientSize = hidden === true ? t.offsetWidth * t.offsetHeight : true;

           if (typeof t.getBoundingClientRect === 'function') {

              // Use el native browser method, if available.
              var rec = t.getBoundingClientRect(),
                 tViz = isContained ?
                 rec.top - wPosition.top >= 0 && rec.top < vpHeight + wPosition.top :
                 rec.top >= 0 && rec.top < vpHeight,
                 bViz = isContained ?
                 rec.bottom - wPosition.top > 0 && rec.bottom <= vpHeight + wPosition.top :
                 rec.bottom > 0 && rec.bottom <= vpHeight,
                 lViz = isContained ?
                 rec.left - wPosition.left >= 0 && rec.left < vpWidth + wPosition.left :
                 rec.left >= 0 && rec.left < vpWidth,
                 rViz = isContained ?
                 rec.right - wPosition.left > 0 && rec.right < vpWidth + wPosition.left :
                 rec.right > 0 && rec.right <= vpWidth,
                 vVisible = partial ? tViz || bViz : tViz && bViz,
                 hVisible = partial ? lViz || rViz : lViz && rViz,
                 vVisible = (rec.top < 0 && rec.bottom > vpHeight) ? true : vVisible,
                 hVisible = (rec.left < 0 && rec.right > vpWidth) ? true : hVisible;

              if (direction === 'both')
                 return clientSize && vVisible && hVisible;
              else if (direction === 'vertical')
                 return clientSize && vVisible;
              else if (direction === 'horizontal')
                 return clientSize && hVisible;
           } else {

              var viewTop = isContained ? 0 : wPosition,
                 viewBottom = viewTop + vpHeight,
                 viewLeft = $c.scrollLeft(),
                 viewRight = viewLeft + vpWidth,
                 position = $t.position(),
                 _top = position.top,
                 _bottom = _top + $t.height(),
                 _left = position.left,
                 _right = _left + $t.width(),
                 compareTop = partial === true ? _bottom : _top,
                 compareBottom = partial === true ? _top : _bottom,
                 compareLeft = partial === true ? _right : _left,
                 compareRight = partial === true ? _left : _right;

              if (direction === 'both')
                 return !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop)) && ((compareRight <= viewRight) && (compareLeft >= viewLeft));
              else if (direction === 'vertical')
                 return !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop));
              else if (direction === 'horizontal')
                 return !!clientSize && ((compareRight <= viewRight) && (compareLeft >= viewLeft));
           }
      },
     
      formatMoney: function(cents, format) {
           if (typeof cents == 'string') { cents = cents.replace('.',''); }
           var value = '';
           var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
           var formatString = (format || Nt_money_format);

           var defaultOption = function(opt, def) {
              return (typeof opt == 'undefined' ? def : opt);
           }

           var formatWithDelimiters = function(number, precision, thousands, decimal) {
             precision = defaultOption(precision, 2);
             thousands = defaultOption(thousands, ',');
             decimal   = defaultOption(decimal, '.');

             if (isNaN(number) || number == null) { return 0; };

             number = (number/100.0).toFixed(precision);

             var parts   = number.split('.');
             var dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands);
             var cents   = parts[1] ? (decimal + parts[1]) : '';

             return dollars + cents;
           }

           switch(formatString.match(placeholderRegex)[1]) {
             case 'amount':
               value = formatWithDelimiters(cents, 2);
               break;
             case 'amount_no_decimals':
               value = formatWithDelimiters(cents, 0);
               break;
             case 'amount_with_comma_separator':
               value = formatWithDelimiters(cents, 2, '.', ',');
               break;
             case 'amount_no_decimals_with_comma_separator':
               value = formatWithDelimiters(cents, 0, '.', ',');
               break;
           }

           return formatString.replace(placeholderRegex, value);
      }
   }
   }());
})( jQuery );

jQuery(document).ready(function($) {
   elessiShopifyPre.init();
  
   if ($('body').hasClass('template-product') && nathan_settings.has_variant) {
         var Ntproduct = JSON.parse(document.getElementById('ProductJson-NT').innerHTML),
             product = JSON.parse(document.getElementById('ProductJson-template').innerHTML),
             IdSelect = '.product-select_pr',
             NtId = '.nt_select_pr_',
             selector = '.nt_cart_form',
             callBackVariant = '#callBackVariant',
             prefix='';
             $('.nt_select_pr_1 .is-selected-none').addClass('is-selected').removeClass('is-selected-none');
             $('.nt_select_pr_2 .is-selected-none').addClass('is-selected').removeClass('is-selected-none');
         elessiShopifyPre.Ntproduct_switch('.variations_form',Ntproduct,product,selector,IdSelect,NtId,callBackVariant,prefix);
         $('.nt_select_pr_0 .is-selected-none').click();
   }
});
if (NT4.designMode) {
   //console.log('section load');
   jQuery(document)
     .on('shopify:section:load', elessiShopifyPre.shopMasonry)
     .on('shopify:section:unload', elessiShopifyPre.shopMasonry)
     .on('shopify:section:select', elessiShopifyPre.shopMasonry)
     .on('shopify:section:deselect', elessiShopifyPre.shopMasonry)
     .on('shopify:block:select',elessiShopifyPre.shopMasonry)
     .on('shopify:block:deselect', elessiShopifyPre.shopMasonry);
   jQuery(document)
     .on('shopify:section:load', elessiShopifyPre.initMasonry)
     .on('shopify:section:unload', elessiShopifyPre.initMasonry)
     .on('shopify:section:select', elessiShopifyPre.initMasonry)
     .on('shopify:section:deselect', elessiShopifyPre.initMasonry)
     .on('shopify:block:select',elessiShopifyPre.initMasonry)
     .on('shopify:block:deselect', elessiShopifyPre.initMasonry);
   jQuery(document)
     .on('shopify:section:load', elessiShopifyPre.initCarousel)
     .on('shopify:section:unload', elessiShopifyPre.initCarousel)
     .on('shopify:block:select',elessiShopifyPre.initCarousel)
     .on('shopify:block:deselect', elessiShopifyPre.initCarousel);
}
