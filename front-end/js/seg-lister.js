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
    getSelectedIds: function() {
      var selected = [];
      for (var x in this.refs) {
        if (this.refs[x].state.selected == true) {
          selected.push(x);
        }
      }
      return selected;
    },
    resetSelected: function(selected) {
      for (var x in selected) {
        this.refs[selected[x]].setState({selected: false});
      }
    },
    render: function() {
      var children = [];
      for (var x in this.props.options) {
        this.props.options[x].key = x;
        this.props.options[x].ref = x; 
        this.props.options[x].seekCallback = this.props.seekCallback;
        this.props.options[x].currentVideoTime = this.props.currentVideoTime;
        children.push(React.createElement(LIUM.SegListerItem, this.props.options[x]));
      }
      return React.DOM.div({className: 'segment-list'}, children);
    }
  });
})(window);
