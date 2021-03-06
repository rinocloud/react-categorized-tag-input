import React from 'react';

import Tag from './Tag.jsx';

const { PropTypes } = React;

const Input = React.createClass({
  propTypes: {
    openPanel: PropTypes.func.isRequired,
    closePanel: PropTypes.func.isRequired,
    onValueChange: PropTypes.func.isRequired,
    onTagDeleted: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    onBlur: PropTypes.func,
  },

  focusInput() {
    this.refs.input.focus();
  },

  resizeInput() {
    let node = this.refs.input;
    node.style.width = (node.scrollWidth + 8) + 'px';
  },

  getTags() {
    return this.props.tags.map((t, i) => {
      return (
        <Tag selected={false} input='' text={t} addable={false}
          deletable={true} key={t + '_' + i}
          onDelete={() => this.props.onTagDeleted(i)} />
      );
    });
  },

  onBlur(e) {
    this.props.closePanel();
    if (typeof this.props.onBlur === 'function') {
      this.props.onBlur(e);
    }
  },

  render() {
    return (
      <div className='cti__input' onClick={this.focusInput}>
        {this.getTags()}
        <input type='text' ref='input' value={this.props.value}
          size={this.props.value.length + 2}
          onFocus={this.props.openPanel} onBlur={this.onBlur}
          onChange={this.props.onValueChange} onKeyDown={this.props.onKeyDown}
          className='cti__input__input' />
        <div className='cti__input__arrow' />
      </div>
    );
  }
});

export default Input;
