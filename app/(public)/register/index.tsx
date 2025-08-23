import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Input, InputPassword } from "@/components/ui/input";
import Human from "@/assets/svgs/profile.svg";
import SMS from "@/assets/svgs/sms.svg";
import CALENDAR from "@/assets/svgs/calendar.svg";
import LOCK from "@/assets/svgs/lock.svg";
import { useLanguageStore } from "@/store/language";
import { Logo } from "@/components/ui/logo";

export default function Page() {
  const { isGerman } = useLanguageStore();

}
