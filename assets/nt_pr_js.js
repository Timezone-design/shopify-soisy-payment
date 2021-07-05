jQuery(document).ready(function ($) {
   'use strict';
      if (NTsettingspr.recently_viewed) {
       var ls = gl_Currency.cookie.ntread('nt_recent'),
           $cookieCurrency = gl_Currency.cookie.read(),
           elment = NTsettingspr.PrHandle;
        if(ls != null){ 
          var arrls = ls.split(',');
              if(arrls.length >= 21){arrls.pop();ls = arrls.toString()}
             if(ls.length > 1){
               $("#recently-viewed-products").show();
             } else if (ls != elment) {
               $("#recently-viewed-products").show();
             }
             jQuery.ajax({
               url: '/pages/recently-viewed-products/'+ls+'?q='+NTsettingspr.ProductID+NTsettingspr.cat_handle,
               dataType: 'html',
               type: 'GET',
               success: function(responsive) {
                 //console.log(responsive);
                  $('#recently_wrap').html(responsive).addClass('nt-carousel');
               },
               error: function(data) {
                 console.log('ajax error');
               },
               complete: function() {
                $( '#recently_wrap.nt-carousel' ).not( '.slick-initialized' ).slick();
                setTimeout(function(){ $('#recently-viewed-products').addClass('disable_loader'); }, 300);
                 elessiShopify.initCountdown();
                  //currency
                  if (nathan_settings.show_multiple_currencies && $cookieCurrency !== null) {
                     Currency.convertAll(nathan_settings.shop_currency, $cookieCurrency, '#recently_wrap span.money');
                   }
                  //product review
                  if (nathan_settings.productreviews && $(".spr-badge").length > 0 ) {
                    return window.SPR.registerCallbacks(), window.SPR.initRatingHandler(), window.SPR.initDomEls(), window.SPR.loadProducts(), window.SPR.loadBadges();
                   }
                   if( typeof $.waypoints != 'function' || !$('body').hasClass('use_animation') ) return;
                      $('#recently_wrap').find(".spb_animate:not(.start_animation)").waypoint(function(){
                           $(this).addClass("start_animation animated");
                      }, { offset: '85%' });
               }
             }); 
        }else{
          var arrls = new Array();
        }
       if(arrls.indexOf(elment)< 0 ){
          if(arrls.length > 20){arrls.pop();}
          arrls.unshift(elment);
          gl_Currency.cookie.ntwrite('nt_recent',arrls.toString());
        }
    }
    // tag instagram
      if(NTsettingspr.hashtag !== 'none') {
         var tag = NTsettingspr.hashtag,
           limit = '12',
           target = '_self',
           user_name = tag,
           ul_ins = $(".instagram-pics");
         jQuery.ajax({
           url: 'https://api.teathemes.net/instagram?username='+user_name+'&hash=true',
           dataType: 'json',
           type: 'GET',
           success: function(responsive) {
             //console.log(responsive);
             var html = '',
                 data = responsive.entry_data.ProfilePage[0].user.media.nodes;
             jQuery.each(data,function(index,element){
                if(index >= limit ) return 0;
                var img_url_150 = element.thumbnail_resources[0].src,
                img_url_240 = element.thumbnail_resources[1].src,
                img_url_320 = element.thumbnail_resources[2].src,
                img_url_480 = element.thumbnail_resources[3].src,
                img_url_640 = element.thumbnail_resources[4].src;
                html += '<div class="item col-lg-2 col-md-4 col-6"><a class="db pr oh" href="//instagram.com/p/'+element.code+'" target="'+target+'"><img src="'+img_url_150+'" data-src="'+img_url_150+'" data-sizes="auto" data-srcset="'+img_url_150+' 150w,'+img_url_240+' 240w,'+img_url_320+' 320w,'+img_url_480+' 480w,'+img_url_640+' 640w" class="w__100 lazyload" alt="'+user_name+'"><div class="nt-wrap-lazy"></div><div class="hover-mask flex c_center alin_center"><span class="pr cw mgr10"><i class="icon-heart icons mr__5"></i>'+element.likes.count+'</span><span class="pr cw"><i class="icon-bubbles icons mr__5"></i>'+element.comments.count+'</span></div></a></div>';
              });
             ul_ins.html(html);
             setTimeout(function(){ $('.instagram.product-extra').addClass('disable_loader'); }, 300);
           },
           error: function(data) {
             console.log('ajax error');
           }
         }); 
        } else if (NTsettingspr.username !== 'none') {
         var tag = NTsettingspr.username,
           limit = '12',
           target = '_self',
           user_name = tag,
           ul_ins = $(".instagram-pics");
         jQuery.ajax({
           url: 'https://api.teathemes.net/instagram?username='+user_name,
           dataType: 'json',
           type: 'GET',
           success: function(responsive) {
             //console.log(responsive);
             var html = '',
                 data = responsive.entry_data.ProfilePage[0].user.media.nodes;
             jQuery.each(data,function(index,element){
                if(index >= limit ) return 0;
                var img_url_150 = element.thumbnail_resources[0].src,
                img_url_240 = element.thumbnail_resources[1].src,
                img_url_320 = element.thumbnail_resources[2].src,
                img_url_480 = element.thumbnail_resources[3].src,
                img_url_640 = element.thumbnail_resources[4].src;
                html += '<div class="item col-lg-2 col-md-4 col-6"><a class="db pr oh" href="//instagram.com/p/'+element.code+'" target="'+target+'"><img src="'+img_url_150+'" data-src="'+img_url_150+'" data-sizes="auto" data-srcset="'+img_url_150+' 150w,'+img_url_240+' 240w,'+img_url_320+' 320w,'+img_url_480+' 480w,'+img_url_640+' 640w" class="w__100 lazyload" alt="'+user_name+'"><div class="nt-wrap-lazy"></div><div class="hover-mask flex c_center alin_center"><span class="pr cw mgr10"><i class="icon-heart icons mr__5"></i>'+element.likes.count+'</span><span class="pr cw"><i class="icon-bubbles icons mr__5"></i>'+element.comments.count+'</span></div></a></div>';
              });
             ul_ins.html(html);
             setTimeout(function(){ $('.instagram.product-extra').addClass('disable_loader'); }, 300);
           },
           error: function(data) {
             console.log('ajax error');
           }
         }); 
        } else if (NTsettingspr.access_token !== 'none') {
         var user_name = NTsettingspr.access_token,
           limit = '12',
           target = '_self',
           ul_ins = $(".instagram-pics");
         jQuery.ajax({
           url: "https://api.instagram.com/v1/users/self/media/recent/?access_token="+user_name+"&count="+limit,
             type: 'GET',
             dataType: "jsonp",
             success: function(response) {
               //console.log(response);
               var data = response.data,
                   html = '',
                   img_url = null;
               $.each(data,function(index,element){
                 //if(index >= limit ) return 0;
                              var img_url_150 = element.images.thumbnail.url,
                                 img_url_320 = element.images.low_resolution.url,
                                 img_url_640 = element.images.standard_resolution.url;
                html += '<div class="ntacc item col-lg-2 col-md-4 col-6"><a class="db pr oh" href="'+element.link+'" target="'+target+'"><img src="'+img_url_150+'" data-src="'+img_url_150+'" data-sizes="auto" data-srcset="'+img_url_150+' 150w,'+img_url_320+' 320w,'+img_url_640+' 640w" class="w__100 lazyload" alt="'+user_name+'"><div class="nt-wrap-lazy"></div><div class="hover-mask flex c_center alin_center"><span class="pr cw mgr10"><i class="icon-heart icons mr__5"></i>'+element.likes.count+'</span><span class="pr cw"><i class="icon-bubbles icons mr__5"></i>'+element.comments.count+'</span></div></a></div>';
              });
             ul_ins.html(html);
             setTimeout(function(){ $('.instagram.product-extra').addClass('disable_loader'); }, 300);
           },
           error: function(data) {
             console.log('ajax error');
           }
        }); 
     }

     // 360 video 
     if (NTsettingspr.ThreeSixty) {
       $('.threed-id-'+NTsettingspr.ProductID).ThreeSixty({
            totalFrames: NTsettingspr.totalFrames,
            endFrame: NTsettingspr.endFrame,
            currentFrame: 1, 
            imgList: '.threed-view-images', 
            progress: '.spinner',
            imgArray: NTsettingspr.imgArray,
            height: NTsettingspr.height,
            width: NTsettingspr.width,
            responsive: true,
            navigation: true
        });
    }
});