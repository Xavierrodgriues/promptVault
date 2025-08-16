import UsernameForm from "../UsernameForm";
import PasswordForm from "../PasswordForm";



const Settings = () => {

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">⚙️ Settings</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Username Update Card */}
        
        <UsernameForm />
        <PasswordForm />
      </div>

      
    </div>
  );
};

export default Settings;