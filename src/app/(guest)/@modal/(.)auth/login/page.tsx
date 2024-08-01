import { LoginForm } from "@/components/login-form";
import { type FC } from "react";
import { Modal } from "./modal";

const LoginModal: FC = () => {
  return (
    <Modal>
      <LoginForm />
    </Modal>
  );
};

export default LoginModal;
