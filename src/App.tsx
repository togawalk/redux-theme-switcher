import ThemeSwitcher from "./components/ThemeSwitcher";
import Setting from "./components/Setting";

function App() {
  return (
    <div className="min-h-screen max-w-5xl mx-auto flex items-center justify-center">
      <div className="flex flex-col gap-2">
        <Setting label="Theme" description="What theme do you prefer?">
          <ThemeSwitcher/>
        </Setting>
      </div>
    </div>
  );
}

export default App;
