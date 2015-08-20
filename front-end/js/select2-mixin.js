(function(exports, $) {
  LIUM = exports.LIUM = exports.LIUM || {};
  LIUM.Select2Mixin = {
    attachSelect2: function(el) {
      $(el).select2();
    }
  };
})(window, jQuery);
