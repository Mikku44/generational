import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper, { type PaperProps } from "@mui/material/Paper";

interface ReusableDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
  actions?: React.ReactNode; // optional custom actions
}

function PaperComponent(props: PaperProps) {
  const nodeRef = React.useRef<HTMLDivElement>(null);
  return <Paper {...props} ref={nodeRef} />;
}

export default function ReusableDialog({
  open,
  onClose,
  title,
  content,
  actions,
}: ReusableDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>{typeof content === "string" ? <DialogContentText>{content}</DialogContentText> : content}</DialogContent>
      <DialogActions>
        {actions || (
          <>
            <Button autoFocus onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onClose}>Ok</Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}
