import { store } from "@/components/store";
import router from ".";

const routeSecurity = () => {
  if (!store.token) {
    router.push("/login");
    return false;
  }
};

export default routeSecurity;
