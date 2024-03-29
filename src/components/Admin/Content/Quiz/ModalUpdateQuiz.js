import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { putUpdateQuizForAdmin } from "../../../../services/apiService";
import _ from "lodash";
import { useTranslation, Trans } from "react-i18next";

const ModalUpdateQuiz = (props) => {
  const { show, setShow, dataUpdate, setDataUpdate } = props;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      // update state
      setDescription(dataUpdate.description);
      setName(dataUpdate.name);
      setType(dataUpdate.difficulty);
      setImage("");
      if (dataUpdate.image) {
        setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
      }
    }
  }, [props.dataUpdate]);

  const handleClose = () => {
    setShow(false);
    setName("");
    setDescription("");
    setType("");
    setImage("");
    setPreviewImage("");
    setDataUpdate({});
  };

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    } else {
      //   setPreviewImage("");
    }
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmitCreateUser = async () => {
    // validate
    // const isValidEmail = validateEmail(email);
    // if (!isValidEmail) {
    //   toast.error("Invalid email");
    //   return;
    // }

    let data = await putUpdateQuizForAdmin(
      dataUpdate.id,
      name,
      description,
      type,
      image
    );

    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      //   await props.fetchQuiz();
      // props.setCurrentPage(1);
      await props.fetchQuiz(props.currentPage);
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  const { t } = useTranslation();

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("admin.manage-quiz.u")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">
                {t("admin.manage-quiz.quiz-name")}
              </label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                {t("admin.manage-quiz.quiz-desc")}
              </label>
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">
                {t("admin.manage-quiz.quiz-type")}
              </label>
              <select
                className="form-select"
                onChange={(event) => setType(event.target.value)}
                value={type}
              >
                <option value="EASY">EASY</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HARD">HARD</option>
              </select>
            </div>

            <div className="col-md-12">
              <label className="form-label label-upload" htmlFor="labelUpload">
                <FcPlus />
                {t("admin.manage-quiz.quiz-upload")}
              </label>
              <input
                type="file"
                id="labelUpload"
                hidden
                onChange={(event) => handleUploadImage(event)}
              />
            </div>

            <div className="col-md-12 img-preview">
              {previewImage ? (
                <img src={previewImage} />
              ) : (
                <span>Preview Image</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("admin.manage-quiz.quiz-close")}
          </Button>
          <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
            {t("admin.manage-quiz.quiz-save")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateQuiz;
