import { Button, Modal } from "flowbite-react";
import { useState } from "react";

export default function ConfirmationModal() {
  const [openModal, setOpenModal] = useState(false);
  const props = { openModal, setOpenModal };

  return (
    <>
      <Button onClick={() => props.setOpenModal("default")}>submit</Button>
      <Modal
        show={props.openModal === "default"}
        onClose={() => props.setOpenModal(false)}
      >
        <Modal.Header>Form Confirmation</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              are you sure you want to proceed?
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" onClick={() => props.setOpenModal(false)}>
            I accept
          </Button>
          <Button color="gray" onClick={() => props.setOpenModal(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
