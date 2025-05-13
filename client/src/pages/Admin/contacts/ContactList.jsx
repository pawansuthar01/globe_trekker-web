import React, { useEffect, useState } from "react";
import { Search, Mail, CheckCircle, XCircle } from "lucide-react";
import SearchBar from "../../../components/AdminComponent/common/SearchBar";
import { useDispatch } from "react-redux";
import {
  getAllContacts,
  markContactAsRead,
} from "../../../Redux/Slice/UserContactSlice";

const ContactList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const dispatch = useDispatch();
  const FetchContacts = async () => {
    try {
      setLoading(true);
      const res = await dispatch(getAllContacts());
      if (res?.payload?.success) {
        setContacts(res?.payload?.data);
      }
      console.log(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };
  useEffect(() => {
    FetchContacts();
  }, []);

  // Find the selected contact
  const selectedContact = selectedContactId
    ? contacts?.find((contact) => contact._id === selectedContactId)
    : null;

  // Filter contacts based on search term and status filter
  const filteredContacts = contacts?.filter(
    (contact) =>
      (contact.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.subject.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" ||
        (statusFilter === "read" && contact.read) ||
        (statusFilter === "unread" && !contact.read))
  );

  const markAsRead = async (id) => {
    // API call to mark contact as read
    await dispatch(markContactAsRead(id));
    setContacts(contacts.map((c) => (c._id === id ? { ...c, read: true } : c)));
  };

  return (
    <div className="space-y-6 overflow-hidden p-6">
      <h1 className="text-2xl font-semibold text-gray-900">Contact Messages</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="mb-6 space-y-4">
                <SearchBar
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  placeholder="Search messages..."
                />

                <div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="all">All Messages</option>
                    <option value="read">Read</option>
                    <option value="unread">Unread</option>
                  </select>
                </div>
              </div>

              <div className="overflow-y-auto max-h-[600px]">
                <ul className="divide-y divide-gray-200">
                  {filteredContacts.map((contact) => (
                    <li
                      key={contact._id}
                      className={`py-4 cursor-pointer ${
                        selectedContactId === contact._id ? "bg-indigo-50" : ""
                      } ${!contact.read ? "font-semibold" : ""}`}
                      onClick={() => setSelectedContactId(contact._id)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {!contact.read ? (
                            <div className="h-2 w-2 rounded-full bg-indigo-600"></div>
                          ) : (
                            <div className="h-2 w-2"></div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-gray-900 truncate">
                            {contact.fullName}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {contact.subject}
                          </p>
                          <p className="text-xs text-gray-400">
                            {new Date(contact.createdAt).toLocaleDateString()}{" "}
                            {new Date(contact.createdAt).toLocaleTimeString(
                              [],
                              { hour: "2-digit", minute: "2-digit" }
                            )}
                          </p>
                        </div>
                        <div>
                          <Mail
                            size={16}
                            className={`${
                              !contact.read
                                ? "text-indigo-600"
                                : "text-gray-400"
                            }`}
                          />
                        </div>
                      </div>
                    </li>
                  ))}

                  {filteredContacts.length === 0 && (
                    <li className="py-4 text-center">
                      <p className="text-sm text-gray-500">No messages found</p>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg h-full">
            {selectedContact ? (
              <div className="flex flex-col h-full">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {selectedContact.subject}
                    </h3>
                    <div className="flex space-x-2">
                      {selectedContact.read ? (
                        <button
                          disabled
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200"
                        >
                          <XCircle size={16} className="mr-1" />
                          Read
                        </button>
                      ) : (
                        <button
                          onClick={() => markAsRead(selectedContact._id)}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                        >
                          <CheckCircle size={16} className="mr-1" />
                          Mark as Read
                        </button>
                      )}
                      <a
                        href={`mailto:${selectedContact.email}`}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        <Mail size={16} className="mr-1" />
                        Reply
                      </a>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-5 sm:p-6 flex-grow">
                  <div className="mb-4">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium text-gray-500">From:</p>
                      <p className="text-sm text-gray-500">
                        {new Date(
                          selectedContact.createdAt
                        ).toLocaleDateString()}{" "}
                        {new Date(selectedContact.createdAt).toLocaleTimeString(
                          [],
                          { hour: "2-digit", minute: "2-digit" }
                        )}
                      </p>
                    </div>
                    <p className="text-sm text-gray-900">
                      {selectedContact.fullName} &lt;{selectedContact.email}&gt;
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Message:
                    </p>
                    <div className="mt-2 text-sm text-gray-900 whitespace-pre-line">
                      {selectedContact.message}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-12">
                <Mail size={48} className="text-gray-300 mb-4" />
                <p className="text-lg text-gray-500">
                  Select a message to view
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactList;
