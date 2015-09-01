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
          var title = this.state.assets[x].video;
          if (this.state.assets[x].assessed == true) {
            title = '*' + title;
          }
          options.push(React.DOM.option({key: x, value: x}, title)); 
        }
        return React.DOM.form({onSubmit: this.handleSubmit, className: 'asset-select'},
          React.DOM.label({}, 'Select a video file:'),
          React.DOM.select({ref: 'list'}, options),
          React.DOM.input({type: 'submit', onClick: this.handleSubmit, value: 'Go'})
        );
      } 
      if (this.state.mode == MODE_SEGMENT_ASSESS) {
        return React.DOM.div({},
          React.DOM.div({className: 'col col-2'},
            React.createElement(LIUM.Video, {
              url: this.state.selectedAssets.video, 
              appRoot: this.props.appRoot,
              videoCallback: this.handleVideoChange,
              ref: 'video'
            }),
            React.createElement(LIUM.Save, {saveCallback: this.saveCallback})
          ),
          React.DOM.div({className: 'col col-2'},
            React.createElement(LIUM.SegLister, {
              options: this.state.segments,
              seekCallback: this.handleSeek,
              currentVideoTime: this.state.currentVideoTime,
              ref: 'segLister'
            }),
            React.createElement(LIUM.SpeakerAssignment, {speakers: this.state.speakers, speakerChangeCallback: this.speakerChangeCallback})
          )
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
    },
    speakerChangeCallback: function(speaker, type) {
      var selected = this.refs.segLister.getSelectedIds();
      if (selected.length > 0) {
        this.refs.segLister.resetSelected(selected);
        var segments = this.state.segments;
        if (type == 'assign-all') {
          var speakerLabel = segments[selected[0]].speaker_label;
          for (var x in segments) {
            if (segments[x].speaker_label == speakerLabel) {
              segments[x].assigned_speaker = speaker.full_name;
            }
          }
        }
        if (type == 'assign') {
          for (var x in selected) {
            segments[selected[x]].assigned_speaker = speaker.full_name;
          }
        }
        this.setState({segments: segments});
      }
    },
    saveCallback: function() {
      this.ajax({
        type: 'POST',
        url: this.props.appRoot + '/segments',
        data: JSON.stringify({segments: this.state.segments, asset: this.state.selectedAssets.video}),
        success: this.saveSuccess,
        error: this.saveError,
        dataType: 'json',
        contentType: 'application/json'
      });
    },
    saveSuccess: function(data) {
      console.log(data);
    },
    saveError: function(xhr, error) {
      console.log(error);
    }
  });
  LIUM.App.prototype.ajax = $.ajax;
  LIUM.App.prototype.ajaxPromise = function(deffereds, success, fail) {
    $.when.apply($, deffereds).then(success, fail);
  };
})(window, jQuery);
