import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { gsap } from "gsap";

const Modal = ({ children, onClose }) => {
  const modalRef = useRef();

  useEffect(() => {
    const modalElement = modalRef.current;
    gsap.fromTo(
      modalElement,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.3 }
    );
    return () => {
      gsap.to(modalElement, { scale: 0.8, opacity: 0, duration: 0.3 });
    };
  }, []);

  //   if (!modalRoot) {
  //     console.error("modalRoot not found");
  //     return null;
  //   }

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 lg:p-12 xl:p-18">
        <div
          ref={modalRef}
          className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 sm:w-11/12 md:w-10/12 lg:w-8/12 xl:w-6/12 sm:px-4 md:px-6 lg:px-8 xl:px-10 w-10/12"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
      ,
      {/*<div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>*/}
    </div>,
    document.getElementById("modalRoot")
  );
};

export default Modal;
