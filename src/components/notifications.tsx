import type { NotificationListProps } from "./types"


const Notification: React.FC<NotificationListProps> = ({ notifications }) => {

    return (
        <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-slate-200">

            <div className="bg-[#003366] border-b border-[#002244] rounded-t-lg">
                <div className="flex items-center justify-between">
                    <h2 className="header-title-padding text-white">
                        Notifications
                    </h2>
                </div>
            </div>

            {/* Notification list */}
            <div className="flex-1 overflow-y-auto px-4 space-y-3 pb-16">
                {notifications.length > 0 ? (
                    notifications.map((note, i) => (
                        <div
                            key={`notification_item_${i}`}
                            className="notification-item mt-3 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors duration-200"
                        >
                            <p className="notification-text text-slate-700 leading-relaxed">
                                {note.message}
                            </p>
                            <span className="notification-timestamp text-slate-400 mt-1 block">
                                {new Date(note.date).toLocaleString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </span>

                            <div className="w-full p-1">
                                <div className="notification-timestamp p-1 w-full text-center space-x-3 text-gray-400 hover:text-gray-700 bg-white rounded-md cursor-pointer">
                                    <span>Mark as Done</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex items-center justify-center h-full text-slate-400">
                        <div className="text-center mt-3">
                            <p className="notification-text">No new notifications</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Notification;