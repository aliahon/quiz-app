import toast from "react-hot-toast";
import {
    sendEmail as sendEmailApi,
} from "../api/session";
import { useMutation } from "@tanstack/react-query";

export const useEmail = () => {
    const { mutate: sendEmail, isPending: isSending } = useMutation({
        mutationFn: () => sendEmailApi(),
        onSuccess: async () => {
            toast.success("Email envoyé avec succès. Vérifiez votre boîte de réception !");
        },
    });
    return { sendEmail, isSending, }

}
