$(document).ready(function() {
    $('input[type=text][name=searchString]').tooltip({
        placement: "bottom",
        trigger: "hover"
    });
    $("form button").keypress(function(e) {
        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
            $('button[type=submit] .default').click();
            return false;
        } else {
            return true;
        }
    });
    $("#phone").keypress(function(e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });
    // $('#add-contact').click( function(event){
    //     event.stopPropagation();
    //     $('#drop-choice').toggle();
    // });
    $(document).click( function(){
        $('#drop-choice,#drop-choice-filter').hide();
    });
});
