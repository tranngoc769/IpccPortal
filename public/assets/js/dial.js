var desUser = {
    name: 'No Name',
    number: '',
    image: '',
}
var x, y, z;
var makeToast = function(info) {
    clearInterval(x);
    $("#toaster").text(info);
    $("#toaster").toggleClass("show");
    x = setTimeout(function() {
        $("#toaster").toggleClass("show");
    }, 2000);
}
var timeoutTimer = true;
var totalSeconds = 0;
var timeCounterCounting = true;

var callConnected = function() {
    timeoutTimer = false;
    timeCounterCounting = true;
    timeCounterLoop();
    $('.pulsate').toggleClass('active-call');
    $('.ca-status').animate({
        opacity: 0,
    }, 1000, function() {
        $(this).text('00:00:00');
        $('.ca-status').attr('data-dots', '');
        $('.ca-status').animate({
            opacity: 1,
        }, 1000);
    });
}
var returnDialpad = function() {
    toggleInCall();
    $(".normal").toggleClass("hideCall"); // show/hide dialpad
    $('.phoneString input').val('');
    checkNumber();
};
var hangUpCall = function() {
    clearInterval(y);
    clearInterval(z);
    timeCounterCounting = false;
    totalSeconds = 0;
    timeoutTimer = false;
    $('.call-icon').toggleClass('return');
    $('.endcall-controller').toggleClass('hide');
    $('.call-controller').toggleClass('hide');
    // returnDialpad();
}
var timeCounterLoop = function() {
    if (timeCounterCounting) {
        z = setTimeout(function() {
            var timeStringSeconds = '';
            var hours = Math.floor(totalSeconds / 3600.0);
            var minutes = Math.floor(totalSeconds / 60.0);
            var seconds = totalSeconds % 60;
            if (hours < 10) {
                hours = '0' + hours;
            }
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            if (seconds < 10) {
                seconds = '0' + seconds;
            }
            $('.ca-status').text(hours + ":" + minutes + ':' + seconds);
            totalSeconds += 1;
            timeCounterLoop();
        }, 1000);
    }
};

