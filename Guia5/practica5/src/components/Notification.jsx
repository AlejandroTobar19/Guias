import { useAppStore } from "../store/useAppStore";

export default function Notification() {
  const notification = useAppStore((state) => state.notification);

  if (!notification) return null; 

  return (
    <div
      className={`fixed top-5 right-5 p-4 rounded-lg shadow-lg text-white ${
        notification.type === "error" ? "bg-red-500" : "bg-green-500"
      }`}
    >
      {notification.message}
    </div>
  );
}
