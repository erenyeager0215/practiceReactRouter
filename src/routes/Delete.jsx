import { redirect } from "react-router-dom";
import { deleteContact} from "../councilors";

export async function action({ params }) {
  await deleteContact(params.contactId);
  return redirect("/");
}