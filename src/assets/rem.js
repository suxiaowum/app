(function (doc, win) {
  var h = document.documentElement.clientHeight || document.body.clientHeight;

  var docEl = doc.documentElement,

    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      if (h > 667 && h < 812) {
        docEl.style.fontSize = 16 * (clientWidth / 375) + 'px';
      } else {
        if (h > 811) {
          docEl.style.fontSize = 18 * (clientWidth / 375) + 'px';

        } else {
          docEl.style.fontSize = 14 * (clientWidth / 375) + 'px';

        }

      }
    };

  if (!doc.addEventListener) return;

  win.addEventListener(resizeEvt, recalc, false);

  doc.addEventListener('DOMContentLoaded', recalc, false);

})(document, window);
