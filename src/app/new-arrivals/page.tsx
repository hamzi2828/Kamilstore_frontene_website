import { redirect } from "next/navigation";

export default function NewArrivalsRedirect() {
  redirect("/products?newArrivals=1");
}
