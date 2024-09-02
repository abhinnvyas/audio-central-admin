"use client";
import { storage } from "@/firebase.config";
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import React, { useEffect, useState } from "react";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  message,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-bold mb-4">Confirm Action</h2>
        <p>{message}</p>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  const [audioFiles, setAudioFiles] = useState<{ name: string; url: string }[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);
  const [modalMessage, setModalMessage] = useState<string>("");

  // Fetch audio files from Firebase Storage
  const fetchAudioFiles = async () => {
    setLoading(true);
    const audioRef = ref(storage, "audio");
    try {
      const result = await listAll(audioRef);
      const filePromises = result.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        return { name: itemRef.name, url };
      });

      const files = await Promise.all(filePromises);
      setAudioFiles(files);
    } catch (error) {
      console.error("Error fetching audio files:", error);
    }
    setLoading(false);
  };

  // Delete an audio file
  const handleDelete = async (fileName: string) => {
    const fileRef = ref(storage, `audio/${fileName}`);
    try {
      await deleteObject(fileRef);
      alert("File deleted successfully");
      fetchAudioFiles(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  // Fetch audio files on component mount
  useEffect(() => {
    fetchAudioFiles();
  }, []);

  // Sort files alphabetically
  const sortFiles = () => {
    setAudioFiles((prevFiles) =>
      [...prevFiles].sort((a, b) => a.name.localeCompare(b.name))
    );
  };

  // Automatically download the file
  const handleDownload = (url: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
  };

  // Open the modal and set the selected file for deletion
  const handleDeleteClick = (fileName: string) => {
    setSelectedFileUrl(fileName);
    setModalMessage("Are you sure you want to delete this file?");
    setIsModalOpen(true);
  };

  // Confirm the delete action
  const handleConfirmDelete = () => {
    if (selectedFileUrl) {
      handleDelete(selectedFileUrl);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        Admin Audio Manager
      </h1>
      <button
        onClick={sortFiles}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600 transition"
      >
        Sort Files Alphabetically
      </button>

      {loading ? (
        <p className="text-center text-gray-500">Loading audio files...</p>
      ) : (
        <ul className="space-y-4">
          {audioFiles.map((file) => (
            <li
              key={file.name}
              className="bg-white shadow-md rounded p-4 flex flex-col md:flex-row items-center justify-between"
            >
              <div className="flex-1">
                <p className="font-medium text-lg mb-2">{file.name}</p>
                <audio controls className="w-full md:w-64">
                  <source
                    src={file.url}
                    type={
                      file.name.endsWith(".opus") ? "audio/ogg" : "audio/mpeg"
                    }
                  />
                  Your browser does not support the audio element.
                </audio>
              </div>
              <div className="flex mt-4 md:mt-0 md:ml-4 space-x-4">
                <button
                  onClick={() => handleDownload(file.url, file.name)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                >
                  Download
                </button>
                <button
                  onClick={() => handleDeleteClick(file.name)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Confirmation Modal for Delete */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message={modalMessage}
      />
    </div>
  );
};

export default Page;
