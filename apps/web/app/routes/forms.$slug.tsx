import { useParams } from "react-router";
import { PublicFormPage } from "../modules/forms/pages/PublicFormPage";

export default function FormsSlugRoute() {
  const { slug } = useParams();
  return <PublicFormPage slug={slug ?? ""} />;
}
