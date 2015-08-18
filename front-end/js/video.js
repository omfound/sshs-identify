(function(exports) {
  LIUM = exports.LIUM = exports.LIUM || {};
  LIUM.Video = React.createClass({
    getInitialState: function() {
      return {
        start: 0,
        stop: 0
      };
    },
    getDefaultProps: function() {
      return {
        width: 500,
        height: 227,
        url: '',
        videoCallback: false
      };
    },
    componentDidMount: function() {
      if (this.props.url) {
        this.interval = setInterval(this.tick, 1000);
      }
    },
    componentWillUnmount: function() {
      if (this.interval) {
        clearInterval(this.interval);
      }
    },
    shouldComponentUpdate: function(nextProps, nextState) {
      return nextProps.url !== this.props.url;
    },
    seekVideo: function(start, stop) {
      if (start > 0) {
        var video = this.refs.video.getDOMNode();
        this.setState({start: start, stop});
        video.currentTime = start;
        video.play();
      }
    },
    render: function() {
      return React.DOM.video({width: this.props.width, height: this.props.height, controls: true, ref: 'video', preload: 'auto'},
         React.DOM.source({src: this.props.appRoot + '/' + this.props.url, type: 'video/mp4'})
      );
    },
    tick: function() {
      var video = this.refs.video.getDOMNode();
      if (this.props.videoCallback) {
        this.props.videoCallback(video.currentTime);
      }
    }
  });
})(window);
