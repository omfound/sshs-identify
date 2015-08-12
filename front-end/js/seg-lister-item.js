(function(exports) {
  LIUM = exports.LIUM = exports.LIUM || {}; 
  LIUM.SegListerItem = React.createClass({
    getDefaultProps: function() {
      return {
        speakers: [],
        seekCallback: false
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
      return React.DOM.div({className: 'item ' + selected},
        React.DOM.ul({className: 'cf'},
          React.DOM.li({className: 'item-start'}, convert_time(this.props.start)),
          React.DOM.li({className: 'item-end'}, convert_time(this.props.end)),
          React.DOM.li({className: 'speaker-id'}, this.props.speaker_label),
          React.DOM.li({className: 'speaker-gender'}, this.props.speaker_gender),
          React.DOM.li({className: 'speaker-select-action'},
            React.createElement(LIUM.SpeakerSelect, {speakers: this.props.speakers})
          ),
          React.DOM.li({className: 'segment-play-action'},
            React.DOM.a({onClick: this.handleSeekClick, href: '#'}, 'Play Segment')
          ),
          React.DOM.li({className: 'item-select-action'},
            React.DOM.input({onClick: this.handleSelectClick, type: 'checkbox'})
          )
        )
      );
    },
    handleSeekClick: function(e) {
      this.props.seekCallback();
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
