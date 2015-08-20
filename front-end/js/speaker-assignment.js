(function(exports) {
  LIUM = exports.LIUM = exports.LIUM || {};
  LIUM.SpeakerAssignment = React.createClass({
    mixins: [LIUM.Select2Mixin],
    getDefaultProps: function() {
      return {
        speakers: [],
        speakerChangeCallback: false
      };
    },
    componentDidMount: function() {
      this.attachSelect2(this.refs.list.getDOMNode());
    },
    shouldComponentUpdate: function(nextProps, nextState) {
      return this.props.speakers.length !== nextProps.speakers.length;
    },
    render: function() {
      var options = [];
      for (var x in this.props.speakers) {
        options.push(React.DOM.option({value: x, key: x}, this.props.speakers[x].full_name));
      }
      return React.DOM.form({onSubmit: this.handleSubmit},
        React.DOM.select({ref: 'list'}, options), 
        React.DOM.input({type: 'submit', onClick: this.handleClick.bind(this, 'assign'), value: 'Assign Speaker'}),
        React.DOM.input({type: 'submit', onClick: this.handleClick.bind(this, 'assign-all'), value: 'Assign Speaker To All With This ID'}) 
      );
    },
    handleSubmit: function(e) {
      e.preventDefault();
    },
    handleClick: function(type, e) {
      if (this.props.speakerChangeCallback) {
        var list = this.refs.list.getDOMNode();
        var value = this.props.speakers[list.selectedIndex]; 
        this.props.speakerChangeCallback(value, type);
      } 
      e.preventDefault();
    }
  });
})(window);