var toggleInCall = function() {
    if ($('.call-icon').hasClass('return')) {
        $('.call-icon').toggleClass('return');
    }
    $('.endcall-controller').toggleClass('hide');
    $('.call-controller').toggleClass('hide');
    $('.call-pad').toggleClass('in-call');
    $('.call-icon').toggleClass('in-call');
    $('.call-change').toggleClass('in-call');
    $('.ca-avatar').toggleClass('in-call');
};
var dots = 0;
var looper = function() {
    if (timeoutTimer) {
        setTimeout(function() {
            if (dots > 3) {
                dots = 0;
            }
            var dotsString = '';
            for (var i = 0; i < dots; i++) {
                dotsString += '.';
            }
            $('.ca-status').attr('data-dots', dotsString);
            dots += 1;
            looper();
        }, 500);
    }
};
var checkNumber = function() {
    var numberToCheck = $('.phoneString input').val();
    if (numberToCheck.length > 0) {
        $.get(`/api/contact?number=${numberToCheck}`,
            function(data, status) {
                if (status == 'success') {
                    if (data.code == 200) {
                        showUserInfo(data.msg);
                    } else {
                        hideUserInfo();
                    }
                } else {
                    hideUserInfo();
                }
            });
    } else {
        hideUserInfo();
    }
};
var showUserInfo = function(userInfo) {
    if (!$('.contact').hasClass('showContact')) {
        $('.contact').addClass('showContact');
    }
    $('.n-avatar').attr('style', "background-image: url(/assets/user/tnquang.png)");
    if (!$('.contact').hasClass('showContact')) {
        $('.contact').addClass('showContact');
    }
    $('.contact-name').text(userInfo['name']);
    var matchedNumbers = $('.phoneString input').val();
    var number = userInfo['number'];
    var index = number.indexOf(matchedNumbers);
    var firstNumber = number.substring(0, index);
    var remainNumber = number.substring(index + matchedNumbers.length, number.length);
    $('.contact-number').html(firstNumber + "<span>" + matchedNumbers + "</span>" + remainNumber);
    $('.contact-name').html(userInfo['firstname'] + " " + userInfo['lastname']);
};
var hideUserInfo = function() {
    $('.contact').removeClass('showContact');
};
$(document).on('ready', function() {
    function playsound(num) {
        var music = new Audio();
        if (num == "#") num = "right";
        if (num == "*") num = "left";
        music = new Audio("/assets/sound/" + num + ".wav");
        music.play();
    }
    var setUserCall = function() {
        desUser.number = $("div[class='contact-number']").text();
        desUser.name = $("div[class='contact-name']").text();
        desUser.image = $("div[class='avatar']").css("background-image");
    }
    $('button[class="icon-callnow"]').click(function() {
        console.log('Icon click');
        setUserCall();
        $('.phoneString input').val(desUser.number);
        $(".call.action-dig").click();
    });
    $('.number-dig').click(function() {
        addAnimationToButton(this);
        var currentValue = $('.phoneString input').val();
        var valueToAppend = $(this).attr('name');
        playsound(valueToAppend);
        $('.phoneString input').val(currentValue + valueToAppend);
        checkNumber();
    });
    $('.action-dig').click(function() {
        addAnimationToButton(this);
        if ($(this).hasClass('goBack')) {
            var currentValue = $('.phoneString input').val();
            var newValue = currentValue.substring(0, currentValue.length - 1);
            $('.phoneString input').val(newValue);
            checkNumber();
        } else if ($(this).hasClass('call')) {
            if ($('.call-pad').hasClass('in-call')) {
                terminate();
            } else {
                if (!isRegister) {
                    alert('Cannot register');
                    return;
                }
                var number = $('.phoneString input').val();
                if (number == "") return;
                desUser.number = number;
                updateInfo();
                call(true, desUser.number);
                $(".normal").toggleClass("hideCall");
                $('.ca-status').text('Calling');
                setTimeout(function() {
                    toggleInCall();
                    timeoutTimer = true;
                    looper();
                    // callConnected();
                }, 500);
            }
        } else {}
    });
    var updateInfo = function() {
        $('.ca-avatar').attr('style', "background-image:" + desUser.image);
        $('.ca-name').text(desUser.name);
        $('.ca-number').text(desUser.number);
    }
    var addAnimationToButton = function(thisButton) {
        $(thisButton).removeClass('clicked');
        var _this = thisButton;
        setTimeout(function() {
            $(_this).addClass('clicked');
        }, 1);
    };
    $('div[data-label="Keypad"]').on('click', function() {
        $('div[id="dial-pad-incall"]').toggleClass('hideCall');
    })
    $('button[id="dial-icon"]').on('click', function() {
        $('div[id="pad"]').toggleClass("hide");
        $('button[id="dial-icon"]').toggleClass("hide")
    })
    $('div[class="close-dialpad"]').on('click', function(e) {
        $('button[id="dial-icon"]').toggleClass("hide")
        $('div[class="key-pad"]').toggleClass("hideCall")
    })
    $('div[class="close-dial"]').on('click', function(e) {
            $('div[id="pad"]').animate({ bottom: '-700px', left: '-100px' });
            $('button[id="dial-icon"]').toggleClass("hide");
            setTimeout(function() {
                $('div[id="pad"]').removeAttr("style");
                $('div[id="pad"]').toggleClass("hide");
            }, 1000);
        })
        // 

    $('div[class~="add-contact"]').on('click', function(e) {
        alert("Add contact");
    })
    $('div[class~="mute"]').on('click', function(e) {
        alert("Add contact");
    })
    $('div[class~="hold"]').on('click', function(e) {
        alert("Hold");
    })
    $('div[class~="tag"]').on('click', function(e) {
        alert("Add Tag");
    })
    $('div[class~="note"]').on('click', function(e) {
        alert("Add Note");
    })
    $('div[class~="keypad"]').on('click', function(e) {
        alert("Add keypad");
    })
})