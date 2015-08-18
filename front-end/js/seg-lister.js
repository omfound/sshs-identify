(function(exports) {
  LIUM = exports.LIUM = exports.LIUM || {};
  LIUM.SegLister = React.createClass({
    getDefaultProps: function() {
      return {
        options: [],
        seekCallback: false,
        currentVideoTime: 0
      };
    },
    shouldComponentUpdate: function(nextProps, nextState) {
      return (this.props.currentVideoTime !== nextProps.currentVideoTime) || (this.props.options.length != nextProps.options.length); 
    },
    render: function() {
      var children = [];
      for (var x in this.props.options) {
        this.props.options[x].key = x;
        this.props.options[x].seekCallback = this.props.seekCallback;
        this.props.options[x].currentVideoTime = this.props.currentVideoTime;
        children.push(React.createElement(LIUM.SegListerItem, this.props.options[x]));
      }
      return React.DOM.div({className: 'segment-list'}, children);
    }
  });
})(window);
