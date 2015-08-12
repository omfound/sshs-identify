(function(exports, $) {
  LIUM = exports.LIUM = exports.LIUM || {};
  LIUM.Wrapper = React.createClass({
    getInitialState: function() {
      return {
        list: true,
        detail: false,
        assets: [],
        selected: false,
        options: [],
        speakers: []
      }
    },
    componentWillUpdate: function(nextProps, nextState) {
      if (nextState.detail == true && nextState.options.length == 0) {
        $.ajax({url: nextState.selected.json, success: this.optionsSuccess, context: this});
        $.ajax({url: nextState.selected.speakers, success: this.speakersSuccess, context: this});
      }
    },
    render: function() {
      if (this.state.list == true) {
        var options = [];
        for (x in this.state.assets) {
          options.push(React.DOM.option({key: x, value: x}, this.state.assets[x].video));
        }
        return React.DOM.form({onSubmit: this.handleSubmit},
          React.DOM.label({}, 'Select a video file:'),
          React.DOM.select({ref: 'list'}, options),
          React.DOM.input({type: 'submit', onClick: this.handleSubmit, value: 'Go'})
        );
      }
      if (this.state.detail == true) {
        return React.DOM.div({},
          React.createElement(LIUM.Video, {url: this.state.selected.video}),
          React.createElement(LIUM.SegLister, {options: this.state.options, changeCallback: this.segListChange, speakers: this.state.speakers})
        );
      }
    },
    optionsSuccess: function(data) {
      this.setState({options: data});
    },
    speakersSuccess: function(data) {
      this.setState({speakers: data});
    },
    handleSubmit: function(e) {
      var list = this.refs.list.getDOMNode();
      this.setState({list: false, detail: true, selected: this.state.assets[list.selectedIndex]});
      e.preventDefault();
    },
    segListChange: function() {

    }
  }); 
})(window, jQuery);
