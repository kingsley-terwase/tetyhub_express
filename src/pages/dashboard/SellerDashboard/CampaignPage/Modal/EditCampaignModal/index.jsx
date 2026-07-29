import { ModalLayout } from "@/layouts";
import { useCampaignForm } from "./UseCampaignForm";
import { ModalActions } from "./Actions";
import { CampaignFormBody } from "./CampaignFormBody";

/**
 * @param {Object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {(draft: import("./lib").CampaignDraft) => void} [props.onSubmit]
 */
export default function EditCampaignModal({ open, onClose, onSubmit }) {
  const { form, errors, handleChange, handleSubmit, handleCancel } =
    useCampaignForm({ onSubmit, onClose });

  return (
    <ModalLayout
      open={open}
      onClose={handleCancel}
      title="Edit Campaign"
      caption="Update the campaign details"
      round={8}
      py={5}
      px={5}
      actionSlot={
        <ModalActions onCancel={handleCancel} onSubmit={handleSubmit} />
      }
    >
      <CampaignFormBody form={form} errors={errors} onChange={handleChange} />
    </ModalLayout>
  );
}
