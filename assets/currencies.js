// Pick your format here:
// money_format or money_with_currency_format
Currency.format = nathan_settings.Currency_format;
var shopCurrency = nathan_settings.shop_currency;

/* Sometimes merchants change their shop currency, let is tell our JavaScript file */
Currency.moneyFormats[shopCurrency].money_with_currency_format = nathan_settings.shop_money_with_currency_format;
Currency.moneyFormats[shopCurrency].money_format = nathan_settings.shop_money_format;

/* Default currency */
var defaultCurrency = nathan_settings.default_currency;

/* Cookie currency */
if(sp_nt_storage) {
var cookieCurrency = localStorage.getItem('T4Currency'),
    nt_currency = localStorage.getItem('nt_currency');
} else {
var cookieCurrency = null,nt_currency = null;
}
// Fix for customer account pages.
jQuery('span.money span.money').each(function() {
  jQuery(this).parents('span.money').removeClass('money');
});

// Saving the current price.
// jQuery('span.money').each(function() {
//   jQuery(this).attr('data-currency-'+defaultCurrency, jQuery(this).html());
// });

// Select all your currencies buttons.
var buttons = jQuery('.currency-item');

// If there is no cookie or it is the shop currency.
var check_codes = 'USD,EUR,GBP,CAD,ALL,DZD,AOA,ARS,AMD,AWG,AUD,BBD,AZN,BDT,BSD,BHD,BYR,BZD,BTN,BAM,BRL,BOB,BWP,BND,BGN,MMK,KHR,KYD,XAF,CLP,CNY,COP,CRC,HRK,CZK,DKK,DOP,XCD,EGP,ETB,XPF,FJD,GMD,GHS,GTQ,GYD,GEL,HNL,HKD,HUF,ISK,INR,IDR,ILS,JMD,JPY,JEP,JOD,KZT,KES,KWD,KGS,LVL,LBP,LTL,MGA,MKD,MOP,MVR,MXN,MYR,MUR,MDL,MAD,MNT,MZN,NAD,NPR,ANG,NZD,NIO,NGN,NOK,OMR,PKR,PGK,PYG,PEN,PHP,PLN,QAR,RON,RUB,RWF,WST,SAR,STD,RSD,SCR,SGD,SYP,ZAR,KRW,LKR,SEK,CHF,TWD,THB,TZS,TTD,TND,TRY,UGX,UAH,AED,UYU,VUV,VEF,VND,XBT,XOF,ZMW';
var arrayCurrency ={AF:"AFN",AX:"EUR",AL:"ALL",DZ:"DZD",AS:"USD",AD:"EUR",AO:"AOA",AI:"XCD",AQ:"",AG:"XCD",AR:"ARS",AM:"AMD",AW:"AWG",AU:"AUD",AT:"EUR",AZ:"AZN",BS:"BSD",BH:"BHD",BD:"BDT",BB:"BBD",BY:"BYN",BE:"EUR",BZ:"BZD",BJ:"XOF",BM:"BMD",BT:"BTN",BO:"BOB",BA:"BAM",BW:"BWP",BV:"NOK",BR:"BRL",IO:"USD",BN:"BND",BG:"BGN",BF:"XOF",BI:"BIF",KH:"KHR",CM:"XAF",CA:"CAD",CV:"CVE",KY:"KYD",CF:"XAF",TD:"XAF",CL:"CLP",CN:"CNY",CX:"AUD",CC:"AUD",CO:"COP",KM:"KMF",CG:"XAF",CD:"CDF",CK:"NZD",CR:"CRC",CI:"XOF",HR:"HRK",CU:"CUP",CY:"EUR",CZ:"CZK",DK:"DKK",DJ:"DJF",DM:"XCD",DO:"DOP",EC:"USD",EG:"EGP",SV:"USD",GQ:"XAF",ER:"ERN",EE:"EUR",ET:"ETB",FK:"FKP",FO:"DKK",FJ:"FJD",FI:"EUR",FR:"EUR",GF:"EUR",PF:"XPF",TF:"EUR",GA:"XAF",GM:"GMD",GE:"GEL",DE:"EUR",GH:"GHS",GI:"GIP",GR:"EUR",GL:"DKK",GD:"XCD",GP:"EUR",GU:"USD",GT:"GTQ",GG:"GBP",GN:"GNF",GW:"XOF",GY:"GYD",HT:"HTG",HM:"AUD",VA:"EUR",HN:"HNL",HK:"HKD",HU:"HUF",IS:"ISK",IN:"INR",ID:"IDR",IR:"IRR",IQ:"IQD",IE:"EUR",IM:"GBP",IL:"ILS",IT:"EUR",JM:"JMD",JP:"JPY",JE:"GBP",JO:"JOD",KZ:"KZT",KE:"KES",KI:"AUD",KR:"KRW",KW:"KWD",KG:"KGS",LA:"LAK",LV:"EUR",LB:"LBP",LS:"LSL",LR:"LRD",LY:"LYD",LI:"CHF",LT:"EUR",LU:"EUR",MO:"MOP",MK:"MKD",MG:"MGA",MW:"MWK",MY:"MYR",MV:"MVR",ML:"XOF",MT:"EUR",MH:"USD",MQ:"EUR",MR:"MRU",MU:"MUR",YT:"EUR",MX:"MXN",FM:"USD",MD:"MDL",MC:"EUR",MN:"MNT",ME:"EUR",MS:"XCD",MA:"MAD",MZ:"MZN",MM:"MMK",NA:"NAD",NR:"AUD",NP:"NPR",NL:"EUR",AN:"",NC:"XPF",NZ:"NZD",NI:"NIO",NE:"XOF",NG:"NGN",NU:"NZD",NF:"AUD",MP:"USD",NO:"NOK",OM:"OMR",PK:"PKR",PW:"USD",PS:"ILS",PA:"PAB",PG:"PGK",PY:"PYG",PE:"PEN",PH:"PHP",PN:"NZD",PL:"PLN",PT:"EUR",PR:"USD",QA:"QAR",RE:"EUR",RO:"RON",RU:"RUB",RW:"RWF",BL:"EUR",SH:"SHP",KN:"XCD",LC:"XCD",MF:"EUR",PM:"EUR",VC:"XCD",WS:"WST",SM:"EUR",ST:"STN",SA:"SAR",SN:"XOF",RS:"RSD",SC:"SCR",SL:"SLL",SG:"SGD",SK:"EUR",SI:"EUR",SB:"SBD",SO:"SOS",ZA:"ZAR",GS:"GBP",ES:"EUR",LK:"LKR",SD:"SDG",SR:"SRD",SJ:"NOK",SZ:"SZL",SE:"SEK",CH:"CHF",SY:"SYP",TW:"TWD",TJ:"TJS",TZ:"TZS",TH:"THB",TL:"USD",TG:"XOF",TK:"NZD",TO:"TOP",TT:"TTD",TN:"TND",TR:"TRY",TM:"TMT",TC:"USD",TV:"AUD",UG:"UGX",UA:"UAH",AE:"AED",GB:"GBP",US:"USD",UM:"USD",UY:"UYU",UZ:"UZS",VU:"VUV",VE:"VEF",VN:"VND",VG:"USD",VI:"USD",WF:"XPF",EH:"MAD",YE:"YER",ZM:"ZMW",ZW:"ZWD"};    
var ipdata;
if (nathan_settings.show_multiple_visitor && sp_nt_storage){
  if (nt_currency == null) {
  $.ajax({
     type: 'get',
     url: 'https://extreme-ip-lookup.com/json',
     dataType: "json",
     success: function (data) {
        localStorage.setItem('nt_currency', JSON.stringify(data));
        ipdata = arrayCurrency[data.countryCode];
        if (check_codes.indexOf(ipdata) >= 0 && jQuery('.currencies a[data-currency='+ ipdata +']').length == 0) {
         
          if (cookieCurrency != null && cookieCurrency != ipdata ){
             $('.currencies ul').prepend('<li><a href="javascript:void(0);" data-currency="'+ipdata+'" class="currency-item cw chp"><i class="jas_flag flag_'+ipdata+'"></i> '+ipdata+'</a></li>');
             $('ul.currencies').append('<li class="menu-item"><a href="javascript:void(0);" data-currency="'+ipdata+'" class="currency-item"><i class="jas_flag flag_'+ipdata+'"></i> '+ipdata+'</a></li>');
          } else {
            jQuery('.currency-item').removeClass('selected');
            $('.currencies ul').prepend('<li><a href="javascript:void(0);" data-currency="'+ipdata+'" class="currency-item cw chp selected"><i class="jas_flag flag_'+ipdata+'"></i> '+ipdata+'</a></li>');
            $('ul.currencies').append('<li class="menu-item"><a href="javascript:void(0);" data-currency="'+ipdata+'" class="currency-item selected"><i class="jas_flag flag_'+ipdata+'"></i> '+ipdata+'</a></li>');
           jQuery('.selected-currency').text(ipdata);
           jQuery('.selected_flag').html('<i class="jas_flag flag_'+ipdata+'"></i>');
           Currency.convertAll(shopCurrency, ipdata);
          }
          localStorage.setItem('T4Currency', ipdata);
        } else if (check_codes.indexOf(ipdata) >= 0 && cookieCurrency == null) {
          buttons.removeClass('selected');
          jQuery('.selected-currency').text(ipdata);
          jQuery('.currencies a[data-currency=' + ipdata + ']').addClass('selected')
          jQuery('.selected_flag').html('<i class="jas_flag flag_'+ipdata+'"></i>');
          Currency.convertAll(shopCurrency, ipdata);
        }
     },
     error: function (XMLHttpRequest, textStatus) {
       $.ajax({
          type: 'get',
          url: 'https://api.teathemes.net/currency',
          dataType: "json",
          success: function(data) {
            ipdata = data.currency;
            localStorage.setItem('nt_currency', JSON.stringify(data));
            if (check_codes.indexOf(ipdata) >= 0 && jQuery('.currencies a[data-currency='+ ipdata +']').length == 0) {
              if (cookieCurrency != null && cookieCurrency != ipdata ){
                 $('.currencies ul').prepend('<li><a href="javascript:void(0);" data-currency="'+ipdata+'" class="currency-item cw chp"><i class="jas_flag flag_'+ipdata+'"></i> '+ipdata+'</a></li>');
                 $('ul.currencies').append('<li class="menu-item"><a href="javascript:void(0);" data-currency="'+ipdata+'" class="currency-item"><i class="jas_flag flag_'+ipdata+'"></i> '+ipdata+'</a></li>');
              } else {
                jQuery('.currency-item').removeClass('selected');
                $('.currencies ul').prepend('<li><a href="javascript:void(0);" data-currency="'+ipdata+'" class="currency-item cw chp selected"><i class="jas_flag flag_'+ipdata+'"></i> '+ipdata+'</a></li>');
                $('ul.currencies').append('<li class="menu-item"><a href="javascript:void(0);" data-currency="'+ipdata+'" class="currency-item selected"><i class="jas_flag flag_'+ipdata+'"></i> '+ipdata+'</a></li>');
               jQuery('.selected-currency').text(ipdata);
               jQuery('.selected_flag').html('<i class="jas_flag flag_'+ipdata+'"></i>');
               Currency.convertAll(shopCurrency, ipdata);
              }
              localStorage.setItem('T4Currency', ipdata);
            } else if (check_codes.indexOf(ipdata) >= 0 && cookieCurrency == null) {
              buttons.removeClass('selected');
              jQuery('.selected-currency').text(ipdata);
              jQuery('.currencies a[data-currency=' + ipdata + ']').addClass('selected')
              jQuery('.selected_flag').html('<i class="jas_flag flag_'+ipdata+'"></i>');
              Currency.convertAll(shopCurrency, ipdata);
            }
          }
       });
     }
  });
//    $.ajax({
//       type: 'get',
//       url: 'https://api.teathemes.net/currency',
//       dataType: "json",
//       success: function(data) {
//         ipdata = data.currency;
//         localStorage.setItem('nt_currency', JSON.stringify(data));
//         if (check_codes.indexOf(ipdata) >= 0 && jQuery('.currencies a[data-currency='+ ipdata +']').length == 0) {
//           if (cookieCurrency != null && cookieCurrency != ipdata ){
//              $('.currencies ul').prepend('<li><a href="javascript:void(0);" data-currency="'+ipdata+'" class="currency-item cw chp"><i class="jas_flag flag_'+ipdata+'"></i> '+ipdata+'</a></li>');
//              $('ul.currencies').append('<li class="menu-item"><a href="javascript:void(0);" data-currency="'+ipdata+'" class="currency-item"><i class="jas_flag flag_'+ipdata+'"></i> '+ipdata+'</a></li>');
//           } else {
//             jQuery('.currency-item').removeClass('selected');
//             $('.currencies ul').prepend('<li><a href="javascript:void(0);" data-currency="'+ipdata+'" class="currency-item cw chp selected"><i class="jas_flag flag_'+ipdata+'"></i> '+ipdata+'</a></li>');
//             $('ul.currencies').append('<li class="menu-item"><a href="javascript:void(0);" data-currency="'+ipdata+'" class="currency-item selected"><i class="jas_flag flag_'+ipdata+'"></i> '+ipdata+'</a></li>');
//            jQuery('.selected-currency').text(ipdata);
//            jQuery('.selected_flag').html('<i class="jas_flag flag_'+ipdata+'"></i>');
//            Currency.convertAll(shopCurrency, ipdata);
//           }
//           localStorage.setItem('T4Currency', ipdata);
//         } else if (check_codes.indexOf(ipdata) >= 0 && cookieCurrency == null) {
//           buttons.removeClass('selected');
//           jQuery('.selected-currency').text(ipdata);
//           jQuery('.currencies a[data-currency=' + ipdata + ']').addClass('selected')
//           jQuery('.selected_flag').html('<i class="jas_flag flag_'+ipdata+'"></i>');
//           Currency.convertAll(shopCurrency, ipdata);
//         }
//       }
//    });
  } else {
     ipdata = cookieCurrency || JSON.parse(nt_currency).currency || arrayCurrency[JSON.parse(nt_currency).countryCode];
     if (check_codes.indexOf(ipdata) >= 0 && jQuery('.currencies a[data-currency='+ ipdata +']').length == 0) {
       if (cookieCurrency != null && cookieCurrency != ipdata ){
          $('.currencies ul').prepend('<li><a href="javascript:void(0);" data-currency="'+ipdata+'" class="currency-item cw chp"><i class="jas_flag flag_'+ipdata+'"></i> '+ipdata+'</a></li>');
          $('ul.currencies').append('<li class="menu-item"><a href="javascript:void(0);" data-currency="'+ipdata+'" class="currency-item"><i class="jas_flag flag_'+ipdata+'"></i> '+ipdata+'</a></li>');
       } else {
         jQuery('.currency-item').removeClass('selected');
         $('.currencies ul').prepend('<li><a href="javascript:void(0);" data-currency="'+ipdata+'" class="currency-item cw chp selected"><i class="jas_flag flag_'+ipdata+'"></i> '+ipdata+'</a></li>');
         $('ul.currencies').append('<li class="menu-item"><a href="javascript:void(0);" data-currency="'+ipdata+'" class="currency-item selected"><i class="jas_flag flag_'+ipdata+'"></i> '+ipdata+'</a></li>');
        jQuery('.selected-currency').text(ipdata);
        jQuery('.selected_flag').html('<i class="jas_flag flag_'+ipdata+'"></i>');
        // Currency.convertAll(shopCurrency, ipdata);
       }
     } else if (check_codes.indexOf(ipdata) >= 0 && cookieCurrency == null) {
        buttons.removeClass('selected');
        jQuery('.selected-currency').text(ipdata);
        jQuery('.currencies a[data-currency=' + ipdata + ']').addClass('selected')
        jQuery('.selected_flag').html('<i class="jas_flag flag_'+ipdata+'"></i>');
        Currency.convertAll(shopCurrency, ipdata);
     }
  }
}
if (cookieCurrency == null ) {
   if (shopCurrency !== defaultCurrency) {
    buttons.removeClass('selected');
    var $this = jQuery('.currencies a[data-currency=' + defaultCurrency + ']');
    Currency.convertAll(shopCurrency, defaultCurrency);
    var Currency_text = $this.first().text();
    $this.addClass('selected');
    jQuery('.selected-currency').text(Currency_text);
    jQuery('.selected_flag').html('<i class="jas_flag flag_'+jQuery.trim(Currency_text)+'"></i>');
    //console.log('2')
  }
  else {
    //console.log('3')
    Currency.convertAll(shopCurrency, defaultCurrency);
  }
}
else {
   //console.log('4')
  Currency.convertAll(shopCurrency, cookieCurrency);
  jQuery('.currency-item').removeClass('selected');
  var $this = jQuery('.currencies a[data-currency=' + cookieCurrency + ']'),
      Currency_text = jQuery('.currencies .selected').first().text();
  $this.addClass('selected');
  jQuery('.selected-currency').text(cookieCurrency);
  jQuery('.selected_flag').html('<i class="jas_flag flag_'+cookieCurrency+'"></i>');
   //if(Currency_text !== ''){ jQuery('.selected-currency').text(Currency_text) }
}
// When customer clicks on a currency button.
$(document).on("click",".currencies li:not(.black_menu) a",function(ev) {
   ev.preventDefault();
  jQuery('.currency-item').removeClass('selected');
  var Currency_text = jQuery(this).text(),
      dtcurremcy = jQuery.trim(jQuery(this).data('currency')),
      $this = jQuery('.currencies a[data-currency=' + dtcurremcy + ']');
  //jQuery(this).addClass('selected');
  $this.addClass('selected');
  var newCurrency = jQuery(this).attr('data-currency');
  Currency.convertAll(Currency.currentCurrency, newCurrency);
  jQuery('.selected-currency').text(Currency_text);
  jQuery('.selected_flag').html('<i class="jas_flag flag_'+dtcurremcy+'"></i>');
});