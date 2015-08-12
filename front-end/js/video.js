(function(exports) {
  LIUM = exports.LIUM = exports.LIUM || {};
  LIUM.Video = React.createClass({
    getDefaultProps: function() {
      return {
        width: 400,
        height: 400,
        url: '',
        start: false,
        end: false,
      };
    }, 
    componentWillUpdate: function() {
      var video = this.refs.video.getDOMNode();
      video.currentTime = Math.floor(this.props.start / 100);
      video.play();
    },
    render: function() {
      return React.DOM.video({width: this.props.width, height: this.props.height, controls: true, ref: 'video', preload: 'auto'}, 
         React.DOM.source({src: this.props.url, type: 'video/mp4'})
      );
    }
  });
})(window);
