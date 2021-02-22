var ua = null;
var checker = null;
var preambleCtr = 0;

$(document).ready( function () {
$('#footer').hide();


 /*   $("a").bind("click", function() { //must do this way for "home screen" ios links to not open in full Safari
        if (this.href) {
            location.href = this.href;
            return false;
        }
    });*/


    /*$('#left-panel').html('<div id="left-panel-graphic"></div><img src="images/cvhcv_aasld2012/left-panel-graphic.png"></div>')*/


    var strQs = $.QueryString("passback");
    if (strQs == 'main') { //if querystring had passback=main then go right to menu by setting preambleCtr to a number > 5 (the number of preamble pages is 4)
        preambleCtr = 5;


    }

            advancePreamble();

    $('#container')
        .fadeTo('slow',1)


    $('#mp_subhead').fadeIn(2000);

//we can't do feature checks for what we need to know
ua = navigator.userAgent; //load array with mobile environment

if (ua.match(/(iPad)/)) { //this isn't exact! http://stackoverflow.com/questions/6230243/detect-between-the-ipad-and-ipad2-via-jquery-javascript
    var ipadVersion = (ua.match(/9A405/) && ua.match(/iPad/)) ? 'ipad1' : 'ipad2'
    } else {
    ipadVersion = 'not an ipad!';
    }

checker = {
    iPad: ua.match(/(iPad)/), //only iPad for now
    blackberry: ua.match(/BlackBerry/), //don't know if we'll ever use this
    android: ua.match(/Android/),
    iPhone: ua.match(/(iPhone)/),
    ipadVersion: ipadVersion

    };

if (checker.iPhone) $('#mp_messageBox').dialog({modal: true, position: 'center'});


$(window).bind('orientationchange', function () { updateOrientation(); });


function updateOrientation() {
    var lastDate = $.cookie('medisync-orient'); //let's not bug them, remind once
    if (lastDate != null) {

    return;
    }

if (window.orientation == 0 || window.orientation == 180) {
    showMessage('For best results, your mobile device should be held in the landscape position.')
    $.cookie('medisync-orient', new Date,{useLocalStorage: false, expires: 1, path: "/" })
}
}
function showMessage(message) {
    $('#mp_messageBox').html('<p class="messageText">' + message + '</p>'
    )

    $('#mp_messageBox').dialog({
    modal: true,
    position: 'center',
    buttons: {
    Ok: function() {
    $( this ).dialog( "close" );
    }
}
});
}

})
function setCookie(c_name,value,exdays)
{
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie=c_name + "=" + c_value;
}
function getCookie(c_name)
{
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++)
    {
        x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
        y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
        x=x.replace(/^\s+|\s+$/g,"");
        if (x==c_name)
        {
            return unescape(y);
        }
    }
}

function initFooter() {
    $('#footer').show();
    $('.footerLink').unbind('click');

    $('.footerLink').hover(
        function() {$(this).addClass('hover')},
        function() {$(this).removeClass('hover')});

    $('#previousScreen').click(function() {

        preambleCtr--;
        advancePreamble();


    })
    $('#nextScreen').click(function() {

        preambleCtr++;
        advancePreamble();

    })

}
function advancePreamble() {
    /*    if (preambleCtr == 0) {
     $('#opaque').fadeTo(250,0, function () {
     $('#opaque').css('background-image', 'url("images/cvhcv_aasld2012/seattle_opaque.png")').fadeTo(500,1);
     //   $('#opaque').fadeTo(1000,1);
     });
     }*/
    if (preambleCtr < 5) {


        // $('#intro').load('cvhcv_aasld2012/preamble/' + preambleCtr +'.html');
        $('#intro').fadeTo(250,0, function () { // wait for fadeout
            $.ajax({
                url: 'cvhcv_aasld2012/preamble/' + preambleCtr +'.html',
                cache: false, //important part
                dataType: "html",
                success: function(data) {
                    if (preambleCtr == 0) {
                        $('#content-frame').removeClass('preamble'); //restore screen 0 background, if needed
                        $('#footer').hide();
                        $("#intro").html(data).fadeTo(250,1);
                        $('#homepage p').click(function (e) {
                                /*e.preventDefault();*/
                            preambleCtr++;
                            advancePreamble(); //called recursively since this conditional is loosely a "base case" it cannot loop
                        });
                        $('#homepage').hover(function () {$(this).addClass('hover')},
                            function () {$(this).removeClass('hover')})

                    } else  {
                        initFooter();
                        $('#content-frame').addClass('preamble');


                        $("#intro").html(data).fadeTo(250,1);
                    }


                }
            });
        });
       // preambleCtr++;

    } else {

        $.ajax({
            url: 'cvhcv_aasld2012/preamble/menu.php',
            cache: false, //important part
            dataType: "html",
            success: function(data) {
                $('#footer').hide();
                $('#content-frame').removeClass('preamble').addClass('main-menu');
                $("#intro").html(data);
                $("#btn_menu").fadeTo(1500,1);
                $('.btn_menu_item').hover(
                    function() {$(this).addClass('hover');},
                    function() {$(this).removeClass('hover');});
                $('#footer').hide();
            }
        });
        /*$('#opaque').fadeTo(250,0, function () {
         $('#intro').html('<img src="images/cvhcv_aasld2012/images/CROI_03.png">')
         }).css('background','').fadeTo(250,1);*/

        $('#container').unbind('click'); //stop the click screen to advance

    }



}
