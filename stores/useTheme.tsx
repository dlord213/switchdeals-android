import { Colors, DarkColors, LightColors } from "@/types/Colors";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// props interface for the theme store
interface ThemeInterface {
  theme: string;
  palette: Colors;
  setTheme: (theme: string) => void;
}

// the global state for using themes
const useTheme = create<ThemeInterface>()(
  immer((set) => ({
    theme: "light", // initial theme state
    palette: LightColors, // initial theme palette, it depends on the theme
    setTheme: (theme: string) => { // method for toggling light/dark theme
      if (theme == "light") {
        set({ theme: theme, palette: LightColors });
      } else {
        set({ theme: theme, palette: DarkColors });
      }
    },
  }))
);

export default useTheme;
