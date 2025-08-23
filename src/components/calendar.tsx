import { FYMtoDate } from "@/packages/utils/date";
import React, { useState, useRef, useEffect } from "react";
import { getDaysInMonth, startOfMonth, getDay, format, isToday, isBefore } from "date-fns";
import type { CalendarProp } from "./types";

const eventColors = ["bg-blue-500", "bg-green-500", "bg-red-500", "bg-yellow-500", "bg-purple-500", "bg-pink-500", "bg-indigo-500"];

const Calendar: React.FC<CalendarProp> = ({ financialYear, month, events }) => {

    const [hoveredDay, setHoveredDay] = useState<string | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState<{ left?: string; right?: string; transform?: string }>({});
    const tooltipRef = useRef<HTMLDivElement>(null);
    const cellRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (hoveredDay && tooltipRef.current && cellRef.current) {
            const cell = cellRef.current;
            const cellRect = cell.getBoundingClientRect();
            const viewportWidth = window.innerWidth;

            const tooltipWidth = 256; // w-64 = 256px
            const cellCenterX = cellRect.left + cellRect.width / 2;

            if (cellCenterX + tooltipWidth / 2 > viewportWidth - 16) {
                // Position tooltip to the left of center
                setTooltipPosition({
                    right: '0',
                    transform: 'none'
                });
            }
            // Check if tooltip would overflow on the left
            else if (cellCenterX - tooltipWidth / 2 < 16) {
                // Position tooltip to the right of center
                setTooltipPosition({
                    left: '0',
                    transform: 'none'
                });
            }
            // Default center position
            else {
                setTooltipPosition({
                    left: '50%',
                    transform: 'translateX(-50%)'
                });
            }
        }
    }, [hoveredDay]);

    const firstDateOfTheMonth = FYMtoDate(financialYear, month);
    if (!firstDateOfTheMonth) return null;

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const year = firstDateOfTheMonth.getFullYear();
    const monthIndex = firstDateOfTheMonth.getMonth();

    // Generate days array for the month with padding for starting weekday
    const daysInMonth = getDaysInMonth(firstDateOfTheMonth);
    const startDay = getDay(startOfMonth(firstDateOfTheMonth)); // 0=Sun, 6=Sat
    const days: (number | null)[] = Array(startDay).fill(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);

    const formatDateStr = (day: number) => format(new Date(year, monthIndex, day), "yyyy-MM-dd");

    const getDayCellStyle = (day: number): string => {
        const givenDate = new Date(year, monthIndex, day);
        const today = new Date();

        if (isToday(givenDate)) return "border-[#003366] bg-white";
        if (isBefore(givenDate, today)) return "border-[#dce1e6] bg-[#f2f4f7] hover:bg-[#e5e9ef]";
        return "border-[#f2f4f7]  bg-white";
    };
    const getDayCellTextStyle = (day: number): string => {
        const givenDate = new Date(year, monthIndex, day);
        const today = new Date();

        if (isToday(givenDate)) return "text-[#003366]";
        if (isBefore(givenDate, today)) return "text-[#222]";
        return "text-[#222]";
    };


    const getArrowClasses = () => {
        if (tooltipPosition.right === '0') {
            return "absolute -top-1 right-4 w-2 h-2 bg-gray-900 rotate-45";
        } else if (tooltipPosition.left === '0') {
            return "absolute -top-1 left-4 w-2 h-2 bg-gray-900 rotate-45";
        }
        return "absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45";
    };

    return (
        <div className="calendar-section bg-white rounded-lg shadow-sm border border-[#dce1e6] w-full mx-auto">
            {/* Header */}
            <div className="bg-[#003366] border-b border-[#002244] rounded-t-lg">
                <div className="flex items-center justify-between">
                    <h2 className="header-title-padding text-white">
                        {month} {financialYear}
                    </h2>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="calendar-grid">
                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                    {dayNames.map((day) => (
                        <div key={day} className="text-center py-2">
                            <span className="calendar-day-header font-semibold text-[#003366]">{day}</span>
                        </div>
                    ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-2">
                    {days.map((day, index) => {
                        if (!day) return <div key={index} className="aspect-square"></div>;

                        const dateStr = formatDateStr(day);
                        const dayEvents = events[dateStr] || [];
                        const hasEvents = dayEvents.length > 0;

                        return (
                            <div
                                key={dateStr}
                                ref={hoveredDay === dateStr ? cellRef : null}
                                className="relative"
                                onMouseEnter={() => setHoveredDay(dateStr)}
                                onMouseLeave={() => setHoveredDay(null)}
                            >
                                <div
                                    className={`aspect-square p-2 border rounded-md transition-all duration-200 cursor-pointer flex flex-col ${getDayCellStyle(day)}`
                                    }
                                >
                                    <div className="flex justify-between items-start">
                                        <span
                                            className={`calendar-date font-medium ${getDayCellTextStyle(day)}`}
                                        >
                                            {day}
                                        </span>
                                    </div>

                                    {/* Event colored circles */}
                                    {hasEvents && (
                                        <div className="mt-auto flex flex-wrap gap-1">
                                            {dayEvents.slice(0, 4).map((event, i) => (
                                                <span
                                                    key={i}
                                                    title={event}
                                                    className={`calendar-event-dot rounded-full ${eventColors[i % eventColors.length]}`}
                                                ></span>
                                            ))}
                                            {dayEvents.length > 4 && (
                                                <span className="calendar-event-dot rounded-full bg-[#666] flex items-center justify-center text-[8px] text-white">
                                                    +{dayEvents.length - 4}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Hover tooltip */}
                                {hoveredDay === dateStr && hasEvents && (
                                    <div
                                        ref={tooltipRef}
                                        className="calendar-tooltip absolute z-50 top-full mt-2 w-64 bg-[#222] text-white rounded-md p-3 shadow-lg"
                                        style={{
                                            left: tooltipPosition.left,
                                            right: tooltipPosition.right,
                                            transform: tooltipPosition.transform,
                                        }}
                                    >
                                        <div className={getArrowClasses()}></div>
                                        <div className="font-semibold mb-2 text-[#f2f4f7]">
                                            {month} {day}, {year}
                                        </div>
                                        <div className="space-y-1">
                                            {dayEvents.map((event, eventIndex) => (
                                                <div key={eventIndex} className="text-[#dce1e6]">
                                                    • {event}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );

};

export default Calendar;