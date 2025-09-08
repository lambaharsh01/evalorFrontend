
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const SwalAlert = withReactContent(Swal);

export const showSwitchWarning = async (): Promise<boolean> => {
    const result = await SwalAlert.fire({
        title: <strong className="text-md">Are you sure?</strong>,
        html: (
            <p className="text-sm">
                You already have <b>Custom options</b>. Switching to <b>Boolean</b> will erase
                them.
            </p>
        ),
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Yes, switch",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#003366",
        cancelButtonColor: "#6c757d",
    });

    return result.isConfirmed;
};