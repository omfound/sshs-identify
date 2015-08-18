(function(exports) {
  LIUM = exports.LIUM = exports.LIUM || {};
  LIUM.Save = React.createClass({
    getDefaultProps: function() {
      return {
        saveCallback: false,
      };
    },
    render: function() {
      return React.DOM.form({onSubmit: this.handleSubmit, className: 'save-button'}, 
        React.DOM.input({type: 'submit', 'value': 'Output to JSON file', onClick: this.handleClick}) 
      );
    },
    handleSubmit: function(e) {
      e.preventDefault();
    },
    handleClick: function(e) {
      if (this.props.saveCallback) {
        this.props.saveCallback();
      }
      e.preventDefault();
    }
  });
})(window);
