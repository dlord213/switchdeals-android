import { Colors, DarkColors, LightColors, BlackColors } from "@/types/Colors";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface ThemeInterface {
  theme: string;
  palette: Colors;
  setTheme: (theme: string) => void;
}

const useTheme = create<ThemeInterface>()(
  immer((set) => ({
    theme: "light",
    palette: LightColors,
    setTheme: (theme: string) => {
      if (theme == "light") {
        set({ theme: theme, palette: LightColors });
      } else {
        set({ theme: theme, palette: DarkColors });
      }
    },
  }))
);

export default useTheme;
