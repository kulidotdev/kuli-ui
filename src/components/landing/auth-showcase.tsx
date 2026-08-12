import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { SigninForm } from "@/components/auth/signin"
import { SignupForm } from "@/components/auth/signup"
import { ForgotPasswordForm } from "@/components/auth/forgot-password"
import { ResetPasswordForm } from "@/components/auth/reset-password"
import { TwoFactorForm } from "@/components/auth/two-factor"
import {
  SocialProviderButton,
  MagicLinkButton,
  PasskeyButton,
} from "@/components/auth/passwordless-buttons"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { SiGithub, SiGoogle } from "@icons-pack/react-simple-icons"

type FormType = "signin" | "signup" | "forgot" | "reset" | "twofactor"

export function AuthShowcase() {
  const [activeForm, setActiveForm] = useState<FormType>("signin")
  const [isLoading, setIsLoading] = useState(false)
  const [showError, setShowError] = useState(false)

  // Signin Props
  const [signinMethods, setSigninMethods] = useState<
    ("email" | "username" | "phone")[]
  >(["email", "username", "phone"])
  const [signinShowSignupLink, setSigninShowSignupLink] = useState(true)
  const [signinShowPasswordless, setSigninShowPasswordless] = useState(true)

  // Signup Props
  const [signupShowUsername, setSignupShowUsername] = useState(true)
  const [signupShowPhone, setSignupShowPhone] = useState(true)

  // Forgot Password Props
  const [forgotAllowPhone, setForgotAllowPhone] = useState(true)

  // Reset Password Props
  const [resetMethod, setResetMethod] = useState<"email" | "phone">("email")

  // Two Factor Props
  const [tfView, setTfView] = useState<"totp" | "otp">("totp")
  const [tfMethods, setTfMethods] = useState<("totp" | "otp")[]>(["totp", "otp"])

  const mockApiError = showError
    ? { message: "Invalid credentials or token expired.", code: "AUTH_001" }
    : null

  const handleSigninMethodToggle = (method: "email" | "username" | "phone") => {
    setSigninMethods((prev) =>
      prev.includes(method)
        ? prev.filter((m) => m !== method)
        : [...prev, method]
    )
  }

  const handleTfMethodToggle = (method: "totp" | "otp") => {
    setTfMethods((prev) =>
      prev.includes(method)
        ? prev.filter((m) => m !== method)
        : [...prev, method]
    )
  }

  const getButtonClass = (formName: FormType) => {
    const isActive = activeForm === formName
    return `justify-start transition-all ${isActive ? "shadow-[0_0_15px_rgba(var(--primary),0.5)] border-primary" : "border-border/50 hover:border-primary/50"}`
  }

  return (
    <section id="showcase" className="relative z-10 py-32">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-primary/5 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-3xl font-extrabold tracking-tight text-transparent drop-shadow-[0_0_10px_rgba(var(--primary),0.5)] sm:text-4xl">
            Authentication Components
          </h2>
          <p className="mx-auto max-w-2xl text-lg font-light text-muted-foreground">
            Deploy secure, scalable authentication in seconds. Toggle modules
            below to initialize system previews.
          </p>
        </motion.div>

        <div className="relative flex flex-col items-start gap-12 lg:flex-row">
          {/* Controls Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/3"
          >
            <Card className="relative overflow-hidden rounded-2xl border-primary/20 bg-background/40 p-6 shadow-[0_0_30px_rgba(var(--primary),0.1)] backdrop-blur-xl">
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>

              <h3 className="mb-4 flex items-center text-lg font-semibold text-primary">
                <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),1)]"></span>
                Components
              </h3>
              <div className="mb-8 flex flex-col gap-3">
                <Button
                  variant={activeForm === "signin" ? "default" : "outline"}
                  className={getButtonClass("signin")}
                  onClick={() => setActiveForm("signin")}
                >
                  Sign In Component
                </Button>
                <Button
                  variant={activeForm === "signup" ? "default" : "outline"}
                  className={getButtonClass("signup")}
                  onClick={() => setActiveForm("signup")}
                >
                  Sign Up Component
                </Button>
                <Button
                  variant={activeForm === "forgot" ? "default" : "outline"}
                  className={getButtonClass("forgot")}
                  onClick={() => setActiveForm("forgot")}
                >
                  Forgot Password Component
                </Button>
                <Button
                  variant={activeForm === "reset" ? "default" : "outline"}
                  className={getButtonClass("reset")}
                  onClick={() => setActiveForm("reset")}
                >
                  Reset Password Component
                </Button>
                <Button
                  variant={activeForm === "twofactor" ? "default" : "outline"}
                  className={getButtonClass("twofactor")}
                  onClick={() => setActiveForm("twofactor")}
                >
                  Two-Factor Component
                </Button>
              </div>

              <h3 className="mb-4 text-lg font-semibold">Global States</h3>
              <div className="mb-8 space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is-loading"
                    checked={isLoading}
                    onCheckedChange={(c) => setIsLoading(!!c)}
                  />
                  <Label htmlFor="is-loading">Loading State</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="show-error"
                    checked={showError}
                    onCheckedChange={(c) => setShowError(!!c)}
                  />
                  <Label htmlFor="show-error">Simulate API Error</Label>
                </div>
              </div>

              {/* Specific Form Controls */}
              {activeForm === "signin" && (
                <>
                  <h3 className="mb-4 text-lg font-semibold">
                    Sign In Options
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="method-email"
                        checked={signinMethods.includes("email")}
                        onCheckedChange={() =>
                          handleSigninMethodToggle("email")
                        }
                      />
                      <Label htmlFor="method-email">Enable Email Login</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="method-username"
                        checked={signinMethods.includes("username")}
                        onCheckedChange={() =>
                          handleSigninMethodToggle("username")
                        }
                      />
                      <Label htmlFor="method-username">
                        Enable Username Login
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="method-phone"
                        checked={signinMethods.includes("phone")}
                        onCheckedChange={() =>
                          handleSigninMethodToggle("phone")
                        }
                      />
                      <Label htmlFor="method-phone">Enable Phone Login</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="signin-signup-link"
                        checked={signinShowSignupLink}
                        onCheckedChange={(c) => setSigninShowSignupLink(!!c)}
                      />
                      <Label htmlFor="signin-signup-link">
                        Show Sign Up Link
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="signin-passwordless"
                        checked={signinShowPasswordless}
                        onCheckedChange={(c) => setSigninShowPasswordless(!!c)}
                      />
                      <Label htmlFor="signin-passwordless">
                        Enable Passwordless Login
                      </Label>
                    </div>
                  </div>
                </>
              )}

              {activeForm === "signup" && (
                <>
                  <h3 className="mb-4 text-lg font-semibold">
                    Sign Up Options
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="signup-username"
                        checked={signupShowUsername}
                        onCheckedChange={(c) => setSignupShowUsername(!!c)}
                      />
                      <Label htmlFor="signup-username">
                        Show Username Field
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="signup-phone"
                        checked={signupShowPhone}
                        onCheckedChange={(c) => setSignupShowPhone(!!c)}
                      />
                      <Label htmlFor="signup-phone">Show Phone Field</Label>
                    </div>
                  </div>
                </>
              )}

              {activeForm === "forgot" && (
                <>
                  <h3 className="mb-4 text-lg font-semibold">
                    Forgot Password Options
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="forgot-phone"
                        checked={forgotAllowPhone}
                        onCheckedChange={(c) => setForgotAllowPhone(!!c)}
                      />
                      <Label htmlFor="forgot-phone">Allow Phone Recovery</Label>
                    </div>
                  </div>
                </>
              )}

              {activeForm === "reset" && (
                <>
                  <h3 className="mb-4 text-lg font-semibold">
                    Reset Password Options
                  </h3>
                  <div className="space-y-4">
                    <Label>Recovery Method Type</Label>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={
                          resetMethod === "email" ? "default" : "outline"
                        }
                        onClick={() => setResetMethod("email")}
                      >
                        Email
                      </Button>
                      <Button
                        size="sm"
                        variant={
                          resetMethod === "phone" ? "default" : "outline"
                        }
                        onClick={() => setResetMethod("phone")}
                      >
                        Phone
                      </Button>
                    </div>
                  </div>
                </>
              )}

              {activeForm === "twofactor" && (
                <>
                  <h3 className="mb-4 text-lg font-semibold">
                    Two-Factor Options
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="tf-totp"
                        checked={tfMethods.includes("totp")}
                        onCheckedChange={() => handleTfMethodToggle("totp")}
                      />
                      <Label htmlFor="tf-totp">Enable TOTP (App)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="tf-otp"
                        checked={tfMethods.includes("otp")}
                        onCheckedChange={() => handleTfMethodToggle("otp")}
                      />
                      <Label htmlFor="tf-otp">Enable OTP (Email)</Label>
                    </div>
                    <div className="space-y-2 pt-2">
                      <Label>Default View</Label>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant={tfView === "totp" ? "default" : "outline"}
                          onClick={() => setTfView("totp")}
                        >
                          TOTP
                        </Button>
                        <Button
                          size="sm"
                          variant={tfView === "otp" ? "default" : "outline"}
                          onClick={() => setTfView("otp")}
                        >
                          OTP
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </Card>
          </motion.div>

          {/* Form Display */}
          <div className="relative w-full flex items-center justify-center lg:w-2/3 overflow-hidden rounded-xl border border-primary/20 bg-background/50 p-4 shadow-[0_0_40px_rgba(var(--primary),0.1)] backdrop-blur-md md:p-8">
            {/* Ambient Background Glow inside the form area */}
            <div className="absolute top-1/2 left-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-primary/10 blur-[80px]"></div>

            <div className="relative z-10 mx-auto w-full max-w-md">
              <AnimatePresence mode="wait">
                {activeForm === "signin" && (
                  <motion.div
                    key="signin"
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <SigninForm
                      isLoading={isLoading}
                      apiError={mockApiError}
                      methods={signinMethods}
                      forgotPasswordPath="#forgot"
                      signupPath={signinShowSignupLink ? "#signup" : undefined}
                      footer={signinShowSignupLink}
                      onSubmit={(v) => console.log(v)}
                      secondSlot={signinShowPasswordless ? (method) => (
                        <div className="flex flex-col gap-2">
                          <MagicLinkButton
                            label="Continue with Magic Link"
                            isLoading={isLoading}
                            disabled={method !== "email"}
                          />
                          <PasskeyButton
                            label="Continue with Passkey"
                            isLoading={isLoading}
                          />
                        </div>
                      ) : undefined}
                      thirdSlot={
                        <div className="grid grid-cols-2 gap-2">
                          <SocialProviderButton
                            icon={<SiGoogle className="h-4 w-4" />}
                            label="Google"
                            isLoading={isLoading}
                          />
                          <SocialProviderButton
                            icon={<SiGithub className="h-4 w-4" />}
                            label="GitHub"
                            isLoading={isLoading}
                          />
                        </div>
                      }
                    />
                  </motion.div>
                )}
                {activeForm === "signup" && (
                  <motion.div
                    key="signup"
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <SignupForm
                      isLoading={isLoading}
                      apiError={mockApiError}
                      showUsername={signupShowUsername}
                      showPhone={signupShowPhone}
                      onSubmit={(v) => console.log(v)}
                      secondSlot={
                        <div className="grid grid-cols-2 gap-2">
                          <SocialProviderButton
                            icon={<SiGoogle className="h-4 w-4" />}
                            label="Google"
                            isLoading={isLoading}
                          />
                          <SocialProviderButton
                            icon={<SiGithub className="h-4 w-4" />}
                            label="GitHub"
                            isLoading={isLoading}
                          />
                        </div>
                      }
                    />
                  </motion.div>
                )}
                {activeForm === "forgot" && (
                  <motion.div
                    key="forgot"
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <ForgotPasswordForm
                      isLoading={isLoading}
                      apiError={mockApiError}
                      allowPhone={forgotAllowPhone}
                      onSubmitEmail={async (v) => console.log(v)}
                      onSubmitPhone={async (v) => console.log(v)}
                    />
                  </motion.div>
                )}
                {activeForm === "reset" && (
                  <motion.div
                    key="reset"
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <ResetPasswordForm
                      isLoading={isLoading}
                      apiError={mockApiError}
                      method={resetMethod}
                      onSubmitEmail={async (v) => console.log(v)}
                      onSubmitPhone={async (v) => console.log(v)}
                    />
                  </motion.div>
                )}
                {activeForm === "twofactor" && (
                  <motion.div
                    key="twofactor"
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <TwoFactorForm
                      isLoading={isLoading}
                      apiError={mockApiError}
                      currentView={tfView}
                      twofactorMethods={tfMethods}
                      totpLength={6}
                      otpLength={8}
                      onSubmit={async (method, values) => console.log(method, values)}
                      onResendOtp={async () => console.log("Resend OTP")}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
