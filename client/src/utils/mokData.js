export const mockUser = {
  _id: "1",
  fullName: "John Doe",
  email: "john.doe@example.com",
  phoneNumber: "+1 (123) 456-7890",
  avatar: {
    secure_url:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  role: "USER",
  isSubscribed: true,
  createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date().toISOString(),
};
