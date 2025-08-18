import UsernameForm from "../componenet/UsernameForm";
import PasswordForm from "../componenet/PasswordForm";
import TwoFactorAuthForm from "../componenet/TwoFactorAuthForm";
import ViewEmail from "../componenet/ViewEmail";



const Settings = () => {

  return (
    <div className="p-6 bg-white h-full">
      <h1 className="text-2xl font-semibold mb-6">⚙️ Settings</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Username Update Card */}
        
        <UsernameForm />
        <PasswordForm />
        <TwoFactorAuthForm />
        <ViewEmail />
      </div>

      
    </div>
  );
};

export default Settings;