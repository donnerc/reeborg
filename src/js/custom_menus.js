/* Author: André Roberge
   License: MIT
 */

/*jshint browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR */

RUR.custom_menu = {};
RUR.custom_menu.new_menu_added = false;

RUR.custom_menu.make = function (contents, replace) {
    "use strict";
    var i;
    if ($("#custom-world-menu").length > 0) { // already exists
        $("#custom-world-menu").html();
    } else {
        $("#header-child").append('<select id="custom-world-menu"></select>');
    }

    $("#custom-world-menu").css("margin-top", "10px").css("margin-left", "20px");
    for(i=0; i<contents.length; i++){
        $('#custom-world-menu').append( $('<option></option>').val(contents[i][0]).html(contents[i][1]));
    }

    if (replace) {
        $("#select_world").replaceWith($("#custom-world-menu"));
    }

    $("#custom-world-menu").change(function() {
        RUR.custom_menu.load_file($(this).val());
    });
    $("#custom-world-menu").change();

    RUR.custom_menu.new_menu_added = true;  // will modify program execution
};

RUR.custom_menu.load_file = function (url) {
    "use strict";
    $.ajax({url: url,
        async: false,
        error: function(e){
            $("#Reeborg-shouts").html(RUR.translate("Could not find link")).dialog("open");
            RUR.ui.stop();
        },
        success: function(data){
            if (typeof data == "string"){
                RUR.update_permalink(data);
                RUR.ui.reload();
            } else {
                RUR.world.import_world(data, true);
                RUR.we.show_pre_post_code();
            }
        }
    });
};