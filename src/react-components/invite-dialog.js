import React, { Component } from "react";
import PropTypes from "prop-types";
import copy from "copy-to-clipboard";
import { FormattedMessage } from "react-intl";

import styles from "../assets/stylesheets/invite-dialog.scss";

function pad(num, size) {
  let s = `${num}`;
  while (s.length < size) s = `0${s}`;
  return s;
}

export default class InviteDialog extends Component {
  static propTypes = {
    entryCode: PropTypes.number,
    allowShare: PropTypes.bool,
    onClose: PropTypes.func
  };

  state = {
    copyButtonActive: false,
    shareButtonActive: false
  };

  shareClicked = link => {
    this.setState({ shareButtonActive: true });
    setTimeout(() => this.setState({ shareButtonActive: false }), 5000);

    navigator.share({ title: document.title, url: link });
  };

  copyClicked = link => {
    this.setState({ copyButtonActive: true });
    setTimeout(() => this.setState({ copyButtonActive: false }), 5000);

    copy(link);
  };

  render() {
    const { entryCode } = this.props;

    const entryCodeString = pad(entryCode, 6);
    const shareLink = `hub.link/${entryCodeString}`;

    return (
      <div className={styles.dialog}>
        <div className={styles.attachPoint} />
        <div className={styles.close} onClick={() => this.props.onClose()}>
          <span>×</span>
        </div>
        <div>
          <FormattedMessage id="invite.enter_via" />
          <a href="https://hub.link" target="_blank" className={styles.hubLinkLink} rel="noopener noreferrer">
            hub.link
          </a>
          <FormattedMessage id="invite.and_enter_code" />
        </div>
        <div className={styles.code}>
          {entryCodeString.split("").map((d, i) => (
            <div className={styles.digit} key={`link_code_${i}`}>
              {d}
            </div>
          ))}
        </div>
        <div>
          <FormattedMessage id="invite.or_visit" />
        </div>
        <div className={styles.domain}>
          <input type="text" readOnly onFocus={e => e.target.select()} value={shareLink} />
        </div>
        <div className={styles.buttons}>
          <button className={styles.linkButton} onClick={this.copyClicked.bind(this, "https://" + shareLink)}>
            <span>{this.state.copyButtonActive ? "copied!" : "copy"}</span>
          </button>
          {this.props.allowShare &&
            navigator.share && (
              <button className={styles.linkButton} onClick={this.shareClicked.bind(this, "https://" + shareLink)}>
                <span>{this.state.shareButtonActive ? "sharing..." : "share"}</span>
              </button>
            )}
        </div>
      </div>
    );
  }
}
