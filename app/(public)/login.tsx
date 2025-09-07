import { Input, InputPassword } from "@/components/ui/input";
import GOOGLE from "@/assets/svgs/google.svg";
import SMS from "@/assets/svgs/sms.svg";
import LOCK from "@/assets/svgs/lock.svg";
import { useLanguageStore } from "@/store/language";
import { Logo } from "@/components/ui/logo";
import { Text, TouchableOpacity, View } from "react-native";
import { Button } from "@/components/ui/button";
import { Link, router } from "expo-router";
import { useAuthStore } from "@/store/auth";
import { Layout } from "@/components/layout/layout";

import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import { useState } from "react";
import { useSignIn } from "@/hooks/useGoogleSignIn";
import { Typography } from "@/components/ui/typography";

GoogleSignin.configure({
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  offlineAccess: false,
  iosClientId: process.env.EXPO_PUBLIC_IOS_OAUTH_TOKEN,
  forceCodeForRefreshToken: true,
});

export default function Page() {
  const { signIn, name } = useSignIn();

  const { isGerman } = useLanguageStore();
  const { setUser } = useAuthStore();

  return (
    <Layout scrollable avoidKeyboard edges={["bottom"]}>
      <Logo className="mb-20" />
      <Input
        Icon={SMS}
        placeholder={isGerman() ? "E-Mail eingeben" : "Inserisci l'email"}
      />

      <InputPassword
        Icon={LOCK}
        placeholder={isGerman() ? "Passwort eingeben" : "Inserisci password"}
      />
      <View
        className="w-full flex-row"
        style={{
          justifyContent: "flex-end",
        }}
      >
        <Button variant="ghost" onPress={() => router.push("/forgot-password")}>
          {isGerman() ? "Passwort vergessen?" : "Password dimenticata?"}
        </Button>
      </View>

      <Link asChild href={"/(protected)/home"}>
        <Button
          variant="big"
          className="w-full"
          onPress={() =>
            setUser({
              email: "",
              full_name: "",
              verified: true,
            })
          }
        >
          {isGerman() ? "Anmelden" : "Accesso"}
        </Button>
      </Link>

      <View className="w-full flex-row items-center">
        <View
          className="flex-1 bg-muted-background"
          style={{
            height: 3,
          }}
        />
        <View
          className="bg-muted-background rounded-xl items-center justify-center"
          style={{
            height: 40,
            width: 40,
          }}
        >
          <View
            className="border-2"
            style={{
              borderColor: "#5C7768",
              height: 20,
              borderRadius: "100%",
              width: 20,
            }}
          />
        </View>
        <View
          className="flex-1 bg-muted-background"
          style={{
            height: 3,
          }}
        />
      </View>

      {name ? (
        <>
          <Typography className="text-center">{name}</Typography>
          <TouchableOpacity
            className="bg-red-200 px-4 py-3 rounded-xl flex-row w-full items-center justify-center gap-4"
            onPress={() => signIn("signout")}
          >
            <GOOGLE />
            <Text className="text-whtie font-semibold text-xl text-center">
              SIGN OUT
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity
          className="bg-white px-4 py-3 rounded-xl flex-row w-full items-center justify-center gap-4"
          onPress={() => signIn("signin")}
        >
          <GOOGLE />
          <Text className="text-black font-semibold text-xl text-center">
            {isGerman() ? "Mit Google fortfahren" : "Continua con Google"}
          </Text>
        </TouchableOpacity>
      )}
    </Layout>
  );
}
