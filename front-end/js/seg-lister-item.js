(function(exports) {
  LIUM = exports.LIUM = exports.LIUM || {}; 
  LIUM.SegListerItem = React.createClass({
    getDefaultProps: function() {
      return {
        speakers: [],
        seekCallback: false,
        currentVideoTime: 0
      };
    },
    getInitialState: function() {
      return {
        selected: false,
        speaker: false
      };
    },
    render: function() {
      var selected = this.state.selected == true ? 'selected' : 'not-selected'; 
      var playing = this.itemIsPlaying() == true ? 'playing' : '';
      return React.DOM.div({className: 'item ' + selected},
        React.DOM.ul({className: 'cf'},
          React.DOM.li({className: 'item-start'}, convert_time(this.props.start)),
          React.DOM.li({className: 'item-end'}, convert_time(this.props.end)),
          React.DOM.li({className: 'speaker-id'}, this.props.speaker_label),
          React.DOM.li({className: 'speaker-gender'}, this.props.speaker_gender),
          React.DOM.li({className: 'assigned-speaker'}, this.props.assigned_speaker || 'none'),
          React.DOM.li({className: 'segment-play-action'},
            React.DOM.a({onClick: this.handleSeekClick.bind(this, this.props.start / 100, this.props.end / 100), href: '#'}, 'Play Segment')
          ),
          React.DOM.li({className: 'item-select-action'},
            React.DOM.input({onChange: this.handleSelectClick, type: 'checkbox', checked: this.state.selected})
          ),
          React.DOM.li({className: 'status'}, playing)
        )
      );
    },
    itemIsPlaying: function() {
      return this.props.start / 100 <= this.props.currentVideoTime && this.props.end / 100 >= this.props.currentVideoTime;
    },
    handleSeekClick: function(start, stop, e) {
      if (this.props.seekCallback) {
        this.props.seekCallback(e, start, stop);
      }
      e.preventDefault();
    },
    handleSelectClick: function(e) {
      var selected = this.state.selected == true ? false : true;
      this.setState({selected: selected});
    }
  });
  function convert_time(input) {
    input /= 100;
    var hours = Math.floor(input / 3600);
    var minutes = Math.floor((input / 60) % 60);
    var seconds = Math.floor(input % 60);
    return hours + ':' + minutes + ':' + seconds;
  }
})(window);
