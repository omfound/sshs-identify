(function(exports, $) {
  var MODE_ASSET_SELECT = 1;
  var MODE_SEGMENT_ASSESS = 2;
  var MODE_LOADING = 3;
  LIUM = exports.LIUM = exports.LIUM || {};
  LIUM.App = React.createClass({
    getInitialState: function() {
      return {
        mode: MODE_LOADING,
        assets: [],
        selectedAssets: false,
        speakers: [],
        segments: [],
        currentVideoTime: 0
      };
    },
    componentDidMount: function() {
      this.ajax({url: this.props.appRoot + '/assets', success: this.assetSuccess, context: this});
    }, 
    render: function() {
      if (this.state.mode == MODE_ASSET_SELECT) {
        var options = [];
        for (var x in this.state.assets) {
          options.push(React.DOM.option({key: x, value: x}, this.state.assets[x].video)); 
        }
        return React.DOM.form({onSubmit: this.handleSubmit},
          React.DOM.label({}, 'Select a video file:'),
          React.DOM.select({ref: 'list'}, options),
          React.DOM.input({type: 'submit', onClick: this.handleSubmit, value: 'Go'})
        );
      } 
      if (this.state.mode == MODE_SEGMENT_ASSESS) {
        return React.DOM.div({},
          React.createElement(LIUM.Video, {
            url: this.state.selectedAssets.video, 
            appRoot: this.props.appRoot,
            videoCallback: this.handleVideoChange,
            ref: 'video'
          }),
          React.createElement(LIUM.SpeakerAssignment, {speakers: this.state.speakers}),
          React.createElement(LIUM.SegLister, {options: this.state.segments, seekCallback: this.handleSeek, currentVideoTime: this.state.currentVideoTime})
        );
      }
      if (this.state.mode == MODE_LOADING) {
        return React.DOM.div({}, 'loading...'); 
      }
    },
    assetSuccess: function(data) {
      this.setState({assets: data, mode: MODE_ASSET_SELECT});
    },
    detailSuccess: function(speakers, json) {
      this.setState({speakers: speakers[0], segments: json[0], mode: MODE_SEGMENT_ASSESS});
    },
    handleSubmit: function(e) {
      e.preventDefault();
      var list = this.refs.list.getDOMNode();
      var value = this.state.assets[list.selectedIndex];  
      this.setState({selectedAssets: value, mode: MODE_LOADING});
      var defs = [];
      defs.push(this.ajax({url: this.props.appRoot + '/' + value.speakers}));
      defs.push(this.ajax({url: this.props.appRoot + '/' +value.json}));
      this.ajaxPromise(defs, this.detailSuccess)  
    },
    handleSeek: function(e, start, stop) {
      this.refs.video.seekVideo(start, stop);
    },
    handleVideoChange: function(currentTime) {
      this.setState({currentVideoTime: currentTime});
    }
  });
  LIUM.App.prototype.ajax = $.ajax;
  LIUM.App.prototype.ajaxPromise = function(deffereds, success, fail) {
    $.when.apply($, deffereds).then(success, fail);
  };
})(window, jQuery);
