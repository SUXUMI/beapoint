import React, { useContext, useEffect, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Divider, Icon, Input, Spinner, Text } from "@ui-kitten/components";
import { string, object, reach } from "yup";
// import Joi from "joi";
// import "text-encoding-polyfill";
// import Joi from "@hapi/joi";

import authApi from "../api/auth";
import AuthContext from "../auth/context";
import AuthScreen from "../components/AuthScreen";
import colors from "../config/colors";
// import usePrevious from "../hooks/usePrevious";

// https://github.com/jquense/yup#usage
const validationSchema = object().shape({
  email: string().required().email().label("Email"),
  password: string().required().min(3).label("Password"),
});

// const joiValidationSchema = Joi.object({
//   email: Joi.string().required().email(),
//   password: Joi.string().required(),
// });

function SignInScreen({ navigation }) {
  const { user, setUser } = useContext(AuthContext);

  const [errors, setErrors] = useState({ email: "", password: "" });
  const [values, setValues] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [userDataFetching, setUserDataFetching] = useState(false);
  const [showPasswordEntry, setShowPasswordEntry] = useState(false);

  const touchedHandler = (field) => setTouched({ ...touched, [field]: true });

  // const prevValues = usePrevious(values || {});

  // useEffect(() => {
  //   validationHandler();
  // }, [values]);

  const changeHandler = async (field, newValue) => {
    setValues({ ...values, [field]: newValue });

    let _fieldErrors = await validateField(field, newValue);
    if (_fieldErrors) setErrors({ ...errors, [field]: _fieldErrors[0] });
    else setErrors({ ...errors, [field]: "" });

    // console.log(
    //   "\n\n\njoiValidationSchema:",
    //   joiValidationSchema.validate(values)
    // );
  };

  const validationHandler = async () => {
    let _errors = {};
    let _touched = {};
    let _isValid = true;

    for (const field in values) {
      const _fieldErrors = await validateField(field, values[field]);

      if (_fieldErrors) {
        _isValid = false;
        _errors[field] = _fieldErrors[0];
      } else _errors[field] = "";

      _touched[field] = true;
    }

    setErrors(_errors);
    setTouched(_touched);

    return _isValid;
  };

  const validateField = async (field, value) => {
    let errors = [];

    await reach(validationSchema, field)
      .validate(value, { abortEarly: false })
      .then((result) => {
        // setErrors({ ...errors, [field]: "" });
      })
      .catch((error) => {
        errors = error.errors;
        // setErrors({ ...errors, [field]: });
      });

    return errors.length ? errors : null;
  };

  // const validateField = (field) => {
  //   reach(validationSchema, field)
  //     .validate(values[field], { abortEarly: false })
  //     .then((result) => {
  //       setErrors({ ...errors, [field]: "" });
  //     })
  //     .catch((error) => {
  //       setErrors({ ...errors, [field]: error.errors[0] });
  //     });
  // };

  const togglePasswordEntryVisibility = () => {
    setShowPasswordEntry(!showPasswordEntry);
  };

  const renderPasswordEntrySwitherIcon = (props) => (
    <TouchableOpacity onPress={togglePasswordEntryVisibility}>
      <Icon {...props} name={showPasswordEntry ? "eye" : "eye-off"} />
    </TouchableOpacity>
  );

  const handleSignIn = async () => {
    // check if IS VALID
    if (!(await validationHandler())) return;

    setUserDataFetching(true);

    // handle login API call
    const result = await authApi.login(values.email, values.password);

    setUserDataFetching(false);

    console.log("\n\n\nUSER DATA:", result.data);

    if (!result.ok) return Alert.alert("Authorization Error", result.data.error_description);

    setUser(result.data);

    // navigation.navigate("SignInWelcome");
  };

  return (
    <AuthScreen style={styles.container}>
      <Text style={styles.header} category="h5">
        Sign in into your account
      </Text>
      <Input
        autoCapitalize="none"
        autoCorrect={false}
        // autoFocus={true}
        caption={(evaProps) => (
          <Text {...evaProps} style={[evaProps.style, { color: colors.danger }]}>
            {touched.email && errors.email}
          </Text>
        )}
        keyboardType="email-address"
        onBlur={() => touchedHandler("email")}
        // onChangeText={(newValue) => {
        //   setEmail(newValue), changeHandler();
        // }}
        onChangeText={(newValue) => {
          changeHandler("email", newValue);
        }}
        placeholder="Email"
        size="large"
        style={styles.email}
        value={values.email}
      />
      <Input
        autoCapitalize="none"
        autoCorrect={false}
        accessoryRight={renderPasswordEntrySwitherIcon}
        // caption="Should contain at least 8 symbols"
        caption={(evaProps) => (
          <Text {...evaProps} style={[evaProps.style, { color: colors.danger }]}>
            {touched.password && errors.password}
          </Text>
        )}
        // captionIcon={AlertIcon}
        // label="Password"
        onBlur={() => touchedHandler("password")}
        onChangeText={(newValue) => changeHandler("password", newValue)}
        placeholder="Password"
        secureTextEntry={!showPasswordEntry}
        size="large"
        style={styles.password}
        value={values.password}
      />

      <View style={{ flexDirection: "row", justifyContent: "flex-end", marginBottom: "3%" }}>
        <TouchableOpacity>
          <Text style={styles.textForgot} status="primary">
            Forgot password?
          </Text>
        </TouchableOpacity>
      </View>

      <Button style={styles.submitButton} onPress={handleSignIn}>
        <View style={{ marginRight: 10, opacity: userDataFetching ? 1 : 0 }}>
          {/* margin/padding not works with spinner */}
          <Spinner size="tiny" status="basic" />
        </View>
        Sign In
        {/* just for symmetry */}
        <View style={{ marginLeft: 10, opacity: 0 }}>
          <Spinner size="tiny" status="warning" />
        </View>
      </Button>

      <Text style={styles.textSocialMedia} appearance="hint">
        Or using social media
      </Text>

      <View style={styles.socialButtonsContainer}>
        <Button onPress={() => {}} size="giant" style={styles.socialButton} appearance="outline">
          <Icon name="facebook" style={styles.socialButtonIcon} fill={colors.primary} />
        </Button>
        <Divider style={styles.socialDivider} />
        <Button onPress={() => {}} size="giant" style={styles.socialButton} appearance="outline">
          <Icon name="google" style={styles.socialButtonIcon} fill={colors.primary} />
        </Button>
      </View>

      <View style={styles.textRegistrationContainer}>
        <Text appearance="hint">Don't have an account? </Text>
        <TouchableOpacity>
          <Text status="primary">Sign up?</Text>
        </TouchableOpacity>
      </View>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
  email: { marginBottom: "3%" },
  header: { marginBottom: "5%" },
  password: { marginBottom: "3%" },
  socialButton: {
    borderRadius: 8,
    flex: 1,
    paddingVertical: "5%",
    alignItems: "center",
    justifyContent: "center",
  },
  socialButtonIcon: { width: 28, height: 28 },
  socialButtonsContainer: {
    flexDirection: "row",
    marginBottom: "5%",
  },
  socialDivider: { width: "3%" },
  submitButton: {
    borderRadius: 8,
    marginBottom: "5%",
    paddingVertical: "4%",
  },
  textForgot: { marginBottom: "5%", textAlign: "right" },
  textRegistrationContainer: { flexDirection: "row", justifyContent: "center" },
  textSocialMedia: { marginBottom: "5%", textAlign: "center" },
});

export default SignInScreen;
