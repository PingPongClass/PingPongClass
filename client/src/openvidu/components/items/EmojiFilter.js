import React, { Component } from 'react';

export default class EmojiFilter extends Component {
  constructor(props) {
    super(props);
    this.state = { user: this.props.user };
    console.log(this.state.user);
  }

  render() {
    return (
      <div style={{ position: 'relative', height: '100%' }}>
        {!this.state.user.screenShareActive && this.state.user.videoActive ? (
          <div>
            <h3
              style={{
                position: 'absolute',
                fontSize: '140px',
                bottom: '0px',
                right: '0px',
              }}
            >
              {this.state.user.smile ? '😁' : null}
            </h3>
            <h3
              style={{
                position: 'absolute',
                fontSize: '130px',
                bottom: '0px',
                right: '0px',
              }}
            >
              {this.state.user.outAngle ? '🚫' : null}
            </h3>
          </div>
        ) : null}
      </div>
    );
  }
}
