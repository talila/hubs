import React from "react";
import styles from "./LeaveRoomModal.scss";
import { useIntl, defineMessages } from "react-intl";
import PropTypes from "prop-types";
import { Modal } from "../modal/Modal";
import { CloseButton } from "../input/CloseButton";
import { Button } from "../input/Button";

export const LeaveReason = {
  joinRoom: "joinRoom",
  createRoom: "createRoom"
};

const reasonMessages = defineMessages({
  [LeaveReason.joinRoom]: {
    id: "leave-room-dialog.join-room.message",
    defaultMessage: "Joining a new room will leave this one. Are you sure?"
  },
  [LeaveReason.createRoom]: {
    id: "leave-room-dialog.create-room.message",
    defaultMessage: "Creating a new room will leave this one. Are you sure?"
  }
});

const confirmationMessages = defineMessages({
  [LeaveReason.joinRoom]: {
    id: "leave-room-dialog.join-room.confirm",
    defaultMessage: "Join Room"
  },
  [LeaveReason.createRoom]: {
    id: "leave-room-dialog.create-room.confirm",
    defaultMessage: "Leave and Create Room"
  }
});

export function LeaveRoomModal({ reason, destinationUrl, onClose }) {
  const intl = useIntl();

  return (
    <Modal title="Leave Room" beforeTitle={<CloseButton onClick={onClose} />} contentClassName={styles.leaveRoomModal}>
      <p>{intl.formatMessage(reasonMessages[reason])}</p>
      <Button as="a" preset="cancel" href={destinationUrl} rel="noopener noreferrer">
        {intl.formatMessage(confirmationMessages[reason])}
      </Button>
    </Modal>
  );
}

LeaveRoomModal.propTypes = {
  reason: PropTypes.string,
  destinationUrl: PropTypes.string,
  onClose: PropTypes.func
};