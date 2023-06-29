interface Theme {
  name: string;
  colors: {
    background: string;
    section: string;
    fontDark: string;
    fontLight: string;
    action: string;
    error: string;
    success: string;
  };
  font: {
    label: Font;
    body: Font;
    title: Font;
    headline: Font;
    display: Font;
  };
}

interface FontItem {
  size: number;
  weight:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  lineHeight: number;
  tracking: number;
}

interface Font {
  small: FontItem;
  medium: FontItem;
  large: FontItem;
}
