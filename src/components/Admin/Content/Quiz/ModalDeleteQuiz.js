import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteQuizForAdmin } from "../../../../services/apiService";
import { useTranslation, Trans } from "react-i18next";

const ModalDeleteQuiz = (props) => {
  const { show, setShow, dataDelete } = props;

  const handleClose = () => setShow(false);

  const handleSubmitDeleteQuiz = async () => {
    let data = await deleteQuizForAdmin(dataDelete.id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      await props.fetchQuiz();
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  const { t } = useTranslation();

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{t("admin.manage-quiz.q-confirm")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t("admin.manage-quiz.confirm")} id:{" "}
          <b>{dataDelete && dataDelete.id ? dataDelete.id : ""}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("admin.manage-quiz.cancel")}
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSubmitDeleteQuiz();
            }}
          >
            {t("admin.manage-quiz.cf")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteQuiz;
