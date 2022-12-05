import { useRecoilState, useRecoilValue } from "recoil";
import { useCallback, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

import { getAccessToken } from "../hooks/getToken";
import useDeleteList from "../hooks/movie";
import {
  MovieListIdState,
  modalPropsState,
  selectedMediaState,
} from "../atoms/atom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  padding: "30px",
};

interface IModalControlProps {
  handleRefetch?: () => void;
}

const ModalControl = ({ handleRefetch }: IModalControlProps) => {
  const [cookies, setCookie] = useCookies(["access_token"]);
  const navigation = useNavigate();

  const [media, setMedia] = useRecoilState(selectedMediaState);
  const [modalProps, setModalProps] = useRecoilState(modalPropsState);
  const list_id = useRecoilValue(MovieListIdState);

  const handleClose = () => {
    setMedia({ ...media, id: -1 });
    setModalProps({ ...modalProps, isOpen: false });
  };

  const { mutate: deleteListMutate, isSuccess } = useDeleteList();

  const handleDeleteMovie = useCallback(async () => {
    let accessToken = cookies.access_token;

    if (!accessToken) {
      const token = await getAccessToken();
      setCookie("access_token", token);

      accessToken = token;
    }

    deleteListMutate({
      mediaId: media.id,
      list_id: list_id,
      mediaType: media.media_type,
      accessToken: accessToken,
    });
  }, [deleteListMutate, media]);

  useEffect(() => {
    setMedia({ ...media, id: -1 });
    setModalProps({ ...modalProps, isOpen: false });

    if (handleRefetch) {
      handleRefetch();
    }
  }, [isSuccess]);

  return (
    <>
      {media && (
        <div>
          <Modal
            open={modalProps.isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-backdrop_path">
                {media.backdrop_path}
              </Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {media.title ? media.title : media.name}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {media.overview}
              </Typography>
              {modalProps.modalType === "MovieList" ? (
                <>
                  <Button onClick={() => {navigation("/MovieUpdate");}}>
                    수정
                  </Button>
                  <Button >삭제</Button>
                </>
              ) : null}
            </Box>
          </Modal>
        </div>
      )}
    </>
  );
};

export default ModalControl;
