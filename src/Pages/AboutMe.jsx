import React, { useState } from "react";
import Modal from "react-modal";
import Select from "react-select";
import { motion } from "framer-motion";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import Typewriter from "typewriter-effect";
import { Helmet } from "react-helmet-async";

Modal.setAppElement("#root");

const frameworksOptions = [
  { value: "React", label: "React" },
  { value: "Next.js", label: "Next.js" },
  { value: "Vue.js", label: "Vue.js" },
  { value: "Angular", label: "Angular" },
];

const librariesOptions = [
  { value: "Redux", label: "Redux" },
  { value: "Axios", label: "Axios" },
  { value: "TanStack Query", label: "TanStack Query" },
  { value: "Framer Motion", label: "Framer Motion" },
];

const AboutMe = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState("Shahab Uddin");
  const [role, setRole] = useState("Web Developer");
  const [frameworks, setFrameworks] = useState([]);
  const [libraries, setLibraries] = useState([]);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div className="container mx-auto p-4 max-w-lg relative">
    <Helmet>
        <title> About Me | HostelHub </title>
      </Helmet>
      <div className="bg-white p-6 shadow-lg rounded-lg relative z-10">
        <h2 className="text-2xl font-bold mb-2">About Me</h2>
        <p className="text-lg font-semibold flex items-center">Name: <span className="ml-2 font-bold text-blue-600"><Typewriter options={{ strings: name, autoStart: true, loop: true }} /></span></p>
        <p className="text-lg">Role: {role}</p>
        <p className="text-lg">Frameworks: {frameworks.map(f => f.label).join(", ") || "None"}</p>
        <p className="text-lg">Libraries: {libraries.map(l => l.label).join(", ") || "None"}</p>
        <AwesomeButton type="primary" onPress={openModal} className="mt-4 relative z-20">
          Edit
        </AwesomeButton>
      </div>

      {/* Modal */}
      {modalIsOpen && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
        >
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="bg-white p-6 shadow-lg rounded-lg w-full max-w-md relative"
          >
            <h2 className="text-xl font-bold mb-4">Edit About Me</h2>
            <label className="block mb-2">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full mb-4"
            />
            
            <label className="block mb-2">Role:</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="input input-bordered w-full mb-4"
            />

            <label className="block mb-2">Frameworks:</label>
            <Select
              isMulti
              options={frameworksOptions}
              value={frameworks}
              onChange={setFrameworks}
              className="mb-4"
            />

            <label className="block mb-2">Libraries:</label>
            <Select
              isMulti
              options={librariesOptions}
              value={libraries}
              onChange={setLibraries}
              className="mb-4"
            />

            <div className="flex justify-between">
              <AwesomeButton type="secondary" onPress={closeModal}>
                Cancel
              </AwesomeButton>
              <AwesomeButton type="primary" onPress={closeModal}>
                Save
              </AwesomeButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default AboutMe;
