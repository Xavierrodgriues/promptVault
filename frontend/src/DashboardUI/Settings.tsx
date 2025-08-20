import UsernameForm from "../componenet/UsernameForm";
import PasswordForm from "../componenet/PasswordForm";
import TwoFactorAuthForm from "../componenet/TwoFactorAuthForm";
import ViewEmail from "../componenet/ViewEmail";
import ChangeTheme from "../componenet/ChangeTheme";

const Settings = () => {
  return (
    <div className="p-4 sm:p-6 bg-white h-full">
      <h1 className="text-xl sm:text-2xl font-semibold mb-6">⚙️ Settings</h1>

      {/* Responsive Grid for Forms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <UsernameForm />
        <PasswordForm />
        <TwoFactorAuthForm />
        <ViewEmail />
      </div>

      {/* Theme Change Section (full width) */}
      <div className="mt-6">
        <ChangeTheme />
      </div>
    </div>
  );
};

export default Settings;