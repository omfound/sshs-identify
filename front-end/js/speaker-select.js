(function(exports) {
  LIUM = exports.LIUM = exports.LIUM || {};
  LIUM.SpeakerSelect = React.createClass({
    getDefaultProps: function() {
      return {
        speakers: []
      };
    },
    render: function() {
      var options = [];
      for (var x in this.props.speakers) {
        options.push(React.DOM.option({value: x, key: x}, this.props.speakers[x].full_name));
      }
      return React.DOM.select({}, options);
    }
  });
})(window);
