import {
    CustomTableWrapper,
    CustomTable,
    CustomThead,
    CustomTh,
    CustomTr,
    CustomTd,
} from "@/components/table";
import Calendar from "@/components/calendar";
import Sidebar from "@/components/sidebar";
import Notification from "@/components/notifications";


export default function Dashboard() {



    const dvrData = [
        { id: "1", division: "North", divisionName: "Alice", totalEntities: 50, submitted: 45, accepted: 42 },
        { id: "2", division: "South", divisionName: "Bob", totalEntities: 40, submitted: 35, accepted: 33 },
        { id: "3", division: "East", divisionName: "Charlie", totalEntities: 30, submitted: 25, accepted: 20 },
        { id: "4", division: "West", divisionName: "Diana", totalEntities: 45, submitted: 40, accepted: 38 },
        { id: "5", division: "Central", divisionName: "Edward", totalEntities: 35, submitted: 32, accepted: 30 },
    ];

    const improvementData = [
        { id: "1", division: "North", divisionName: "Alice", totalPoints: 20, openPoints: 5, completedPoints: 15 },
        { id: "2", division: "South", divisionName: "Bob", totalPoints: 18, openPoints: 4, completedPoints: 14 },
        { id: "3", division: "East", divisionName: "Charlie", totalPoints: 22, openPoints: 6, completedPoints: 16 },
        { id: "4", division: "West", divisionName: "Diana", totalPoints: 25, openPoints: 8, completedPoints: 17 },
        { id: "5", division: "Central", divisionName: "Edward", totalPoints: 19, openPoints: 3, completedPoints: 16 },
    ];

    return (
        <Sidebar
            title="Dashboard"
        >
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <CustomTableWrapper
                    title="DVR Status"
                    footer={`Total DVR Submitted: ${dvrData.reduce(
                        (sum, x) => sum + x.submitted,
                        0
                    )}`}
                >
                    <CustomTable>
                        <CustomThead>
                            <tr>
                                <CustomTh sticky>Area</CustomTh>
                                <CustomTh>AI Name</CustomTh>
                                <CustomTh>Total Dealers</CustomTh>
                                <CustomTh>Submitted By AI</CustomTh>
                                <CustomTh>Accepted by Dealers</CustomTh>
                            </tr>
                        </CustomThead>
                        <tbody>
                            {dvrData.map((row, i) => (
                                <CustomTr key={row.id} index={i}>
                                    <CustomTd bold sticky>{row.division}</CustomTd>
                                    <CustomTd>{row.divisionName}</CustomTd>
                                    <CustomTd>{row.totalEntities}</CustomTd>
                                    <CustomTd>{row.submitted}</CustomTd>
                                    <CustomTd>{row.accepted}</CustomTd>
                                </CustomTr>
                            ))}
                        </tbody>
                    </CustomTable>
                </CustomTableWrapper>

                <CustomTableWrapper
                    title="DVR-MoM Status"
                    footer={`Additional carry forward open points: ${improvementData.reduce(
                        (s, x) => s + x.openPoints,
                        0
                    )}`}
                >
                    <CustomTable>
                        <CustomThead>
                            <tr>
                                <CustomTh sticky>Area</CustomTh>
                                <CustomTh>AI Name</CustomTh>
                                <CustomTh>Total MoM Points</CustomTh>
                                <CustomTh>Open MoM Points</CustomTh>
                                <CustomTh>MoM Points Completed</CustomTh>
                            </tr>
                        </CustomThead>
                        <tbody>
                            {improvementData.map((row, i) => (
                                <CustomTr key={row.id} index={i}>
                                    <CustomTd bold sticky>{row.division}</CustomTd>
                                    <CustomTd>{row.divisionName}</CustomTd>
                                    <CustomTd>{row.totalPoints}</CustomTd>
                                    <CustomTd>{row.openPoints}</CustomTd>
                                    <CustomTd>{row.completedPoints}</CustomTd>
                                </CustomTr>
                            ))}
                        </tbody>
                    </CustomTable>
                </CustomTableWrapper>

                <Calendar
                    financialYear="2025-2026"
                    month="August"
                    events={{
                        "2025-08-03": ["Team Meeting", "Project Review"],
                        "2025-08-07": ["Client Call"],
                        "2025-08-12": ["Product Launch", "Company Party"],
                        "2025-08-15": ["Quarterly Review"],
                        "2025-08-18": ["Holiday Party", "Team Building"],
                        "2025-08-20": ["End of Sprint Demo"],
                        "2025-08-25": ["Christmas Holiday"],
                        "2025-08-31": ["New Year Planning"],
                    }}
                />

                <Notification
                    notifications={[
                        {
                            id: 1,
                            message: "1 Team Meeting scheduled for tomorrow at 10 AM snfsdjfnk ndsjndf kjsndfns jsnfjnsf kjsndfjsn kjnsekjfn jnsfsnkf jnekfjnwef jnkjefnwkj nwkjfwjn jnkjenfw nwkjefn kjjnef nw jn",
                            date: "2025-08-22T09:00:00Z",
                            type: "info",
                        },
                        {
                            id: 2,
                            message: "2 Quarterly Review report is due next week",
                            date: "2025-08-21T12:30:00Z",
                            type: "warning",
                        },
                        {
                            id: 3,
                            message: "New product launch event added to the calendar",
                            date: "2025-08-20T15:45:00Z",
                            type: "success",
                        },
                        {
                            id: 4,
                            message: "System maintenance scheduled for 25th Aug",
                            date: "2025-08-19T08:15:00Z",
                            type: "error",
                        }
                    ]}
                />
            </div>
        </Sidebar>
    );
}
