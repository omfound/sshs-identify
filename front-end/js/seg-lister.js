(function(exports) {
  LIUM = exports.LIUM = exports.LIUM || {}; 
  LIUM.SegLister = React.createClass({
    getDefaultProps: function() {
      return {
        options: [],
        changeCallback: false,
        speakers: []
      };
    },
    render: function() {
      var children = [];
      for (var x in this.props.options) {
        this.props.options[x].key = x;
        this.props.options[x].speakers = this.props.speakers;
        children.push(React.createElement(LIUM.SegListerItem, this.props.options[x]));
      }
      return React.DOM.div({className: 'segment-list'}, children);
    },
    handleChange: function(event) {
      if (this.props.changeCallback) {
        this.props.changeCallback(event.target.value);
      }
    }
  });
})(window);
