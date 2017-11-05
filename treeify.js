 // options
 //  dir : "rtl" // to make the tree work from right to left


function add_first_level(that, treeMembers, arrow_class) {
    var parents = []
    for (var i = 0; i < treeMembers.length; i++) {
        if ($(treeMembers[i]).attr("parent_id") == "0" ) {
            $(treeMembers[i]).prepend( $('<a/>').addClass('icon ' +arrow_class)).addClass("root");
            $(that).append(treeMembers[i]);
            $(that).find(treeMembers[i]).after('<li class="collapsed" ><ul class="children "></ul></li>');
            parents.push($(treeMembers[i]));
        };
    };
    return parents;
};
function getNumber(str){
    return str.match(/\d/g).join("");
};
function add_sub_level(parents, treeMembers, arrow_class) {
    var new_parents = [];
    for (var i = 0; i < treeMembers.length; i++) {
        for (var j = 0; j < parents.length; j++) {
            console.log( "parent id is " + $(treeMembers[i]).attr("parent_id") + " and id is " + $(parents[j]).attr('id'));
            if ( $(treeMembers[i]).attr("parent_id") == $(parents[j]).attr('id')) {
                $(treeMembers[i]).prepend( $('<a/>').addClass('icon '+arrow_class) );
                $(parents[j]).next().find('ul').first().append($(treeMembers[i]).addClass("child"));
                $(parents[j]).next().find('ul').first().find(treeMembers[i]).after('<li class="collapsed" ><ul class="children "></ul></li>');
                new_parents.push($(parents[j]).next().find("ul").first().find('li').first());
                break;
            };
        };
    };
    return new_parents;
};

function toggleChildren(e){
    e.preventDefault();
    arrow_class = e.data.arrow_class;
    if ($(this).parent().next().hasClass("expanded")){

        $(this).parent().next().removeClass("expanded").addClass("collapsed").hide(500);
        $(this).removeClass('arrow-down').addClass(arrow_class);
    }else{
        if ($(this).parent().next().hasClass("collapsed")){
            $(this).parent().next().removeClass("collapsed").addClass("expanded").show(500);
            $(this).removeClass(arrow_class).addClass("arrow-down");
            var children = $(this).parent().next().find('ul').first().children('li.child');
            for(i = 0; i < children.length;i++){
                for (var j = 0; j < children.length; j++) {

                    if (parseInt($(children[j]).attr("order")) == i+1 ){
                        // console.log($(children[i]).attr("order"));
                        // console.log("loop" + i);
                        var next_li = $(children[j]).next().clone(true,true);
                        var current_li = $(children[j]).clone(true,true);
                        var parent = $(children[j]).parent();
                        parent.append(current_li);
                        parent.append(next_li);
                        $(children[j]).remove();
                        $(children[j]).next().remove();
                        break;
                    };// end of the absolute nested if
                }; // end of the inner loop
            }; // end of the outer loop
        };// end of nested if
    };// end of if
}; // end of click handler

function getDirection(options){
    if(options && options.dir == "rtl"){
        arrow_class = 'arrow-left'
    }else{
        arrow_class = 'arrow-right'
    }
    return arrow_class;
};

(function($) {
        $.fn.treeify = function(options) {
            var arrow_class = getDirection(options);
            var listMembers = $(this).find('li');
            $(this).attr("class", "treeifiedList");
            var parents = add_first_level(this, listMembers, arrow_class);
            $(this).find("li a.icon").live( "click", {'arrow_class': arrow_class}, toggleChildren);
            for (var i = 0; i < 15; i++) {
                parents = add_sub_level(parents, listMembers, arrow_class);
            };
            $(".collapsed").hide();
        };
    }(jQuery)
);