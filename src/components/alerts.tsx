
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const SwalAlert = withReactContent(Swal);


export const showLogoutWarningAlert = async (): Promise<boolean> => {
    const result = await SwalAlert.fire({
        title: <strong className="text-md">Confirm Logout?</strong>,
        html: (
            <p className="text-sm">
                Are you sure you want to <b>Logout</b>.
            </p>
        ),
        showCancelButton: true,
        confirmButtonText: "Yes, Logout",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#6c757d",
    });

    return result.isConfirmed;
};


export const showSwitchWarningAlert = async (): Promise<boolean> => {
    const result = await SwalAlert.fire({
        title: <strong className="text-md">Are you sure?</strong>,
        html: (
            <p className="text-sm">
                You already have <b>Custom options</b>. Switching to <b>Boolean</b> will erase
                them.
            </p>
        ),
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, switch",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#facc15", // Tailwind's yellow-400
        cancelButtonColor: "#6c757d",
    });

    return result.isConfirmed;
};

export const showChecklistDeleteWarningAlert = async (): Promise<boolean> => {
    const result = await SwalAlert.fire({
        title: <strong className="text-md">Are you sure?</strong>,
        html: (
            <p className="text-sm">
                Changes made to the Checklist will all be <b>Lost</b>.
            </p>
        ),
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Delete",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#f59e0b", // Tailwind's amber-500
        cancelButtonColor: "#6c757d",
    });

    return result.isConfirmed;
};

export const showParameterDeleteWarningAlert = async (): Promise<boolean> => {
    const result = await SwalAlert.fire({
        title: <strong className="text-md">Are you sure?</strong>,
        html: (
            <p className="text-sm">
                Changes made to the Parameter will all be <b>Lost</b>.
            </p>
        ),
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Delete",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#f59e0b", // Tailwind's amber-500
        cancelButtonColor: "#6c757d",
    });

    return result.isConfirmed;
};

export const showFormCompletedConformationAlert = async (): Promise<boolean> => {
    const result = await SwalAlert.fire({
        title: <strong className="text-md">Are you sure?</strong>,
        html: (
            <p className="text-sm">
                Once You have final saved the form you won't be able to edit it again.
            </p>
        ),
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Final Save",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#3b82f6", // Tailwind's blue-500
        cancelButtonColor: "#6c757d",
    });

    return result.isConfirmed;
};

export const showEVRDeleteWarningAlert = async (): Promise<boolean> => { // Confirm button clicked
    const result = await SwalAlert.fire({
        title: <strong className="text-md">Are you sure?</strong>,
        html: (
            <p className="text-sm">
                The deleted EVR and it's contents will be <b>Lost Forever</b>.
            </p>
        ),
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Delete",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#f59e0b", // Tailwind's amber-500
        cancelButtonColor: "#6c757d",
    });

    return result.isConfirmed;
};
