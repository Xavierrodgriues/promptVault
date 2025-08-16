import UsernameForm from "../componenet/UsernameForm";
import PasswordForm from "../componenet/PasswordForm";
import TwoFactorAuthForm from "./TwoFactorAuthForm";



const Settings = () => {

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">⚙️ Settings</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Username Update Card */}
        
        <UsernameForm />
        <PasswordForm />
        <TwoFactorAuthForm />
      </div>

      
    </div>
  );
};

export default Settings;