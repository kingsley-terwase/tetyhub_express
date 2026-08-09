// @ts-nocheck
import { useState } from "react";
import { Stack, Typography } from "@mui/material";
import { Star24Filled } from "@fluentui/react-icons";
import {
  ModalShell,
  ModalField,
  PrimaryButton,
  GhostButton,
  Avatar,
} from "../../SellerUi";

export default function ReviewReplyModal({
  open,
  onClose,
  review,
  onSubmit,
  fg,
  bg,
  border,
  main,
}) {
  const [reply, setReply] = useState("");
  if (!review) return null;

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="Reply to review"
      subtitle={review.customer}
      bg={bg}
      fg={fg}
      border={border}
      maxWidth={460}
      footer={
        <>
          <Stack sx={{ flex: 1 }}>
            <GhostButton onClick={onClose} fg={fg} border={border} main={main}>
              Cancel
            </GhostButton>
          </Stack>
          <Stack sx={{ flex: 1 }}>
            <PrimaryButton
              disabled={!reply.trim()}
              onClick={() => {
                onSubmit?.(review, reply);
                setReply("");
                onClose?.();
              }}
              main={main}
            >
              Post reply
            </PrimaryButton>
          </Stack>
        </>
      }
    >
      <Stack direction="row" alignItems="flex-start" gap={1.2} sx={{ mb: 2 }}>
        <Avatar name={review.customer} size={36} />
        <Stack sx={{ minWidth: 0 }}>
          <Stack direction="row" alignItems="center" gap={0.9}>
            <Typography
              sx={{ fontSize: 13, fontWeight: 700, color: fg.primary }}
            >
              {review.customer}
            </Typography>
            <Stack direction="row" gap={0.15}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star24Filled
                  key={i}
                  style={{
                    fontSize: 12,
                    color: i < review.rating ? "#E8912D" : border.primary,
                  }}
                />
              ))}
            </Stack>
          </Stack>
          <Typography
            sx={{
              fontSize: 12.5,
              color: fg.secondary,
              mt: 0.5,
              lineHeight: 1.5,
            }}
          >
            {review.comment}
          </Typography>
        </Stack>
      </Stack>

      <ModalField
        label="Your reply"
        value={reply}
        onChange={setReply}
        placeholder="Thank the buyer, and address anything they raised…"
        multiline
        minRows={3}
        fg={fg}
        border={border}
      />
    </ModalShell>
  );
}
