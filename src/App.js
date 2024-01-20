import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { useForm } from "react-hook-form"
import Modal from './modal/Modal'
import useModal from "./modal/useModal"
import "./App.css";

export const App = () => {
  const { register, formState: { errors }, handleSubmit, reset } = useForm()
  const { isOpen, openModal, closeModal } = useModal()
  // const errors = formState.errors
  const form = useRef()
  const sendEmail = (e) => {
    // e.preventDefault();

    emailjs.sendForm(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      form.current,
      process.env.REACT_APP_EMAILJS_PUBLIC_KEY)
      .then((result) => {
        console.log(result.text);
        openModal();
      },
      (error) => {
        console.log(error.text);
      }
    );
  };

  return (
    <div className="container">
      <form ref={form}
        onSubmit={handleSubmit(sendEmail)}
        className="form"
      >
        <label htmlFor="firstName">Prénom</label>
        <input
          type="text"
          name="firstname"
          id="firstName"
          {...register("firstName", {
              required: true,
              minLength: 2,
              maxLength: 20,
              pattern: /^[a-zA-Z\s\-À-ÖØ-öø-ÿ']+$/g,
          })}
          className="text-black p-2 mb-4"
        />
        {/* firstName validation by react-hook-form */}
        <div className="text-white bg-red-700 -mt-4">
            {errors?.firstName?.type === "required" && (
              <p>
                Ce champs doit être rempli
              </p>
            )}
            {errors?.firstName?.type === "maxLength" && (
              <p>
                Ne doit pas excéder 20 caractères
              </p>
            )}
            {errors?.firstName?.type === "minLength" && (
              <p>
                Il doit y avoir au moins 2 caractères
              </p>
            )}
            {errors?.firstName?.toLowerCase.type === "pattern" && (
              <p >
                Caractères alphabétiques uniquement
              </p>
            )}
        </div>
        

        <label htmlFor="lastName">Nom</label>
        <input
          type="text"
          name="lastname"
          id="lastName"
            {...register("lastName", {
              required: true,
              minLength: 2,
              maxLength: 20,
              pattern: /^[a-zA-Z\s\-À-ÖØ-öø-ÿ']+$/g,
            })}
            className="text-black p-2 mb-4"
        />
        {/* lastName validation by react-hook-form */}
        <div className="text-white bg-red-700 -mt-4">
            {errors?.lastName?.type === "required" && (
              <p>
                Ce champs doit être rempli
              </p>
            )}
            {errors?.lastName?.type === "maxLength" && (
              <p>
                Ne doit pas excéder 20 caractères
              </p>
            )}
            {errors?.lastName?.type === "minLength" && (
              <p>
                Il doit y avoir au moins 2 caractères
              </p>
            )}
            {errors?.lastName?.type === "pattern" && (
              <p >
                Caractères alphabétiques uniquement
              </p>
            )}
          </div>

        <label htmlFor="email">Votre Email</label>
        <input
          type="email"
          name="email"
          id="email"
          {...register("email", {
            required: true,
            pattern: /^[\w._-]+@[\w-]+\.[a-z]{2,4}$/g,
          })}
          className="text-black p-2 mb-4"
        />
        {/* email validation by react-hook-form */}
        <div className="text-white bg-red-700 -mt-4">
            {errors?.email?.type === "required" && (
              <p>Ce champs doit être rempli</p>
            )}
            {errors?.email?.type === "pattern" && (
              <p>Votre adresse Email est invalide</p>
            )}
          </div>

        <label htmlFor="message">Message</label>
        <textarea
          name="message"
          id="message"
          rows="7"
          {...register("message", {
              required: true
          })}
          className="text-black p-2 mb-4"
        />
        <div className="messageError">
            {errors?.message?.type === "required" && (
              <p className="text-white bg-red-700 -mt-4">Veuillez écrire un message</p>
            )}
        </div>

        <button
          type="submit"
          value="SEND MESSAGE"
        >
          Envoyer
        </button>

        <Modal
          isOpen={isOpen}
          handleClose={() => {
            closeModal()
            reset()
          }}
        >
          <header>
            <h1 className="text-3xl">Merci pour votre message !</h1>
            <p className="mt-4">J'y réponds dès que possible.</p>
          </header>
        </Modal>

      </form>
    </div>
  );
};

export default App;
