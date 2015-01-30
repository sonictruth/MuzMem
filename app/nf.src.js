function fbs_click(u, t) {
    window.open('http://www.facebook.com/sharer.php?u=' + encodeURIComponent(u) + '&t=' + encodeURIComponent(t), 'sharer', 'toolbar=0,status=0,width=626,height=436');
    return false;
}

function getTipConfig(text) {
    var r = {
        position: {
            corner: {
                target: 'bottomMiddle',
                tooltip: 'topMiddle'
            }
        },
        style: {
            border: {
                width: 0
            }
        }
    }
    if (text) r.content = text;
    return r;
}

function initFolder(id, count, data, link, tooltip) {


    var folder = $("#" + id);
    var container = folder.children(".itemContainer");
    if (data.length == 0 || !data) {
        return;
    }

    var circular = true;
    if (data[0].showdiv) circular = false;


    var containerUL = container.children("ul");

    var next = folder.children(".nextItem");
    var prev = folder.children(".prevItem");
    prev.addClass('disabled');
    if( ! circular && data.length <= count ){
      next.addClass('disabled');
    }

    var c = (data.length < count) ? count : data.length;
    var cc = 0;
    var w = folder.width() / count;
    var h = folder.height();
    if (link != '') {
        folder.css('cursor', 'pointer');
        next.addClass('disabled');
        folder.click(function () {
            document.location.href = link
        });
        if (tooltip) folder.qtip(getTipConfig(tooltip));
    }

    if (!circular) {
        for (var i = 0; i < data.length; i++) {
                var o = data[i];
                var l = $('<li title="' + o.tooltip + '" style="cursor: pointer; overflow: hidden; width: ' + w + 'px; height: ' + h + 'px; background-image:url(\'' + o.thumb + '\');"><div style="height: ' + h + 'px; border-left: 1px Solid #b3b0af;"></div></li>');
                l.attr('id', o.link);
                l.mouseover(function () {
                    $(this).fadeTo(200, 0.8)
                });
                l.mouseout(function () {
                    $(this).fadeTo(300, 1)
                });
                var f1 = function (i) {
                    return function () {
                        showDiv(i)
                    }
                }
                var f2 = function (i) {
                    return function () {
                        document.location.href = i
                    }
                }
                if (o.showdiv) l.click(f1(o.showdiv));
                else
                l.click(f2(o.link));

                containerUL.append(l);

        }
    } else {
        for (var i = 0; i < c; i++) {
            if (cc >= data.length) cc = 0;
            var o = data[cc];
            if (link) {
                containerUL.append('<li style="cursor: pointer; overflow: hidden; width: ' + w + 'px; height: ' + h + 'px; background-image:url(\'' + o.thumb + '\');"><div style="height: ' + h + 'px; border-left: 1px Solid #b3b0af;"></div></li>');
            } else {
                var l = $('<li title="' + o.tooltip + '" style="cursor: pointer; overflow: hidden; width: ' + w + 'px; height: ' + h + 'px; background-image:url(\'' + o.thumb + '\');"><div style="height: ' + h + 'px; border-left: 1px Solid #b3b0af;"></div></li>');
                l.attr('id', o.link);
                l.mouseover(function () {
                    $(this).fadeTo(200, 0.8)
                });
                l.mouseout(function () {
                    $(this).fadeTo(300, 1)
                });
                var f2 = function (i) {
                    return function () {
                        document.location.href = i
                    }
                }
                l.click(f2(o.link));
                containerUL.append(l);
                prev.hide();
            }
            cc++;
        }
    }
    if (link != '') {
        if (tooltip != '') {
            folder.attr('title', tooltip);
        }
        var c = container.jCarouselLite({
            playover: true,
            speed: 800,
            easing: 'elasout',
            visible: count
        });
    } else {

        container.jCarouselLite({
            speed: 800,
            easing: 'easeout',
            btnNext: ".nextItem",
            btnPrev: ".prevItem",
            circular: circular,
            visible: count
        });


        containerUL.children('li').qtip(getTipConfig(null));

    }
}

function randrange(minVal, maxVal, floatVal) {
    var randVal = minVal + (Math.random() * (maxVal - minVal));
    return typeof floatVal == 'undefined' ? Math.round(randVal) : randVal.toFixed(floatVal);
}

