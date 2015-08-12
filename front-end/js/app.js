(function(exports, $) {
  LIUM = exports.LIUM = exports.LIUM || {};
  LIUM.App = function(el) {
    this.el = el;
    this.appRoot = $(el).data('app-root');
    if (!this.appRoot) {
      throw new Error("App root missing from application container.");
    }
    this.init();
  }
  LIUM.App.prototype.init = function() {
    $.ajax({url: this.appRoot + '/assets', success: this.success, context: this});
    this.wrapper = React.render(React.createElement(LIUM.Wrapper), this.el);
  }
  LIUM.App.prototype.success = function(data) {
    this.wrapper.setState({assets: data});
  }
})(window, jQuery);

$('document').ready(
  function() {
    new LIUM.App($('#app')[0]);
  }
);
