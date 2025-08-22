import type { NotificationListProps } from "./types"


const Notification: React.FC<NotificationListProps> = ({ notifications }) => {

    return (
        <div className="flex flex-col h-full bg-white rounded-lg shadow-sm md:shadow-md border border-slate-200">
            {/* Header */}
            <div className="bg-[#003366] border-b border-[#002244] rounded-t-lg ">
                <div className="flex items-center justify-between">
                    <h2 className="calendar-title text-white text-sm md:text-base lg:text-lg font-medium">
                        Notifications
                    </h2>
                </div>
            </div>

            {/* Notification list */}
            <div className="flex-1 overflow-y-auto px-4 space-y-2 md:space-y-3 pb-16">
                {notifications.length > 0 ? (
                    notifications.slice(0, 5).map((note, i) => (
                        <div
                            key={i}
                            className="p-2 mt-3 md:p-3 lg:p-4 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors duration-200"
                        >
                            <p className="text-xs md:text-sm lg:text-base text-slate-700 leading-relaxed">
                                {note.message}
                            </p>
                            <span className="text-[10px] md:text-xs lg:text-sm text-slate-400 mt-1 block">
                                {new Date(note.date).toLocaleString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </span>
                        </div>
                    ))
                ) : (
                    <div className="flex items-center justify-center h-full text-slate-400">
                        <div className="text-center">
                            <p className="text-xs md:text-sm lg:text-base">No new notifications</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Notification;