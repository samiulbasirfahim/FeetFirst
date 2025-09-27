import { LogOutModal } from "@/components/common/logout-modal";
import {
  SettingsButton,
  SettingsGroup,
  SettingsValue,
} from "@/components/common/settings-group";
import { Layout } from "@/components/layout/layout";
import { Typography } from "@/components/ui/typography";
import { useAuthStore } from "@/store/auth";
import { useLanguageStore } from "@/store/language";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";

export default function Screen() {
  const { isGerman } = useLanguageStore();
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuthStore();
  return (
    <Layout className="bg-backgroundDark" scrollable avoidTabbar>
      <SettingsGroup>
        <SettingsValue title="E-Mail" value={user?.email ?? ""} />
        <SettingsValue
          title={isGerman() ? "Telefonnummer" : "Numero di telefono"}
          value={user?.phone ?? "+"}
        />
        <SettingsValue
          title={isGerman() ? "Geburtsdatum" : "Data di nascita"}
          value={user?.date_of_birth ?? ""}
        />
        <SettingsButton
          title={isGerman() ? "Adresse" : "Indirizzo"}
          href="/(protected)/profile/settings/address"
          last
        />
      </SettingsGroup>
      <SettingsGroup>
        <SettingsButton
          title={isGerman() ? "Favoriten" : "Preferiti"}
          href="/(protected)/profile/settings/favorites"
          last
        />
      </SettingsGroup>
      <SettingsGroup>
        <SettingsButton
          title={"FAQ"}
          href="/(protected)/profile/settings/faq"
        />
        <SettingsButton
          title={isGerman() ? "Kontaktieren Sie uns" : "Contattaci"}
          href="/(protected)/profile/settings/contact-us"
          last
        />
      </SettingsGroup>

      <SettingsGroup>
        <SettingsButton
          title={
            isGerman() ? "Versionsinformationen" : "Informazioni sulla versione"
          }
          href="/(protected)/profile/settings/version-information"
        />
        <SettingsButton
          title={
            isGerman() ? "Datenschutzrichtlinie" : "Politica sulla riservatezza"
          }
          href="/(protected)/profile/settings/privacy-policy"
        />
        <SettingsButton
          title={
            isGerman()
              ? "Allgemeine Geschäftsbedingungen"
              : "Termini e condizioni"
          }
          href="/(protected)/profile/settings/terms-and-conditions"
          last
        />
      </SettingsGroup>

      <SettingsGroup>
        <SettingsButton
          title={isGerman() ? "Passwort ändern" : "Cambiare la password"}
          href="/(protected)/profile/settings/change-password"
        />
        <SettingsButton
          title={isGerman() ? "Konto löschen" : "Elimina Account"}
          href="/(protected)/profile/settings/delete-account"
          last
        />
      </SettingsGroup>

      <SettingsGroup>
        <TouchableOpacity
          className="flex-row justify-between items-center p-4 border-b-muted-foreground w-full"
          onPress={() => setShowModal(true)}
        >
          <Typography variant="selected" className="text-white">
            {isGerman() ? "Abmelden" : "Disconnessione"}
          </Typography>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color={"white"}
          />
        </TouchableOpacity>
      </SettingsGroup>

      <LogOutModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </Layout>
  );
}
