import React, { useId, useState } from "react";
import Modal from "react-modal";
import "./style.css";

Modal.setAppElement("#root");

const FormModal = ({ isOpen, onClose }) => {
  const uId = useId();

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    exercises: [{ id: crypto.randomUUID(), name: "", sets: [{ reps: undefined }] }]
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleWorkoutChange = (index, value) => {
    const updatedExercises = [...formData.exercises];
    updatedExercises[index] = {
      ...updatedExercises[index],
      name: value,
    };

    setFormData({
      ...formData,
      exercises: updatedExercises,
    });
  };

  const addWorkout = () => {
    setFormData({
      ...formData,
      exercises: [
        ...formData.exercises,
        { id: crypto.randomUUID(), name: "", sets: [{ reps: undefined }] },
      ],
    });
  };

  const removeWorkout = (index) => {
    setFormData({
      ...formData,
      exercises: formData.exercises.filter((_, i) => i !== index),
    });
  };

 const handleSubmit = (e) => {
  e.preventDefault();

  const newWorkout = {
    ...formData,
    id: uId,
  };

  const existingWorkouts =
    JSON.parse(localStorage.getItem("workouts")) || [];

  const updatedWorkouts = [...existingWorkouts, newWorkout];

  localStorage.setItem(
    "workouts",
    JSON.stringify(updatedWorkouts)
  );

  console.log("All Workouts:", updatedWorkouts);
  onClose();
};


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50"
      className="bg-white rounded-xl w-full max-w-md p-6 outline-none"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h5 className="text-center w-full text-black font-semibold">
          Add Workout
        </h5>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-black text-2xl"
        >
          ✕
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-5">
        {/* Template Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Template Name
          </label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Workout Names */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Workout Name(s)
          </label>

          {formData.exercises.map((exercise, index) => (
            <div key={exercise.id} className="flex gap-2 mb-2">
              <input
                type="text"
                required
                value={exercise.name}
                onChange={(e) =>
                  handleWorkoutChange(index, e.target.value)
                }
                className="flex-1 border rounded-lg px-3 py-2"
                placeholder={`Workout ${index + 1}`}
              />

              {formData.exercises.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeWorkout(index)}
                  className="px-3 rounded-lg border text-red-500 hover:bg-red-50"
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addWorkout}
            className="text-sm text-blue-600 hover:underline mt-1"
          >
            + Add another workout
          </button>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border hover:bg-gray-100 border-red-400 text-red-500 hover:border-red-600 hover:text-red-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default FormModal;
