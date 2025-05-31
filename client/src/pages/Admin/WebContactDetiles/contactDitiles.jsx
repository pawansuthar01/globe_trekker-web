import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";

const initialContact = {
  key: "Contact_key",
  location: {
    address: "",
    city: "",
    postalCode: "",
    country: "",
  },
  email1: "",
  email2: "",
  phone: "",
  workingHours: "",
  followLinks: [],
};

function WebContact() {
  const [contacts, setContacts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState(initialContact);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setContacts(
        contacts.map((c) => (c.key === currentContact.key ? currentContact : c))
      );
      toast.success("Contact updated successfully!");
    } else {
      setContacts([
        ...contacts,
        { ...currentContact, key: `Contact_key_${Date.now()}` },
      ]);
      toast.success("Contact added successfully!");
    }
    setIsOpen(false);
    setCurrentContact(initialContact);
    setIsEditing(false);
  };

  const handleEdit = (contact) => {
    setCurrentContact(contact);
    setIsEditing(true);
    setIsOpen(true);
  };

  const handleDelete = (key) => {
    setContacts(contacts.filter((c) => c.key !== key));
    toast.success("Contact deleted successfully!");
  };

  const addSocialLink = () => {
    setCurrentContact({
      ...currentContact,
      followLinks: [...currentContact.followLinks, { url: "", platform: "" }],
    });
  };

  const removeSocialLink = (index) => {
    setCurrentContact({
      ...currentContact,
      followLinks: currentContact.followLinks.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Contact Management
          </h1>
          <button
            onClick={() => {
              setCurrentContact(initialContact);
              setIsEditing(false);
              setIsOpen(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <FiPlus /> Add Contact
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {contacts.map((contact) => (
            <div
              key={contact.key}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex justify-end gap-2 mb-4">
                <button
                  onClick={() => handleEdit(contact)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FiEdit2 />
                </button>
                <button
                  onClick={() => handleDelete(contact.key)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FiTrash2 />
                </button>
              </div>
              <div className="space-y-2">
                <p>
                  <strong>Address:</strong> {contact.location.address}
                </p>
                <p>
                  <strong>City:</strong> {contact.location.city}
                </p>
                <p>
                  <strong>Postal Code:</strong> {contact.location.postalCode}
                </p>
                <p>
                  <strong>Country:</strong> {contact.location.country}
                </p>
                <p>
                  <strong>Email 1:</strong> {contact.email1}
                </p>
                {contact.email2 && (
                  <p>
                    <strong>Email 2:</strong> {contact.email2}
                  </p>
                )}
                <p>
                  <strong>Phone:</strong> {contact.phone}
                </p>
                <p>
                  <strong>Working Hours:</strong> {contact.workingHours}
                </p>
                {contact.followLinks.length > 0 && (
                  <div>
                    <strong>Social Links:</strong>
                    <ul className="list-disc list-inside">
                      {contact.followLinks.map((link, index) => (
                        <li key={index}>
                          {link.platform}: {link.url}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <Dialog.Title className="text-xl font-bold mb-4">
                {isEditing ? "Edit Contact" : "Add New Contact"}
              </Dialog.Title>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    required
                    value={currentContact.location.address}
                    onChange={(e) =>
                      setCurrentContact({
                        ...currentContact,
                        location: {
                          ...currentContact.location,
                          address: e.target.value,
                        },
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={currentContact.location.city}
                    onChange={(e) =>
                      setCurrentContact({
                        ...currentContact,
                        location: {
                          ...currentContact.location,
                          city: e.target.value,
                        },
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    required
                    value={currentContact.location.postalCode}
                    onChange={(e) =>
                      setCurrentContact({
                        ...currentContact,
                        location: {
                          ...currentContact.location,
                          postalCode: e.target.value,
                        },
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <input
                    type="text"
                    required
                    value={currentContact.location.country}
                    onChange={(e) =>
                      setCurrentContact({
                        ...currentContact,
                        location: {
                          ...currentContact.location,
                          country: e.target.value,
                        },
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email 1
                  </label>
                  <input
                    type="email"
                    required
                    value={currentContact.email1}
                    onChange={(e) =>
                      setCurrentContact({
                        ...currentContact,
                        email1: e.target.value,
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email 2
                  </label>
                  <input
                    type="email"
                    value={currentContact.email2}
                    onChange={(e) =>
                      setCurrentContact({
                        ...currentContact,
                        email2: e.target.value,
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={currentContact.phone}
                    onChange={(e) =>
                      setCurrentContact({
                        ...currentContact,
                        phone: e.target.value,
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Working Hours
                  </label>
                  <input
                    type="text"
                    required
                    value={currentContact.workingHours}
                    onChange={(e) =>
                      setCurrentContact({
                        ...currentContact,
                        workingHours: e.target.value,
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Social Links
                  </label>
                  {currentContact.followLinks.map((link, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Platform"
                        required
                        value={link.platform}
                        onChange={(e) => {
                          const newLinks = [...currentContact.followLinks];
                          newLinks[index].platform = e.target.value;
                          setCurrentContact({
                            ...currentContact,
                            followLinks: newLinks,
                          });
                        }}
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                      <input
                        type="url"
                        placeholder="URL"
                        required
                        value={link.url}
                        onChange={(e) => {
                          const newLinks = [...currentContact.followLinks];
                          newLinks[index].url = e.target.value;
                          setCurrentContact({
                            ...currentContact,
                            followLinks: newLinks,
                          });
                        }}
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeSocialLink(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addSocialLink}
                    className="mt-2 text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <FiPlus /> Add Social Link
                  </button>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {isEditing ? "Update" : "Add"} Contact
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </div>
  );
}

export default WebContact;
